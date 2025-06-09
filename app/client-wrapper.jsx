// app/client-wrapper.jsx
'use client';

import { useEffect } from 'react';

export default function ClientWrapper({ children }) {
  useEffect(() => {
    // Client-side initialization code if needed
    console.log('Client wrapper initialized');
  }, []);

  return <>{children}</>;
}