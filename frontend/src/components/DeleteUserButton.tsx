'use client';

import { getError } from '@/utils/errorHandler';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

type Props = { user: User; token: string };

export default function DeleteUserButton({ user, token }: Props) {
  const router = useRouter();
  const deleteHandler = async (user: User) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        await axios.delete(`/api/users/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('user deleted successfully');
        router.refresh();
      } catch (error) {
        toast.error(getError(error));
      }
    }
  };
  return (
    <>
      {' '}
      <Button
        type="button"
        variant="danger"
        onClick={() => deleteHandler(user)}
      >
        Delete
      </Button>
    </>
  );
}
