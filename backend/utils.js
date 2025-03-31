import jwt from 'jsonwebtoken';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export const mailersend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

export const sendOrderConfirmationEmail = async (order) => {
  try {
    const recipients = [
      new Recipient(
        order.shippingDetails.email,
        order.shippingDetails.fullName
      ),
    ]; // Use order.user.email and order.user.name

    const personalization = [
      {
        email: order.shippingDetails.email,
        data: {
          items: order.orderItems.map((item) => ({
            price: item.price,
            product: item.name,
            quantity: item.quantity,
          })),
          order: {
            date: order.createdAt.toLocaleDateString(),
            order_number: order._id,
            billing_address:
              order.shippingDetails.address +
              ', ' +
              order.shippingDetails.city +
              ', ' +
              order.shippingDetails.postalCode +
              ', ' +
              order.shippingDetails.country,
            customer_message: order.customerMessage || '', // Add customer message if it exists
          },
          store: {
            name: 'Moyozon-SSR', // Replace with your store name
          },
          invoice: {
            total: order.totalPrice,
            subtotal: order.itemsPrice,
            pay_method: order.paymentMethod,
          },
          customer: {
            name: order.shippingDetails.fullName,
            email: order.shippingDetails.email,
            phone: order.shippingDetails.phone,
            first_name: order.shippingDetails.fullName, // Assuming the first word is the first name
          },
          account_name: 'Moyozon-SSR', // Replace with your account name
        },
      },
    ];
    const sentFrom = new Sender(
      'iMS_hSciaI@trial-zxk54v8znnzljy6v.mlsender.net',
      'Moyozon-SSR'
    );

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject('Order Confirmation') // Set your subject
      .setTemplateId('351ndgwkvrqgzqx8') // Replace with your MailerSend template ID
      .setPersonalization(personalization);

    const response = await mailersend.email.send(emailParams);
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
