import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, CardText, CardTitle } from 'react-bootstrap';
import Rating from './Rating';
import AddToCartButton from './AddToCartButton';

type ProductProps = {
  product: {
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
  };
};

const Product = ({ product }: ProductProps) => {
  return (
    <Card style={{ height: '450px', display: 'flex', flexDirection: 'column' }}>
      <Link href={`/product/${product.slug}`} passHref>
        <div style={{ position: 'relative', width: '100%', height: '250px' }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </Link>

      <CardBody className="">
        {/* <Card.Body className="d-flex flex-column"> */}
        <Link
          href={`/product/${product.slug}`}
          passHref
          className="no-underline no-decoration"
        >
          <CardTitle
            style={{
              minHeight: '48px',
              maxHeight: '48px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.name}
          </CardTitle>
        </Link>
        <Rating rating={product.rating} reviewCount={product.reviewCount} />
        <CardText className="">${product.price.toFixed(2)}</CardText>
        <AddToCartButton product={product} />
      </CardBody>
    </Card>
  );
};

export default Product;
