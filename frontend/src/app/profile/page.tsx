import EditProfileForm from '@/components/EditProfileForm';
import { Container } from 'react-bootstrap';

export default function ProfilePage() {
  return (
    <>
      <Container className="my-6">
        <h2 className="my-3">Edit Profile</h2>
        <EditProfileForm />
      </Container>
    </>
  );
}
