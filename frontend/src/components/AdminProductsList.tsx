'use client';

import { StoreContext } from '@/store/Store';
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useReducer } from 'react';
import MessageBox from './MessageBox';
import LoadingSpinner from './LoadingSpinner';
import { getError } from '@/utils/errorHandler';
import { toast } from 'react-toastify';
import { Row, Col, Button } from 'react-bootstrap';

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

interface AdminProduct {
  countProducts: number;
  pages: number;
  page: number;
  products: Product[];
}

type Action =
  | { type: 'FETCH_REQUEST' }
  | { type: 'FETCH_SUCCESS'; payload: AdminProduct }
  | { type: 'FETCH_FAIL'; payload: string };

interface State {
  loading: boolean;
  products: AdminProduct;
  error: string;
  pages: number;
  // Add other state properties here if needed
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload, // Assign the full AdminProduct object
        pages: action.payload.pages, // Optional: keep if you want pages at root level
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const initialState: State = {
  loading: true,
  products: { countProducts: 0, pages: 1, page: 1, products: [] }, // Initial AdminProduct
  error: '',
  pages: 1, // Match initial products.pages
};
export default function AdminProductsList() {
  const router = useRouter();
  const [{ loading, error, products, pages }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || 1;

  const { state } = useContext(StoreContext);
  const { userInfo } = state;
  const createHandler = async () => {
    if (window.confirm('Are you sure to create?')) {
      try {
        const { data } = await axios.post(
          '/api/products',
          {},
          {
            headers: { Authorization: `Bearer ${userInfo?.token}` },
          }
        );
        toast.success('product created successfully');
        router.push(`/admin/product/${data.product._id}`);
      } catch (err) {
        toast.error(getError(err));
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page} `, {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        });

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchData();
  }, [page, userInfo]);
  return (
    <>
      {' '}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {' '}
          <Row>
            <Col>
              <h2 className="my-3">All Products</h2>
            </Col>
            <Col className="col text-end">
              <div>
                <Button type="button" onClick={createHandler}>
                  Create Product
                </Button>
              </div>
            </Col>
          </Row>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE($)</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {products.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link href={`/admin/product/${product._id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === Number(page) ? 'btn text-bold' : 'btn'}
                key={x + 1}
                href={`/admin/products?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
