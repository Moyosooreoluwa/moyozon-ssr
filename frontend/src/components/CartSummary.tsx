'use client';
import { StoreContext } from '@/store/Store';
import React, { useContext } from 'react';
import {
  Button,
  Card,
  CardBody,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import MessageBox from './MessageBox';
import Link from 'next/link';
import Image from 'next/image';
import { FaCircleMinus, FaCirclePlus, FaTrash } from 'react-icons/fa6';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface CartItem {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  stockCount: number;
  rating: number;
  reviewCount: number;
  slug: string;
  category: string;
  brand: string;
  quantity: number;
}

export default function CartSummary() {
  const router = useRouter();
  const { state, dispatch } = useContext(StoreContext);
  const { cart } = state;
  console.log(cart);

  const updateCartHandler = async (item: CartItem, quantity: number) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item: CartItem) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  return (
    <>
      <Col md={8}>
        {cart?.cartItems?.length === 0 ? (
          <MessageBox>
            Cart is Empty <Link href={'/'}>Go Shopping</Link>
          </MessageBox>
        ) : (
          <ListGroup>
            {cart.cartItems.map((item) => (
              <ListGroupItem key={item._id}>
                <Row className="items-center">
                  <Col md={4}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                    />
                    <Link
                      className="no-decoration"
                      href={`/product/${item.slug}`}
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={3}>
                    <Button
                      variant="light"
                      disabled={item.quantity === 1}
                      onClick={() => updateCartHandler(item, item.quantity - 1)}
                    >
                      <FaCircleMinus />
                    </Button>{' '}
                    <span>{item.quantity}</span>{' '}
                    <Button
                      variant="light"
                      disabled={item.quantity === item.stockCount}
                      onClick={() => updateCartHandler(item, item.quantity + 1)}
                    >
                      <FaCirclePlus />
                    </Button>
                  </Col>
                  <Col md={3}>${item.price.toFixed(2)}</Col>
                  <Col md={2}>
                    <Button
                      variant="danger"
                      onClick={() => removeItemHandler(item)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <CardBody>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>
                  Subtotal ({cart.cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                  items) : $
                  {cart.cartItems
                    .reduce((a, c) => a + c.price * c.quantity, 0)
                    .toFixed(2)}
                </h3>
              </ListGroupItem>
              <ListGroupItem>
                <div className="">
                  <Button
                    type="button"
                    variant="primary"
                    disabled={cart.cartItems.length === 0}
                    onClick={() => router.push('/')}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}
