import EditUserForm from '@/components/EditUserForm';
import { Metadata } from 'next';
import { Container } from 'react-bootstrap';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;

  return {
    title: ` User ${id} | Moyozon`,
    description: `Details of User ${id} on Moyozon`,
  };
}

export default function EditUserPage({ params }: Props) {
  const { id } = params;
  return (
    <>
      <Container className="my-5">
        <h2 className="my-3">Edit User</h2>
        <EditUserForm id={id} />
      </Container>
    </>
  );
}
