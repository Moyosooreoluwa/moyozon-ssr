import { Metadata } from 'next';
import { Container } from 'react-bootstrap';
import SearchResults from '@/components/SearchResults';

export const metadata: Metadata = {
  title: 'Search Results | Moyozon',
  description: 'Generated by create next app',
};

export default function SearchPage() {
  return (
    <>
      <Container className="my-5">
        <SearchResults />
      </Container>
    </>
  );
}
