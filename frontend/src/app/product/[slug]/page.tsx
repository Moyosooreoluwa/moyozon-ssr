import AddToCartButton from '@/components/AddToCartButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import MessageBox from '@/components/MessageBox';
import Rating from '@/components/Rating';
import { getError } from '@/utils/errorHandler';
import axios from 'axios';
import Image from 'next/image';
import { CardBody, ListGroupItem } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

interface Product {
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
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  if (!slug) {
    return (
      <Container className="mt-5">
        <LoadingSpinner />
      </Container>
    );
  }

  try {
    const { data: product } = await axios.get<Product>(
      `http://localhost:5000/api/products/slug/${slug}`
    );
    if (!product) {
      return (
        <Container className="mt-5">
          <LoadingSpinner />
        </Container>
      );
    }
    return (
      <Container className="mt-4">
        <Row>
          <Col md={6}>
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={600}
              className="m-auto"
            />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h1>{product.name}</h1>
              </ListGroupItem>
              <ListGroupItem>
                <Rating
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                />
              </ListGroupItem>
              <ListGroupItem>Brand : {product.brand}</ListGroupItem>
              <ListGroupItem>
                <p>{product.description}</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <CardBody>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price.toFixed(2)}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.stockCount > 0 ? (
                          <Badge bg="success">Available</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroupItem>

                  {product.stockCount > 0 && (
                    <ListGroupItem>
                      <div className="d-grid">
                        {/* <Button variant="primary">Add to Cart</Button> */}
                        <AddToCartButton product={product} />
                      </div>
                    </ListGroupItem>
                  )}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  } catch (error) {
    console.log(`Error fetching product: ${getError(error)}`);
    return (
      <Container className="mt-5">
        <MessageBox variant="danger">{getError(error)}</MessageBox>
      </Container>
    );
  }
}
