'use client';
import { getError } from '@/utils/errorHandler';
import axios from 'axios';
import MessageBox from './MessageBox';
import { useContext, useEffect, useReducer } from 'react';
import { StoreContext } from '@/store/Store';
import { useRouter, useSearchParams } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Button,
} from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { convertToDDMMYYYY } from '@/utils/changeDateFormat';
import { loadStripe } from '@stripe/stripe-js';

type Props = {
  id: string;
};

export interface OrderItem {
  _id: string;
  slug: string;
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: string; // mongoose.Types.ObjectId as string
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentResult {
  id?: string;
  status?: string;
  update_time?: string;
  email_address?: string;
}

export interface Order {
  _id: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  user: string; // mongoose.Types.ObjectId as string
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface State {
  loading: boolean;
  order: Order;
  error: string;
  loadingDeliver: boolean;
  successDeliver: boolean;
  // Add other state properties here if needed
}

type Action =
  | { type: 'FETCH_REQUEST' }
  | { type: 'FETCH_SUCCESS'; payload: Order }
  | { type: 'FETCH_FAIL'; payload: string }
  | { type: 'DELIVER_REQUEST' }
  | { type: 'DELIVER_SUCCESS' }
  | { type: 'DELIVER_FAIL' }
  | { type: 'DELIVER_RESET' };

const initialOrder: Order = {
  _id: '',
  orderItems: [],
  shippingAddress: {
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  },
  paymentMethod: '',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: '',
  isPaid: false,
  isDelivered: false,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };

    default:
      return state;
  }
}

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : loadStripe('');

console.log(stripePromise);

export default function OrderSummary({ id }: Props) {
  const orderId = id;
  const { state } = useContext(StoreContext);
  const { userInfo } = state;
  const router = useRouter();

  const [{ loading, error, order, loadingDeliver, successDeliver }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: initialOrder,
      error: '',
      loadingDeliver: false,
      successDeliver: false,
    });

  const searchParams = useSearchParams();
  const payment = searchParams.get('payment'); // Get the 'payment' query parameter

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo?.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    const updateOrderStatus = async () => {
      if (payment === 'success') {
        try {
          await axios.put(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/${order._id}/pay`,
            {
              id: `stripe_${order._id}`,
              status: 'COMPLETED',
              update_time: new Date().toISOString(),
              email_address: userInfo?.email || 'unknown',
            },
            {
              headers: { authorization: `Bearer ${userInfo?.token}` },
            }
          );
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: {
              ...order,
              isPaid: true,
              paidAt: new Date().toISOString(),
              paymentResult: {
                id: `stripe_${order._id}`,
                status: 'COMPLETED',
                update_time: new Date().toISOString(),
                email_address: userInfo?.email || 'unknown',
              },
            },
          });
          //   toast.success('Payment successful via Stripe!');
        } catch (err) {
          toast.error(getError(err));
        }
      } else if (payment === 'canceled') {
        toast.error('Payment cancelled via Stripe.');
      }
    };
    if (!userInfo) {
      router.push('/signin');
    }
    if (!order._id || successDeliver || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
    if (successDeliver) {
      dispatch({ type: 'DELIVER_RESET' });
    }
    if (payment && order._id) {
      updateOrderStatus();
    }
  }, [order, order._id, orderId, payment, router, successDeliver, userInfo]);

  const createOrder = (data: unknown, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice.toFixed(2), // Use the total price from the order
            currency_code: 'USD', // Adjust currency as needed
          },
        },
      ],
    });
  };

  const onApprove = async (data: unknown, actions: any) => {
    const payment = await actions.order.capture();
    try {
      // Update the order on your backend to mark it as paid
      await axios.put(
        `/api/orders/${order._id}/pay`,
        {
          id: payment.id,
          status: payment.status,
          update_time: payment.update_time,
          email_address: payment.payer.email_address,
        },
        {
          headers: { authorization: `Bearer ${userInfo?.token}` },
        }
      );
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: {
          ...order,
          isPaid: true,
          paidAt: new Date().toISOString(),
          paymentResult: {
            id: payment.id,
            status: payment.status,
            update_time: payment.update_time,
            email_address: payment.payer.email_address,
          },
        },
      });
      toast.success('Payment successful!');
    } catch (err) {
      toast.error(getError(err));
    }
    // actions.close();
  };
  const onError = (err: unknown) => {
    toast.error(getError(err));
  };

  const onCancel = () => {
    toast.error('Payment cancelled.');
  };

  const handleStripePayment = async () => {
    try {
      const stripe = await stripePromise;

      if (!stripe) {
        console.error('Stripe failed to initialize.');
        toast.error('Stripe is not available.');
        return;
      }

      console.log('Stripe initialized:', stripe);

      const response = await axios.post(
        `/api/orders/${order._id}/stripe-checkout`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo?.token}` },
        }
      );

      const { url } = response.data;
      if (url) {
        window.location.href = url;
      } else {
        toast.error('Failed to create Stripe Checkout session.');
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error(getError(err));
    }
  };

  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  if (!paypalClientId) {
    throw new Error(
      'PayPal Client ID is missing. Please set NEXT_PUBLIC_PAYPAL_CLIENT_ID in your .env file.'
    );
  }

  async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo?.token}` },
        }
      );
      dispatch({ type: 'DELIVER_SUCCESS' });
      toast.success('Order is delivered');
    } catch (err) {
      dispatch({ type: 'DELIVER_FAIL' });
      toast.error(getError(err));
    }
  }

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Row>
      <Col md={8}>
        <Card className="mb-3">
          <CardBody>
            <CardTitle>Shipping</CardTitle>
            <CardText>
              <strong>Name:</strong> {order.shippingAddress.fullName} <br />
              <strong>Address: </strong> {order.shippingAddress.address},
              {order.shippingAddress.city}, {order.shippingAddress.postalCode},
              {order.shippingAddress.country}
            </CardText>
            {order.isDelivered ? (
              <MessageBox variant="success">
                Delivered on {convertToDDMMYYYY(order.deliveredAt?.toString())}
              </MessageBox>
            ) : (
              <MessageBox variant="danger">Not Delivered</MessageBox>
            )}
          </CardBody>
        </Card>
        <Card className="mb-3">
          <CardBody>
            <Card.Title>Payment</Card.Title>
            <CardText>
              <strong>Method:</strong> {order.paymentMethod}
            </CardText>
            {order.isPaid ? (
              <MessageBox variant="success">
                Paid on {convertToDDMMYYYY(order.paidAt?.toString())}
              </MessageBox>
            ) : (
              <MessageBox variant="danger">Not Paid</MessageBox>
            )}
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardBody>
            <Card.Title>Items</Card.Title>
            <ListGroup variant="flush">
              {order.orderItems.map((item) => (
                <ListGroupItem key={item._id}>
                  <Row className="align-items-center">
                    <Col md={6}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="img-fluid rounded img-thumbnail"
                      />{' '}
                      <Link
                        className="no-decoration text-sm"
                        href={`/product/${item.slug}`}
                        style={{ color: '#010101' }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={3}>
                      <span>{item.quantity}</span>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          </CardBody>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="mb-3">
          <CardBody>
            <Card.Title>Order Summary</Card.Title>
            <PayPalScriptProvider
              options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                currency: 'USD',
              }}
              //   deferLoading={true}
            >
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                    <Row>
                      <p className="text-[.75rem] text-[#a4a4a4]">
                        {' '}
                        Shipping free for all purchases over $100
                      </p>
                    </Row>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                {!order.isPaid &&
                  (!userInfo?.isAdmin ||
                    (userInfo.isAdmin && order.user === userInfo._id)) && (
                    <>
                      {order.paymentMethod === 'PayPal' ? (
                        <>
                          <ListGroupItem>
                            <PayPalButtons
                              style={{
                                layout: 'vertical', // Stacked layout to fit within the ListGroupItem
                                color: 'gold', // Blue button color
                                shape: 'pill', // Rounded corners
                                label: 'pay', // "Pay with PayPal" label
                                height: 40, // Custom height
                                tagline: false, // Hide the tagline
                              }}
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                              onCancel={onCancel}
                            />
                          </ListGroupItem>
                        </>
                      ) : (
                        <>
                          <ListGroupItem>
                            <Button
                              onClick={handleStripePayment}
                              style={{
                                width: '100%',
                                backgroundColor: '#625AFA',
                                color: 'white',
                                borderRadius: '2rem',
                              }}
                            >
                              Pay with{' '}
                              <span className="font-black">Stripe</span>
                            </Button>
                          </ListGroupItem>
                        </>
                      )}
                    </>
                  )}
                {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroupItem>
                    {loadingDeliver ? (
                      <LoadingSpinner />
                    ) : (
                      <div className="d-grid">
                        <Button type="button" onClick={deliverOrderHandler}>
                          Deliver Order
                        </Button>
                      </div>
                    )}
                  </ListGroupItem>
                )}
              </ListGroup>
            </PayPalScriptProvider>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
