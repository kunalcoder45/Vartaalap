// // src/lib/authOptions.js
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "./mongodb";

// const authOptions = {
//   secret: process.env.NEXTAUTH_SECRET,
//   adapter: MongoDBAdapter(clientPromise),
//   session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const res = await fetch("http://localhost:5000/api/auth/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(credentials),
//         });
//         const user = await res.json();
//         if (res.ok && user?.email) {
//           return { id: user.id || user._id, email: user.email, name: user.name, image: user.image };
//         }
//         return null;
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   pages: {
//     signIn: "/auth/login",
//     error: "/auth/login",
//     signOut: "/auth/login"
//   },
//   callbacks: {
//     async jwt({ token, user, account }) {
//       if (user) {
//         token = { ...token, ...user, provider: account?.provider };
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = {
//         id: token.id,
//         email: token.email,
//         name: token.name,
//         image: token.image,
//         provider: token.provider,
//       };
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       return `${baseUrl}/dashboard`;
//     },
//   },
//   debug: process.env.NODE_ENV === "development",
//   trustHost: true,
// };

// export default authOptions;
