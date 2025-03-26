import CheckoutSteps from '@/components/CheckoutSteps';
import OrderPreview from '@/components/OrderPreview';
import React from 'react';
import { Container } from 'react-bootstrap';

export default function PlaceOrderPage() {
  return (
    <>
      <Container className="mt-5">
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <h2 className="my-3">Order Preview</h2>
        <OrderPreview />
      </Container>
    </>
  );
}
