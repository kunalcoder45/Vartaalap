import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/authOptions.js";
import { redirect } from "next/navigation";
import LogoutButton from "../../components/LogoutButton";  // Adjust path if needed

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">
        Welcome, {session.user.name || session.user.email} 👋
      </h1>
      <p className="mt-2 text-gray-600">
        You are successfully logged in to the Dashboard.
      </p>
      <LogoutButton />
    </div>
  );
}
