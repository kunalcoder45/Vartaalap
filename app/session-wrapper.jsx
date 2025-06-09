// app/session-wrapper.jsx
'use client';

import { SessionProvider } from 'next-auth/react';

export default function SessionWrapper({ children }) {
  return (
    <SessionProvider refetchInterval={5 * 60}> {/* Refetch every 5 minutes */}
      {children}
    </SessionProvider>
  );
}