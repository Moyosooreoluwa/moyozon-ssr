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
      image: '/images/airpodspro-2.jpg', //679px x 829px
      price: 249.99,
      stockCount: 0,
      brand: 'Apple',
      rating: 2.5,
      reviewCount: 13,
      description: 'Noise cancelling bluetooth earphones.',
    },
    {
      // _id: '2',
      name: 'JBL Tune 660C Headphones',
      slug: 'jbl-tune-660c',
      category: 'Headphones and Earphones',
      image: '/images/jbl-headphones-2.jpg',
      price: 69.99,
      stockCount: 10,
      brand: 'JBL',
      rating: 4,
      reviewCount: 1,
      description:
        'Wireless over-ear bluetooth earphones with active noise cancellation.',
    },
    {
      // _id: '3',
      name: 'Samsung Galaxy S25 Ultra',
      slug: 'samsung-s25-ultra',
      category: 'Mobile Phones',
      image: '/images/samsung-s25.jpg',
      price: 1149.99,
      stockCount: 10,
      brand: 'Samsung',
      rating: 4.9,
      reviewCount: 8,
      description:
        'Ultra Modern with a built-in S Pen, Nightography camera and a battery that goes way beyond all day.',
    },
    {
      // _id: '4',
      name: 'Samsung Galaxy Z Fold6',
      slug: 'samsung-z-fold6',
      category: 'Mobile Phones',
      image: '/images/samsung-zfold6.jpg',
      price: 1699.99,
      stockCount: 10,
      brand: 'Samsung',
      rating: 4.9,
      reviewCount: 17,
      description:
        'Put PC-like power in your pocket, Galaxy Z Fold6. More powerful than ever with its super-slim, productive screen. Now super-charged with Galaxy AI on foldables.',
    },
    {
      // _id: '5',
      name: 'Apple iPhone 16 pro max (1TB)',
      slug: 'apple-iphone-16pro-max-1tb',
      category: 'Mobile Phones',
      image: '/images/iphone-16pro.jpg',
      price: 1149,
      stockCount: 10,
      brand: 'Apple',
      rating: 4.8,
      reviewCount: 10,
      description: 'The ultimate iPhone.',
    },
    {
      // _id: '6',
      name: 'Apple iPhone 16e (1TB)',
      slug: 'apple-iphone-16e-1tb',
      category: 'Mobile Phones',
      image: '/images/iphone-16e.jpg',
      price: 999,
      stockCount: 10,
      brand: 'Apple',
      rating: 4.8,
      reviewCount: 4,
      description: 'Latest iPhone. Greatest price.',
    },
  ],
};

export default data;
