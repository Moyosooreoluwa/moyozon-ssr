import AddToCartButton from '@/components/AddToCartButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import MessageBox from '@/components/MessageBox';
import Rating from '@/components/Rating';
import { getError } from '@/utils/errorHandler';
import axios from 'axios';
import { Metadata } from 'next';
import Image from 'next/image';
import { CardBody, ListGroupItem } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { FaCalendarDays, FaTruckMoving } from 'react-icons/fa6';

interface Product {
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
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  try {
    const { data: product } = await axios.get<Product>(
      `http://localhost:5000/api/products/slug/${slug}`
    );

    return {
      title: `${product.name} | Moyozon`,
      description: product.description,
      // optionally:
      openGraph: {
        title: `${product.name} | Moyozon`,
        description: product.description,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      title: 'Product Not Found | Moyozon',
    };
  }
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
              height={400}
              className="m-auto"
            />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h1>{product.name}</h1>
                <Col className="text-[#a4a4a4]">{product.brand}</Col>
              </ListGroupItem>
              <ListGroupItem>
                <p>{product.description}</p>
                <Rating
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                />
              </ListGroupItem>

              <ListGroupItem className="text-center text-xl font-bold">
                ${product.price.toFixed(2)}
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <div className="text-center">
                    {product.stockCount > 0 ? (
                      <h4>
                        <Badge bg="success">Available</Badge>
                      </h4>
                    ) : (
                      <h4>
                        <Badge bg="danger">Unavailable</Badge>
                      </h4>
                    )}
                  </div>
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

            <Card>
              <CardBody>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <div className="flex">
                      <FaTruckMoving className="text-[#edcf5d] mt-1 mx-1" />
                      Free Delivery
                    </div>
                    <span className="text-[#a4a4a4] text-[.75rem]">
                      {' '}
                      Free Delivery for all orders over $100.
                    </span>
                  </ListGroupItem>
                  <ListGroupItem>
                    <div className="flex">
                      <FaCalendarDays className="text-[#edcf5d] mx-1 mt-1" />
                      Free Returns
                    </div>
                    <span className="text-[#a4a4a4] text-[.75rem]">
                      {' '}
                      Free 30-day Delivery returns.
                    </span>
                  </ListGroupItem>
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
