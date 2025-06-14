// app/layout.js
import './globals.css';
import { Varta } from 'next/font/google';
import SessionWrapper from './session-wrapper';

const varta = Varta({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-varta',
});

export const metadata = {
  title: 'Vartaalap',
  description: 'Description...',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={varta.variable}>
      <body>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}