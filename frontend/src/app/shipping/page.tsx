import CheckoutSteps from '@/components/CheckoutSteps';
import ShippingAddressForm from '@/components/ShippingAddressForm';
import { Metadata } from 'next';
import React from 'react';
import { Container } from 'react-bootstrap';

export const metadata: Metadata = {
  title: 'Shipping | Moyozon',
  description: 'Generated by create next app',
};

export default function ShippingScreen() {
  return (
    <>
      <Container className="mt-5 max-w-[600px]">
        <CheckoutSteps step1 step2></CheckoutSteps>
        <h2 className="my-3">Shipping Address</h2>
        <ShippingAddressForm />
      </Container>
    </>
  );
}
