'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { FaSistrix } from 'react-icons/fa6';

export default function SearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push(query ? `/search/?query=${query}` : '/search');
  };
  return (
    <>
      <Form className=" me-auto w-full" onSubmit={submitHandler}>
        <InputGroup>
          <FormControl
            type="text"
            name="q"
            id="q"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            aria-label="Search Products"
            aria-describedby="button-search"
          ></FormControl>
          <Button variant="outline-secondary" type="submit" id="button-search">
            <FaSistrix />{' '}
          </Button>
        </InputGroup>
      </Form>
    </>
  );
}
