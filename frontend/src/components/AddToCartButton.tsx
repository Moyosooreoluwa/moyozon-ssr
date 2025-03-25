'use client';
import { StoreContext } from '@/store/Store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';

interface CartProduct {
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
  //   quantity: number;
}
interface AddToCartButtonProps {
  product: CartProduct;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { state, dispatch } = useContext(StoreContext);
  const { cart } = state;
  const router = useRouter();
  const handleAddToCart = async () => {
    const existItem = cart?.cartItems?.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Button
      onClick={handleAddToCart}
      variant={`${product.stockCount < 1 ? 'secondary' : 'primary'}`}
      disabled={product.stockCount < 1}
    >
      {product.stockCount < 1 ? 'Unavailable' : 'Add to Cart'}
    </Button>
  );
};

export default AddToCartButton;
