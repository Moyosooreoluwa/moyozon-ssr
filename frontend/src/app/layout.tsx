import type { Metadata } from 'next';
import { Montserrat, Roboto } from 'next/font/google';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import NavigationBar from '@/components/NavigationBar';
import { getInitialCartFromCookies } from '@/utils/getCartFromCookies';
import { StoreProvider } from '@/store/Store';

const montserrat = Montserrat({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Moyozon - E-commerce Website',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialCart = await getInitialCartFromCookies();
  console.log(initialCart);

  return (
    <html lang="en" className={`${montserrat.className} ${roboto.className}`}>
      <body className={` bg-gray-100  min-h-screen`}>
        <StoreProvider initialCart={initialCart}>
          {' '}
          <NavigationBar />
          {children}
          <footer className="text-center">Moyo 2025</footer>
        </StoreProvider>
      </body>
    </html>
  );
}
