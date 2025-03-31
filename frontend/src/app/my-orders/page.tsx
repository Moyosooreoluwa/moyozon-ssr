import MessageBox from '@/components/MessageBox';
import { convertToDDMMYYYY } from '@/utils/changeDateFormat';
import { getError } from '@/utils/errorHandler';
import { getUserInfoFromCookies } from '@/utils/getItemsFromCookies';
import axios from 'axios';
import { Metadata } from 'next';
import Link from 'next/link';
import { Badge, Col, Container, Row } from 'react-bootstrap';

export const metadata: Metadata = {
  title: 'My Orders | Moyozon',
  description: 'Generated by create next app',
};

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

//  Fetch data on the server (SSR)
const fetchMyOrders = async (): Promise<Order[]> => {
  try {
    const userInfo = await getUserInfoFromCookies();
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/mine`,
      {
        headers: { authorization: `Bearer ${userInfo?.token}` },
      }
    );
    return data;
  } catch (error) {
    console.error('Error fetching orders:', getError(error));
    return [];
  }
};

export default async function MyOrdersPage() {
  const orders = await fetchMyOrders();
  return (
    <>
      <Container className="my-6">
        <h2 className="my-3">My Orders</h2>
        {!orders ? (
          <MessageBox variant="secondary">
            No Orders. <Link href={'/'}>Go Shopping</Link>
          </MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL ($)</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <Link href={`/order/${order._id}`}>{order._id}</Link>
                  </td>
                  <td>{order.createdAt?.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>
                    <Row>
                      <Col>
                        <Badge
                          pill
                          bg={`${order.isPaid ? 'success' : 'danger'}`}
                        >
                          {order.isPaid
                            ? `Paid: ${convertToDDMMYYYY(order.paidAt)}`
                            : 'Not Paid'}
                        </Badge>
                      </Col>
                      <Col>
                        <Badge
                          pill
                          bg={`${order.isDelivered ? 'success' : 'danger'}`}
                        >
                          {order.isDelivered
                            ? `Delivered: ${convertToDDMMYYYY(
                                order.deliveredAt
                              )}`
                            : 'Not Delivered'}
                        </Badge>
                      </Col>
                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Container>
    </>
  );
}
