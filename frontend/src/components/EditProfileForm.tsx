'use client';
import { StoreContext } from '@/store/Store';
import { getError } from '@/utils/errorHandler';
import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import LoadingSpinner from './LoadingSpinner';

interface State {
  loadingUpdate: boolean;
  // Add other state properties here if needed
}

type Action =
  | { type: 'UPDATE_REQUEST' }
  | { type: 'UPDATE_SUCCESS' }
  | { type: 'UPDATE_FAIL' };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function EditProfileForm() {
  const { state, dispatch } = useContext(StoreContext);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [{ loadingUpdate }, rdcDispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      rdcDispatch({ type: 'UPDATE_REQUEST' });
      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        }
      );
      rdcDispatch({
        type: 'UPDATE_SUCCESS',
      });
      dispatch({ type: 'USER_SIGNIN', payload: data });
      toast.success('User updated successfully');
    } catch (err) {
      rdcDispatch({
        type: 'UPDATE_FAIL',
      });
      toast.error(getError(err));
    }
  };

  return (
    <>
      <Container className="container small-container">
        {loadingUpdate ? (
          <LoadingSpinner />
        ) : (
          <>
            <form className="max-w-[400px] m-auto p-4" onSubmit={submitHandler}>
              <FormGroup className="mb-3" controlId="name">
                <FormLabel>Name</FormLabel>
                <FormControl
                  onChange={(e) => setName(e.target.value)}
                  required
                  value={name}
                />
              </FormGroup>

              <FormGroup className="mb-3" controlId="email">
                <FormLabel>Email</FormLabel>
                <FormControl
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
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
              <div className="mb-3">
                <Button type="submit">Update</Button>
              </div>
            </form>
          </>
        )}
      </Container>
      ;
    </>
  );
}
