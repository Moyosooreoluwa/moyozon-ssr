'use client';
import { StoreContext } from '@/store/Store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';
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

export default function OrderPreview() {
  const router = useRouter();
  const { state, dispatch } = useContext(StoreContext);
  const { cart, userInfo } = state;

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {};

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
                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                <strong>Address: </strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
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
                          width={100}
                          height={100}
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
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}
