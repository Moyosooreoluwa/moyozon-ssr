import MessageBox from '@/components/MessageBox';
import { convertToDDMMYYYY } from '@/utils/changeDateFormat';
import { getError } from '@/utils/errorHandler';
import { getUserInfoFromCookies } from '@/utils/getItemsFromCookies';
import axios from 'axios';
import Link from 'next/link';
import { Badge, Col, Container, Row } from 'react-bootstrap';

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

// ✅ Fetch data on the server (SSR)
const getMyOrders = async (): Promise<Order[]> => {
  try {
    const userInfo = await getUserInfoFromCookies();
    console.log('gotten token: ', userInfo);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/user/${userInfo._id}`,
      //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/mine`,
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

export default async function MyOrders() {
  const orders = await getMyOrders();
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
                            ? convertToDDMMYYYY(order.paidAt)
                            : 'Not Paid'}
                        </Badge>
                      </Col>
                      <Col>
                        <Badge
                          pill
                          bg={`${order.isDelivered ? 'success' : 'danger'}`}
                        >
                          {order.isDelivered
                            ? convertToDDMMYYYY(order.deliveredAt)
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
