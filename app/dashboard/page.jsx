// // DashboardPage.jsx (server component)
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../lib/authOptions.js";
// import { redirect } from "next/navigation";
// import SessionUser from "./SessionUser"; // Client component for session user display
// import LogoutButton from "../../components/LogoutButton";

// export default async function DashboardPage() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     redirect("/auth/login");
//   }

//   return (
//     <div className="p-6">
//       <SessionUser />
//       <p className="mt-2 text-gray-600">
//         You are successfully logged in to the Dashboard.
//       </p>
//       <LogoutButton />
//     </div>
//   );
// }
// app/dashboard/page.jsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"; // Correct import path
import { redirect } from "next/navigation";
import SessionUser from "./SessionUser";
import LogoutButton from "../../components/LogoutButton";

export default async function DashboardPage() {
    try {
        const session = await getServerSession(authOptions);
        
        console.log('Dashboard session:', session); // Debug log
        
        if (!session || !session.user) {
            console.log('No session found, redirecting to login');
            redirect("/auth/login");
        }
        
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <SessionUser />
                <p className="mt-2 text-gray-600">
                    You are successfully logged in to the Dashboard.
                </p>
                <LogoutButton />
            </div>
        );
    } catch (error) {
        console.error('Dashboard error:', error);
        redirect("/auth/login");
    }
}