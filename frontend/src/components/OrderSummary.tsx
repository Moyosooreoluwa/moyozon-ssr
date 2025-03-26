'use client';
import { getError } from '@/utils/errorHandler';
import axios from 'axios';
import MessageBox from './MessageBox';
import { useContext, useEffect, useReducer } from 'react';
import { StoreContext } from '@/store/Store';
import { useRouter } from 'next/navigation';
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
} from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';

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
  // Add other state properties here if needed
}

type Action =
  | { type: 'FETCH_REQUEST' }
  | { type: 'FETCH_SUCCESS'; payload: Order }
  | { type: 'FETCH_FAIL'; payload: string };

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

    default:
      return state;
  }
}

export default function OrderSummary({ id }: Props) {
  const orderId = id;
  const { state } = useContext(StoreContext);
  const { userInfo } = state;

  const router = useRouter();

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: initialOrder,
    error: '',
  });

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
    if (!userInfo) {
      router.push('/signin');
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order._id, orderId, router, userInfo]);

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
                Delivered at {order.deliveredAt}
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
              <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
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
                        width={100}
                        height={100}
                        className="img-fluid rounded img-thumbnail"
                      />{' '}
                      <Link href={`/product/${item.slug}`}>{item.name}</Link>
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
                    <p className="text-[.75rem] text-gray-500">
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
            </ListGroup>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
