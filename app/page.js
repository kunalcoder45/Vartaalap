'use client';
import Link from 'next/link';
import routes from '../lib/routes';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome</h1>
      <nav>
        <Link href={routes.about}>About</Link>
        <Link href={routes.contact}>Contact</Link>
        <Link href={routes.login}>Login</Link>
        <Link href={routes.register}>Regester</Link>
      </nav>
    </div>
  );
}
