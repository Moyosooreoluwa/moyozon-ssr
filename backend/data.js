import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Moyo',
      email: 'moyo@admin.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'john@123.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'Apple Airpods Pro 2nd Generaton',
      slug: 'apple-airpods-pro-2ndgen',
      category: 'Headphones and Earphones',
      image: '/images/airpodspro(2).jpg', //679px x 829px
      price: 249,
      stockCount: 0,
      brand: 'Apple',
      rating: 2.5,
      reviewCount: 100,
      description: 'Noise cancelling bluetooth earphones.',
    },
    {
      // _id: '2',
      name: 'JBL Tune 660C Headphones',
      slug: 'jbl-tune-660c',
      category: 'Headphones and Earphones',
      image: '/images/jblheadphones(2).jpg',
      price: 69.99,
      stockCount: 10,
      brand: 'JBL',
      rating: 4,
      reviewCount: 10,
      description:
        'Wireless over-ear bluetooth earphones with active noise cancellation.',
    },
    {
      // _id: '3',
      name: 'Samsung Galaxy S22 Ultra',
      slug: 'samsung-s22-ultra',
      category: 'Mobile Phones',
      image: '/images/samsung-s22(2).jpg',
      price: 1149.99,
      stockCount: 10,
      brand: 'Samsung',
      rating: 4.9,
      reviewCount: 10,
      description:
        'Ultra Modern with a built-in S Pen, Nightography camera and a battery that goes way beyond all day.',
    },
    {
      // _id: '4',
      name: 'Apple iPhone 13 pro max (256GB)',
      slug: 'apple-iphone-13pro-max-256',
      category: 'Mobile Phones',
      image: '/images/iphone13(2).jpg',
      price: 1149,
      stockCount: 10,
      brand: 'Apple',
      rating: 4.8,
      reviewCount: 10,
      description: 'As amazing as ever.',
    },
  ],
};

export default data;
