import { cookies } from 'next/headers';

export async function getInitialCartFromCookies() {
  const cookieStore = await cookies();
  const cartItems = cookieStore.get('cartItems');
  const shippingAddress = cookieStore.get('shippingAddress');
  const paymentMethod = cookieStore.get('paymentMethod');

  return {
    cartItems: cartItems ? JSON.parse(cartItems.value) : [],
    shippingAddress: shippingAddress
      ? JSON.parse(shippingAddress.value)
      : { location: {} },
    paymentMethod: paymentMethod ? paymentMethod.value : '',
  };
}

export async function getUserInfoFromCookies() {
  const cookie = await cookies();
  const userInfo = cookie.get('userInfo');
  return userInfo ? JSON.parse(userInfo.value) : null;
}
