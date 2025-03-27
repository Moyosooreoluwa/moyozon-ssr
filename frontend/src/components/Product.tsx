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
    <Card
      style={{
        // height: '400px',
        width: '250px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '0.5rem',
        borderColor: 'transparent',
      }}
    >
      <Link href={`/product/${product.slug}`} passHref>
        <div style={{ position: 'relative', width: '100%', height: '250px' }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
          />
        </div>
      </Link>

      <CardBody style={{ padding: 0 }} className="">
        {/* <Card.Body className="d-flex flex-column"> */}
        <Link
          href={`/product/${product.slug}`}
          passHref
          className="no-underline no-decoration text-[#010101]"
        >
          <CardTitle
            style={{
              minHeight: '38px',
              maxHeight: '38px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              fontSize: '1rem',
              color: '#010101',
              marginTop: '0.5rem',
            }}
          >
            {product.name}
          </CardTitle>
        </Link>
        <CardText
          style={{ fontSize: '0.75rem', fontWeight: 'bold', margin: 0 }}
          className=""
        >
          ${product.price.toFixed(2)}
        </CardText>
        <Rating rating={product.rating} reviewCount={product.reviewCount} />
        <AddToCartButton product={product} />
      </CardBody>
    </Card>
  );
};

export default Product;
