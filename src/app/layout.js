import '../styles/globals.css';
import Footer from '../components/Footer';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Kurumi's Garden",
  description: 'A place to grow and share ideas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}