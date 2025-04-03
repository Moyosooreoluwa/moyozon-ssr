'use client';
import { StoreContext } from '@/store/Store';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';

export default function ShippingDetailsForm() {
  const { state, dispatch } = useContext(StoreContext);
  const {
    userInfo,
    cart: { shippingDetails },
  } = state;

  const [fullName, setFullName] = useState(shippingDetails.fullName || '');
  const [address, setAddress] = useState(shippingDetails.address || '');
  const [city, setCity] = useState(shippingDetails.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingDetails.postalCode || ''
  );
  const [country, setCountry] = useState(shippingDetails.country || '');
  const [email, setEmail] = useState(shippingDetails.email || '');
  const [phone, setPhone] = useState(shippingDetails.phone || '');
  const [customerMessage, setCustomerMessage] = useState(
    shippingDetails.customerMessage || ''
  );
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push('/signin?redirect=/shipping');
    }
  }, [userInfo, router]);

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch({
      type: 'SAVE_SHIPPING_DETAILS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
        email,
        phone,
        customerMessage: customerMessage ? customerMessage : '',
      },
    });
    router.push('/payment');
  };
  return (
    <>
      <Form className="max-w-[600px] m-auto p-4" onSubmit={submitHandler}>
        <FormGroup className="mb-3" controlId="fullName">
          <FormLabel>Full Name</FormLabel>
          <FormControl
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="address">
          <FormLabel>Address</FormLabel>
          <FormControl
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="city">
          <FormLabel>City</FormLabel>
          <FormControl
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="postalCode">
          <FormLabel>Postal Code</FormLabel>
          <FormControl
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="country">
          <FormLabel>Country</FormLabel>
          <FormControl
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="phone">
          <FormLabel>Phone</FormLabel>
          <FormControl
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="customerMessage">
          <FormLabel>Delivery Message</FormLabel>
          <FormControl
            value={customerMessage}
            onChange={(e) => setCustomerMessage(e.target.value)}
            required
          />
        </FormGroup>
        <div className="mb-3">
          <Button variant="primary" type="submit">
            Continue
          </Button>
        </div>
      </Form>{' '}
    </>
  );
}
