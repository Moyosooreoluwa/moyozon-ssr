import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAuth } from '../utils.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

const orderRouter = express.Router();
orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);
orderRouter.get(
  '/user/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);
// orderRouter.get(
//   '/mine',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const orders = await Order.find({ user: req.user._id });
//     res.send(orders);
//   })
// );

orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.post(
  '/:id/stripe-checkout',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({ message: 'Order Not Found' });
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: order.orderItems.map((item) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        // DONT FORGET TO CHANGE BEFORE DEPLOYING ON VERCEL
        success_url: `${process.env.FRONTEND_URL}/order/${order._id}?payment=success`,
        cancel_url: `${process.env.FRONTEND_URL}/order/${order._id}?payment=canceled`,
        // DONT FORGET TO CHANGE BEFORE DEPLOYING ON VERCEL
        metadata: {
          orderId: order._id.toString(),
        },
      });

      res.send({ url: session.url });
    } catch (error) {
      res
        .status(500)
        .send({ message: error.message || 'Internal Server Error' });
    }
  })
);

// Webhook route for Stripe
// orderRouter.post(
//     '/stripe-webhook',
//     express.raw({ type: 'application/json' }), // Raw body parsing for webhooks
//     expressAsyncHandler(async (req, res) => {
//       const sig = req.headers['stripe-signature'];
//       const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

//       let event;

//       try {
//         event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
//       } catch (err) {
//         return res.status(400).send(`Webhook Error: ${err.message}`);
//       }

//       if (event.type === 'checkout.session.completed') {
//         const session = event.data.object;
//         const orderId = session.metadata?.orderId;

//         if (orderId) {
//           const order = await Order.findById(orderId);
//           if (order) {
//             order.isPaid = true;
//             order.paidAt = Date.now();
//             order.paymentResult = {
//               id: session.payment_intent,
//               status: 'COMPLETED',
//               update_time: new Date().toISOString(),
//               email_address: session.customer_email || 'unknown',
//             };
//             await order.save();
//           }
//         }
//       }

//       res.status(200).json({ received: true });
//     })
//   );

// orderRouter.get(
//   '/mine',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     console.log('User in /mine route:', req.user);
//     try {
//       const orders = await Order.find({ user: req.user._id });
//       console.log('/mine: Found orders:', orders);
//       res.send(orders);
//     } catch (error) {
//       console.error('/mine: Error fetching orders:', error);
//       res.status(500).send({ message: 'Internal server error' });
//     }
//   })
// );
export default orderRouter;
