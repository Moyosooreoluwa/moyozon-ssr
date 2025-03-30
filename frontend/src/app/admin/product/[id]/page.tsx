import EditProductForm from '@/components/EditProductForm';
import { Metadata } from 'next';
import { Container } from 'react-bootstrap';

interface Props {
  params: { id: string };
}

export const metadata: Metadata = {
  title: 'Product (Admin) | Moyozon',
};

export default function ProductAdminPage({ params }: Props) {
  const { id } = params;
  return (
    <>
      <Container className="my-6">
        <h2 className="my-3">Edit Product</h2>
        <EditProductForm productId={id} />
      </Container>
    </>
  );
}
