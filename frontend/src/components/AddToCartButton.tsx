'use client';
import { StoreContext } from '@/store/Store';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
interface CartProduct {
  //   _id: string;
  name: string;
  //   image: string;
  //   description: string;
  price: number;
  //   stockCount: number;
  //   rating: number;
  //   reviewCount: number;
  //   slug: string;
  //   category: string;
  //   brand: string;
  //   quantity: number;
}
interface AddToCartButtonProps {
  product: CartProduct;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { dispatch } = useContext(StoreContext);

  const handleAddToCart = () => {
    dispatch({ type: 'CART_ADD_ITEM', payload: product });
    // Optional: Update cookies here using js-cookie
  };

  return (
    <Button onClick={handleAddToCart} variant="primary">
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
