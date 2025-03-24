import Image from 'next/image';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import Rating from './Rating';

type ProductProps = {
  product: {
    _id: string;
    name: string;
    slug: string;
    image: string;
    price: number;
    rating: number;
    reviewCount: number;
    stockCount: number;
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

      <Card.Body className="">
        {/* <Card.Body className="d-flex flex-column"> */}
        <Link
          href={`/product/${product.slug}`}
          passHref
          className="no-underline no-decoration"
        >
          <Card.Title
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
          </Card.Title>
        </Link>
        <Rating rating={product.rating} reviewCount={product.reviewCount} />
        <Card.Text className="">${product.price.toFixed(2)}</Card.Text>
        <Button>Add to cart</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
