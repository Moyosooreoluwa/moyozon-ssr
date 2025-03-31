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

export interface ShippingDetails {
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
  shippingDetails: ShippingDetails;
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

interface Product {
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
}

type Props =
  | { type: 'user'; user: User; order?: never; product?: never; token: string } // Only user allowed
  | {
      type: 'order';
      user?: never;
      order: Order;
      product?: never;
      token: string;
    } // Only order allowed
  | {
      type: 'product';
      user?: never;
      order?: never;
      product: Product;
      token: string;
    }; // Only order allowed

export default function DeleteButton({
  type,
  user,
  order,
  product,
  token,
}: Props) {
  const router = useRouter();
  const deleteUserHandler = async (user: User) => {
    if (!user) {
      toast.error('No user found');
      return;
    }
    if (window.confirm('Are you sure to delete?')) {
      try {
        await axios.delete(`/api/users/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('user deleted successfully');
        router.refresh();
      } catch (err) {
        toast.error(getError(err));
      }
    }
  };
  const deleteOrderHandler = async (order: Order) => {
    if (!order) {
      toast.error('No order found');
      return;
    }
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
  };
  const deleteProductHandler = async (product: Product) => {
    if (!product) {
      toast.error('No product found');
      return;
    }
    if (window.confirm('Are you sure to delete?')) {
      try {
        await axios.delete(`/api/products/${product._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('product deleted successfully');
        window.location.reload();
      } catch (err) {
        toast.error(getError(err));
      }
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
      ) : product ? (
        <Button
          type="button"
          variant="danger"
          onClick={() => deleteProductHandler(product)}
        >
          Delete
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}
