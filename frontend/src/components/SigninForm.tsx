'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';

export default function SigninForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  return (
    <>
      <Form className="max-w-[400px] m-auto p-4">
        <FormGroup className="mb-3" controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl type="email" required />
        </FormGroup>
        <FormGroup className="mb-3" controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl type="password" required />
        </FormGroup>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-">
          {' '}
          Dont have an account?{' '}
          <Link href={`/signup?redirect=${redirect}`}>Sign Up</Link>
        </div>
      </Form>
    </>
  );
}
