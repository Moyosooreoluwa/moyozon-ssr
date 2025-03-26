import OrderSummary from '@/components/OrderSummary';
import { Metadata } from 'next';
import React from 'react';
import { Container } from 'react-bootstrap';

interface Props {
  params: { id: string };
}

// export interface OrderItem {
//   slug: string;
//   name: string;
//   quantity: number;
//   image: string;
//   price: number;
//   product: string; // mongoose.Types.ObjectId as string
// }

// export interface ShippingAddress {
//   fullName: string;
//   address: string;
//   city: string;
//   postalCode: string;
//   country: string;
// }

// export interface PaymentResult {
//   id?: string;
//   status?: string;
//   update_time?: string;
//   email_address?: string;
// }

// export interface Order {
//   _id: string;
//   orderItems: OrderItem[];
//   shippingAddress: ShippingAddress;
//   paymentMethod: string;
//   paymentResult?: PaymentResult;
//   itemsPrice: number;
//   shippingPrice: number;
//   taxPrice: number;
//   totalPrice: number;
//   user: string; // mongoose.Types.ObjectId as string
//   isPaid: boolean;
//   paidAt?: Date | string;
//   isDelivered: boolean;
//   deliveredAt?: Date | string;
//   createdAt?: Date | string;
//   updatedAt?: Date | string;
// }

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
