import SigninForm from '@/components/SigninForm';
import { Metadata } from 'next';
import React from 'react';
import { Container } from 'react-bootstrap';

export const metadata: Metadata = {
  title: 'Moyozon Signin',
  description: 'Generated by create next app',
};

export default function SigninPage() {
  return (
    <>
      <Container className="mt-5 max-w-[600px]">
        <h3 className="my-3 text-center">Sign In</h3>
        <SigninForm />
      </Container>
    </>
  );
}
