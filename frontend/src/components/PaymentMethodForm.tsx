'use client';
import { StoreContext } from '@/store/Store';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, FormCheck } from 'react-bootstrap';

export default function PaymentMethodForm() {
  const router = useRouter();
  const { state, dispatch } = useContext(StoreContext);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    }
  }, [shippingAddress, router]);

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    router.push('/placeorder');
  };
  return (
    <>
      <Form className="max-w-[400px]" onSubmit={submitHandler}>
        <div className="mb-3">
          <FormCheck
            type="radio"
            id="PayPal"
            label="PayPal"
            value="PayPal"
            checked={paymentMethodName === 'PayPal'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <FormCheck
            type="radio"
            id="Stripe"
            label="Stripe"
            value="Stripe"
            checked={paymentMethodName === 'Stripe'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Button type="submit">Continue</Button>
        </div>
      </Form>
    </>
  );
}
