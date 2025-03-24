import Image from 'next/image';
import React from 'react';
import { Button, Card, CardBody } from 'react-bootstrap';
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
  };
};

const Product = ({ product }: ProductProps) => {
  return (
    <>
      <Card
        style={{ height: '500px', display: 'flex', flexDirection: 'column' }}
      >
        {/* <Link to={`/product/${product.slug}`}> */}
        <Image
          src={product.image}
          alt={product.name}
          width={679}
          height={829}
          style={{ objectFit: 'cover', height: '250px' }} // control image height
        />
        {/* </Link> */}
        <CardBody>
          {/* <Link to={`/product/${product.slug}`}> */}
          <Card.Title
            style={{
              minHeight: '48px', // Enough for 2 lines of text
              maxHeight: '48px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2, // Limit to 2 lines
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.name}
          </Card.Title>
          {/* </Link> */}
          <Rating rating={product.rating} reviewCount={product.reviewCount} />
          <Card.Text className="mt-auto">${product.price}</Card.Text>
          <Button>Add to cart</Button>
        </CardBody>
      </Card>
    </>
  );
};

export default Product;
