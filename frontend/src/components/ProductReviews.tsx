'use client';

import { StoreContext } from '@/store/Store';
import { getError } from '@/utils/errorHandler';
import axios from 'axios';
import { FormEvent, useContext, useReducer, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import MessageBox from './MessageBox';
import Link from 'next/link';
import LoadingSpinner from './LoadingSpinner';
import {
  Button,
  Col,
  FloatingLabel,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import Rating from './Rating';

interface Product {
  _id: string;
  name: string;
  image: string;
  images?: string[];
  description: string;
  price: number;
  stockCount: number;
  rating: number;
  reviewCount: number;
  slug: string;
  category: string;
  brand: string;
  reviews?: Review[]; // Added reviews to Product
}

interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}
type Action =
  | { type: 'CREATE_REQUEST' }
  | { type: 'CREATE_SUCCESS' }
  | { type: 'REFRESH_PRODUCT'; payload: Product }
  | { type: 'CREATE_FAIL'; payload: string };

interface State {
  product: Product;
  error: string;
  loadingCreateReview: boolean; // Added missing property
  // Add other state properties here if needed
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false, error: action.payload }; // Added error update  }
  }
};

export default function ProductReviews({ product }: { product: Product }) {
  const reviewsRef = useRef<HTMLHeadingElement>(null);

  const [{ loadingCreateReview }, dispatch] = useReducer(reducer, {
    product: product, // Use passed product prop
    error: '',
    loadingCreateReview: false,
  });

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { state } = useContext(StoreContext);
  const { userInfo } = state;

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment || !rating) {
      toast.error('Please enter comment and rating');
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/products/${product._id}/reviews`,
        { rating, comment, name: userInfo?.name },
        {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        }
      );

      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Review submitted successfully');
      if (product.reviews) {
        product.reviews.unshift(data.review);
      }
      product.reviewCount = data.reviewCount;
      product.rating = data.rating;
      dispatch({ type: 'REFRESH_PRODUCT', payload: product });
      window.scrollTo({
        behavior: 'smooth',
        top: reviewsRef.current?.offsetTop || 0,
      });
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'CREATE_FAIL', payload: getError(error) });
    }
  };
  return (
    <>
      <Row className="my-3 ">
        <h2 className="text-center" ref={reviewsRef}>
          Reviews
        </h2>

        <Col>
          {' '}
          <div className="my-3">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <h2>Write a customer review</h2>
                <FormGroup className="mb-3" controlId="rating">
                  <FormLabel>Rating</FormLabel>
                  <FormSelect
                    aria-label="Rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  >
                    <option value="">Select...</option>
                    <option value="1">1- Poor</option>
                    <option value="2">2- Fair</option>
                    <option value="3">3- Good</option>
                    <option value="4">4- Very good</option>
                    <option value="5">5- Excelent</option>
                  </FormSelect>
                </FormGroup>
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Comments"
                  className="mb-3"
                >
                  <FormControl
                    as="textarea"
                    placeholder="Leave a comment here"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </FloatingLabel>

                <div className="mb-3">
                  <Button disabled={loadingCreateReview} type="submit">
                    Submit
                  </Button>
                  {loadingCreateReview && <LoadingSpinner />}
                </div>
              </form>
            ) : (
              <MessageBox>
                Please{' '}
                <Link href={`/signin?redirect=/product/${product.slug}`}>
                  Sign In
                </Link>{' '}
                to write a review
              </MessageBox>
            )}
          </div>
        </Col>
        <Col>
          {' '}
          <div className="mb-3">
            {product.reviews?.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
          </div>
          <ListGroup>
            {product.reviews?.map((review: Review) => (
              <ListGroupItem key={review._id}>
                <strong>{review.name}</strong>
                <Rating rating={review.rating} caption=" " />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}
