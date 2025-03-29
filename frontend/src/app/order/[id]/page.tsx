import OrderSummary from '@/components/OrderSummary';
import { Metadata } from 'next';
import React from 'react';
import { Container } from 'react-bootstrap';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  console.log(id);

  return {
    title: `Order ${id} | Moyozon`,
    description: `Details of Order ${id} on Moyozon`,
  };
}

export default function OrderPage({ params }: Props) {
  const { id } = params;
  return (
    <>
      <Container className="mt-5">
        <h2 className="my-3">Your Order</h2>
        <OrderSummary id={id} />
      </Container>
    </>
  );
}
