// SessionUser.jsx (client component)
"use client";
import { useSession } from "next-auth/react";

export default function SessionUser() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (!session) {
    return <p>User not logged in</p>;
  }

  return (
    <h1 className="text-2xl font-semibold">
      Welcome, {session.user.name || session.user.email} 👋
    </h1>
  );
}
