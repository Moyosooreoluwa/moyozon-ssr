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

export default function SignupForm() {
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
        <FormGroup className="mb-3" controlId="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            required
            // onChange={(e) => setConfirmPassword(e.target.value)}
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
