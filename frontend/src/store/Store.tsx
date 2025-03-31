'use client';

import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import Cookies from 'js-cookie';

export interface CartItem {
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
  quantity: number;
}

export interface shippingDetails {
  fullName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  email?: string;
  phone?: string;
}

export interface Cart {
  cartItems: CartItem[];
  shippingDetails: shippingDetails;
  paymentMethod: string;
  itemsPrice?: number; // Optional, as it's calculated
  shippingPrice?: number; // Optional, as it's calculated
  taxPrice?: number; // Optional, as it's calculated
  totalPrice?: number; // Optional, as it's calculated
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}
interface StateType {
  cart: Cart;
  userInfo: UserInfo | null;
}

export type ActionType =
  | { type: 'CART_ADD_ITEM'; payload: CartItem }
  | { type: 'CART_REMOVE_ITEM'; payload: CartItem }
  | { type: 'USER_SIGNIN'; payload: UserInfo }
  | { type: 'USER_SIGNOUT' }
  | { type: 'SAVE_SHIPPING_DETAILS'; payload: shippingDetails }
  | { type: 'SAVE_PAYMENT_METHOD'; payload: string }
  | { type: 'CART_CLEAR' };

const initialState: StateType = {
  cart: {
    cartItems: [],
    shippingDetails: {},
    paymentMethod: '',
  },
  userInfo: null,
};

export const StoreContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

export function reducer(state: StateType, action: ActionType): StateType {
  console.log(action);
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state?.cart?.cartItems?.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'USER_SIGNIN': {
      Cookies.set('userInfo', JSON.stringify(action.payload));
      return { ...state, userInfo: action.payload };
    }
    case 'USER_SIGNOUT': {
      Cookies.remove('userInfo');
      Cookies.remove('cartItems');
      return {
        ...state,
        userInfo: null,
        cart: { ...state.cart, cartItems: [] }, //  clear cart
      };
    }
    case 'SAVE_SHIPPING_DETAILS':
      Cookies.set('shippingDetails', JSON.stringify(action.payload));
      return {
        ...state,
        cart: { ...state.cart, shippingDetails: action.payload },
      };
    case 'SAVE_PAYMENT_METHOD':
      Cookies.set('paymentMethod', JSON.stringify(action.payload));
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    case 'CART_CLEAR':
      Cookies.remove('cartItems');
      Cookies.remove('paymentMethod');
      Cookies.remove('shippingDetails');
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    default:
      return state;
  }
}

export const StoreProvider = ({
  children,
  initialCart,
  userInfo,
}: {
  children: ReactNode;
  initialCart: Cart;
  userInfo: UserInfo;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    cart: initialCart,
    userInfo,
  });

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
