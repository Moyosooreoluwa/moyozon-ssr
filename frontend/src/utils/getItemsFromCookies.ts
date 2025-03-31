import { cookies } from 'next/headers';

export async function getInitialCartFromCookies() {
  const cookieStore = await cookies();
  const cartItems = cookieStore.get('cartItems');
  const shippingDetails = cookieStore.get('shippingDetails');
  const paymentMethod = cookieStore.get('paymentMethod');

  return {
    cartItems: cartItems ? JSON.parse(cartItems.value) : [],
    shippingDetails: shippingDetails ? JSON.parse(shippingDetails.value) : {},
    paymentMethod: paymentMethod ? paymentMethod.value : '',
  };
}

export async function getUserInfoFromCookies() {
  const cookie = await cookies();
  const userInfo = cookie.get('userInfo');
  return userInfo ? JSON.parse(userInfo.value) : null;
}
