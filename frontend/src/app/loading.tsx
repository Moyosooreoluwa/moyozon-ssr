'use client';
import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

export default function Loading() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center min-h-screen"
      //   style={{ minHeight: '100vh' }} // Full viewport height
    >
      <Spinner variant="primary" animation="border" role="status">
        <span className="visually-hidden">Loading ...</span>
      </Spinner>
    </Container>
  );
}
