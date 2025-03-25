'use client';

import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import Cookies from 'js-cookie';

export interface CartItem {
  //   _id: string;
  name: string;
  //   quantity: number;
  price: number;
  //   image: string;
}

export interface ShippingAddress {
  fullName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  location?: object;
}

export interface Cart {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

interface StateType {
  cart: Cart;
}

export type ActionType = { type: 'CART_ADD_ITEM'; payload: CartItem };
//   | { type: 'CART_REMOVE_ITEM'; payload: string }
//   | { type: 'CART_RESET' }
//   | { type: 'CART_SET_PAYMENT'; payload: string }
//   | { type: 'CART_SET_SHIPPING'; payload: ShippingAddress };

const initialState: StateType = {
  cart: {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: '',
  },
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
      //   const existItem = state.cart.cartItems.find(
      //     (item) => item._id === action.payload._id
      //   );
      //   const cartItems = existItem
      //     ? state.cart.cartItems.map((item) =>
      //         item._id === existItem._id ? action.payload : item
      //       )
      //     : [...state.cart.cartItems, action.payload];

      Cookies.set(
        'cartItems',
        JSON.stringify([...state.cart.cartItems, action.payload])
      );
      //   Cookies.set('cartItems', JSON.stringify(cartItems));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [...state.cart.cartItems, action.payload],
        },
      };
      //   return { ...state, cart: { ...state.cart, cartItems } };
    }
    // case 'CART_REMOVE_ITEM': {
    //   const cartItems = state.cart.cartItems.filter(
    //     (item) => item._id !== action.payload
    //   );
    //   return { ...state, cart: { ...state.cart, cartItems } };
    // }
    // case 'CART_SET_PAYMENT':
    //   return {
    //     ...state,
    //     cart: { ...state.cart, paymentMethod: action.payload },
    //   };
    // case 'CART_SET_SHIPPING':
    //   return {
    //     ...state,
    //     cart: { ...state.cart, shippingAddress: action.payload },
    //   };
    // case 'CART_RESET':
    //   return initialState;
    default:
      return state;
  }
}

export const StoreProvider = ({
  children,
  initialCart,
}: {
  children: ReactNode;
  initialCart: Cart;
}) => {
  const [state, dispatch] = useReducer(reducer, { cart: initialCart });

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
