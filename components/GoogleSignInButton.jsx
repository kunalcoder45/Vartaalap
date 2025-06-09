'use client';

import { signIn } from 'next-auth/react';

export default function GoogleSignInButton({ callbackUrl = '/dashboard' }) {
  return (
    <button
      onClick={() => signIn('google', { callbackUrl })}
      className="mt-4 w-full bg-white hover:bg-gray-100 font-semibold p-4 rounded-full border cursor-pointer border-gray-300 shadow-md transition-all duration-200 flex items-center justify-center"
    >
      <img src="/google.webp" alt="Google" width={20} height={20} />
      <span className="ml-2">Sign in with Google</span>
    </button>
  );
}
