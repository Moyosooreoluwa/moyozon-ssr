'use client';
import {
  Button,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import MessageBox from './MessageBox';
import { useContext, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StoreContext } from '@/store/Store';
import { getError } from '@/utils/errorHandler';
import axios from 'axios';
import { toast } from 'react-toastify';

type Props = {
  id: string;
};

interface State {
  loading: boolean;
  loadingUpdate: boolean;
  error?: string; // Optional error property
}

type Action =
  | { type: 'FETCH_REQUEST' }
  | { type: 'FETCH_SUCCESS' }
  | { type: 'FETCH_FAIL'; payload: string }
  | { type: 'UPDATE_REQUEST' }
  | { type: 'UPDATE_SUCCESS' }
  | { type: 'UPDATE_FAIL'; payload?: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, error: action.payload };
    default:
      return state;
  }
};

export default function EditUserForm({ id }: Props) {
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    loadingUpdate: false,
  });

  const { state } = useContext(StoreContext);
  const { userInfo } = state;
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        });
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [id, userInfo]);

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/users/${id}`,
        { _id: id, name, email, isAdmin },
        {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('User updated successfully');
      router.push('/admin/users');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form className="max-w-[400px] m-auto p-4" onSubmit={submitHandler}>
          <FormGroup className="mb-3" controlId="name">
            <FormLabel>Name</FormLabel>
            <FormControl
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="email">
            <FormLabel>Email</FormLabel>
            <FormControl
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>

          <FormCheck
            className="mb-3"
            type="checkbox"
            id="isAdmin"
            label="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />

          <div className="mb-3">
            <Button disabled={loadingUpdate} type="submit">
              Update
            </Button>
            {loadingUpdate && <LoadingSpinner />}
          </div>
        </Form>
      )}
    </>
  );
}
