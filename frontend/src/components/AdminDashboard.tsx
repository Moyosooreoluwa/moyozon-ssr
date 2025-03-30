'use client';

import { StoreContext } from '@/store/Store';
import { getError } from '@/utils/errorHandler';
import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import LoadingSpinner from './LoadingSpinner';
import MessageBox from './MessageBox';
import { Card, CardBody, CardText, CardTitle, Col, Row } from 'react-bootstrap';
import Chart from 'react-google-charts';
import Link from 'next/link';

interface OrderSummary {
  numOrders: number;
  totalSales: number;
}

interface UserSummary {
  numUsers: number;
}

interface DailyOrder {
  _id: string;
  orders: number;
  sales: number;
}

interface ProductCategory {
  _id: string;
  count: number;
}

interface ProductSummary {
  _id: string;
  numProducts: number;
}

interface SummaryData {
  users: UserSummary[];
  orders: OrderSummary[];
  dailyOrders: DailyOrder[];
  productCategories: ProductCategory[];
  products: ProductSummary[];
}

interface State {
  loading: boolean;
  summary?: SummaryData; // Optional summary property
  error?: string; // Optional error property
}

type Action =
  | { type: 'FETCH_REQUEST' }
  | { type: 'FETCH_SUCCESS'; payload: SummaryData }
  | { type: 'FETCH_FAIL'; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function AdminDashboard() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const { state } = useContext(StoreContext);
  const { userInfo } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/orders/summary', {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        });
        console.log(data);

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);
  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Card>
                <CardBody>
                  <CardTitle>
                    <Link href={'/admin/users'} className="no-decoration">
                      {summary?.users && summary.users[0]
                        ? summary.users[0].numUsers
                        : 0}
                    </Link>
                  </CardTitle>
                  <CardText> Users</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardBody>
                  <CardTitle>
                    <Link className="no-decoration" href="/admin/products">
                      {' '}
                      {summary?.products && summary?.products[0]
                        ? summary.products[0].numProducts
                        : 0}
                    </Link>
                  </CardTitle>
                  <CardText> Products</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardBody>
                  <CardTitle>
                    <Link className="no-decoration" href="/admin/orders">
                      {summary?.orders && summary?.users[0]
                        ? summary.orders[0].numOrders
                        : 0}
                    </Link>
                  </CardTitle>
                  <CardText> Orders</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Card className="my-6">
                <CardBody>
                  <CardTitle>
                    $
                    {summary?.orders && summary?.users[0]
                      ? summary.orders[0].totalSales.toFixed(2)
                      : 0}
                  </CardTitle>
                  <CardText> Orders</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <div className="my-3">
            <h2>Sales</h2>
            {summary?.dailyOrders.length === 0 ? (
              <MessageBox>No Sale</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="AreaChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Date', 'Sales'],
                  ...(summary?.dailyOrders.map((x) => [x._id, x.sales]) || []),
                ]}
              ></Chart>
            )}
          </div>
          <div className="my-3">
            <h2>Categories</h2>
            {summary?.productCategories.length === 0 ? (
              <MessageBox>No Category</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Category', 'Products'],
                  ...(summary?.productCategories.map((x) => [x._id, x.count]) ||
                    []),
                ]}
              ></Chart>
            )}
          </div>
        </>
      )}
    </>
  );
}
