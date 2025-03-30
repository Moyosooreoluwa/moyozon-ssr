'use client';

import { getError } from '@/utils/errorHandler';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface OrderItem {
  _id: string;
  slug: string;
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: string; // mongoose.Types.ObjectId as string
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentResult {
  id?: string;
  status?: string;
  update_time?: string;
  email_address?: string;
}

export interface Order {
  _id: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  user: string; // mongoose.Types.ObjectId as string
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

type Props =
  | { type: 'user'; user: User; order?: never; token: string } // Only user allowed
  | { type: 'order'; user?: never; order: Order; token: string }; // Only order allowed

export default function DeleteButton({ type, user, order, token }: Props) {
  const router = useRouter();
  const deleteUserHandler = async (user: User) => {
    if (user) {
      if (window.confirm('Are you sure to delete?')) {
        try {
          await axios.delete(`/api/users/${user._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success('user deleted successfully');
          router.refresh();
        } catch (error) {
          toast.error(getError(error));
        }
      } else {
        toast.error('No user found');
        return;
      }
    }
  };
  const deleteOrderHandler = async (order: Order) => {
    if (order) {
      if (window.confirm('Are you sure to delete this order?')) {
        try {
          await axios.delete(`/api/orders/${order._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success('order deleted successfully');
          router.refresh();
        } catch (err) {
          toast.error(getError(err));
        }
      }
    } else {
      toast.error('No order found');
      return;
    }
  };
  return (
    <>
      {' '}
      {type === 'user' ? (
        <Button
          type="button"
          variant="danger"
          onClick={() => deleteUserHandler(user)}
        >
          Delete
        </Button>
      ) : order ? (
        <Button
          type="button"
          variant="danger"
          onClick={() => deleteOrderHandler(order)}
        >
          Delete
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}
