import AdminDashboard from '@/components/AdminDashboard';
import React from 'react';
import { Container } from 'react-bootstrap';

export default function AdminDashboardPage() {
  return (
    <>
      <Container className="my-6">
        <h2 className="my-6">Dashboard</h2>
        <AdminDashboard />
      </Container>
    </>
  );
}
