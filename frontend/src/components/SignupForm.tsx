'use client';
import { StoreContext } from '@/store/Store';
import { getError } from '@/utils/errorHandler';
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function SignupForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const router = useRouter();

  const { state, dispatch } = useContext(StoreContext);
  const { userInfo } = state;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      dispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      router.push(redirect);
    }
  }, [redirect, router, userInfo]);

  return (
    <>
      <Form className="max-w-[400px] m-auto p-4" onSubmit={submitHandler}>
        <FormGroup className="mb-3" controlId="name">
          <FormLabel>Name</FormLabel>
          <FormControl onChange={(e) => setName(e.target.value)} required />
        </FormGroup>

        <FormGroup className="mb-3" controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
        <div className="'mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div className="mb-3" style={{ margin: '1rem 0 1rem 0' }}>
          Already have an account?{' '}
          <Link href={`/signin?redirect=${redirect}`}>Sign In.</Link>
        </div>
      </Form>
    </>
  );
}
