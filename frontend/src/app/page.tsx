import Product from '@/components/Product';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import MessageBox from '@/components/MessageBox';

interface ProductType {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  stockCount: number;
  rating: number;
  reviewCount: number;
  slug: string;
  category: string;
  brand: string;
  // Add other fields based on your product model
}

// ✅ Fetch data on the server (SSR)
const getProducts = async (): Promise<ProductType[]> => {
  try {
    const res = await axios.get(`http://localhost:5000/api/products`);
    return res.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export default async function HomePage() {
  const products = await getProducts();

  return (
    <Container className="my-6">
      <h1 className="my-6">Featured Products</h1>
      <div className="flex flex-wrap justify-center my-2">
        {!products.length ? (
          <MessageBox variant="secondary">No Products Found</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Container>
  );
}
