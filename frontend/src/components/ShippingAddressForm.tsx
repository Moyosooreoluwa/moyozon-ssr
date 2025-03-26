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

export default function ShippingAddressForm() {
  const { state, dispatch: dispatch } = useContext(StoreContext);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push('/signin?redirect=/shipping');
    }
  }, [userInfo, router]);

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
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
        <div className="mb-3">
          <Button variant="primary" type="submit">
            Continue
          </Button>
        </div>
      </Form>{' '}
    </>
  );
}
