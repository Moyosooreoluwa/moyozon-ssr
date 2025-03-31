'use client';
import { StoreContext } from '@/store/Store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { getError } from '@/utils/errorHandler';
import { toast } from 'react-toastify';
import LoadingSpinner from './LoadingSpinner';

interface State {
  loading: boolean;
  // Add other state properties here if needed
}

type Action =
  | { type: 'CREATE_REQUEST' }
  | { type: 'CREATE_SUCCESS' }
  | { type: 'CREATE_FAIL' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default function OrderPreview() {
  const router = useRouter();
  const { state, dispatch } = useContext(StoreContext);
  const { cart, userInfo } = state;
  const [{ loading }, rdcDispatch] = useReducer(reducer, {
    loading: false,
  });
  //rdcDispatch since a dispatch already exists

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      rdcDispatch({ type: 'CREATE_REQUEST' });

      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          shippingDetails: cart.shippingDetails,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      dispatch({ type: 'CART_CLEAR' });
      rdcDispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      router.push(`/order/${data.order._id}`);
    } catch (err) {
      rdcDispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      router.push('/payment');
    }
  }, [cart, router]);
  return (
    <>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle>Shipping</CardTitle>
              <CardText>
                <strong>Name:</strong> {cart.shippingDetails.fullName} <br />
                <strong>Address: </strong> {cart.shippingDetails.address},
                {cart.shippingDetails.city}, {cart.shippingDetails.postalCode},
                {cart.shippingDetails.country}
                <br />
                <strong>Email: </strong> {cart.shippingDetails.email}
                <br />
                <strong>Phone: </strong> {cart.shippingDetails.phone}
                <br />
                <strong>Delivery Message: </strong>{' '}
                {cart.shippingDetails.customerMessage}
              </CardText>
              <Link href="/shipping">Edit</Link>
            </CardBody>
          </Card>

          <Card className="mb-3">
            <CardBody>
              <CardTitle>Payment</CardTitle>
              <CardText>
                <strong>Method:</strong> {cart.paymentMethod}
              </CardText>
              <Link href="/payment">Edit</Link>
            </CardBody>
          </Card>

          <Card className="mb-3">
            <CardBody>
              <CardTitle>Items</CardTitle>
              <ListGroup variant="flush">
                {cart.cartItems.map((item) => (
                  <ListGroupItem key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                          width={50}
                          height={50}
                        />{' '}
                        <Link
                          className="no-decoration text-sm"
                          href={`/product/${item.slug}`}
                          style={{ color: '#010101' }}
                        >
                          {item.name}
                        </Link>{' '}
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
              <Link href="/cart">Edit</Link>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardBody>
              <CardTitle>Order Summary</CardTitle>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Items</Col>
                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${cart.shippingPrice.toFixed(2)}</Col>
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
                    <Col>${cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <div className="d-grid">
                      <Button
                        type="button"
                        onClick={placeOrderHandler}
                        disabled={cart.cartItems.length === 0}
                      >
                        Place Order
                      </Button>
                    </div>
                  )}
                </ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}
