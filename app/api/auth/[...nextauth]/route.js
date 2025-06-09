// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
// import { MongoDBAdapter } from '@auth/mongodb-adapter';
// import clientPromise from '../../../../lib/mongodb'; // adjust if path is different

// export const authOptions = {
//     secret: process.env.NEXTAUTH_SECRET,
//     adapter: MongoDBAdapter(clientPromise),
//     providers: [
//         CredentialsProvider({
//             name: 'Credentials',
//             credentials: {
//                 email: { label: 'Email', type: 'text' },
//                 password: { label: 'Password', type: 'password' },
//             },
//             async authorize(credentials) {
//                 const res = await fetch('http://localhost:5000/api/auth/login', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(credentials),
//                 });

//                 const user = await res.json();
//                 if (res.ok && user) return user;
//                 return null;
//             },
//         }),
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         }),
//     ],
//     pages: {
//         signIn: '/auth/login',
//     },
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.user = user;
//                 token.id = user.id || user._id; // Make sure this line is added
//             }
//             return token;
//         },
//         async session({ session, user, token }) {
//             // Ensure session.user is defined
//             if (session && token) {
//                 session.user.id = token.id;
//                 // or set other properties if needed
//             }
//             return session;
//         },
//     },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
// app/api/auth/[...nextauth]/route.js


import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../../lib/mongodb';
import authOptions from '../../../../lib/authOptions';

export const routes = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: 'jwt', // Important: Use JWT strategy for credentials
        maxAge: 24 * 60 * 60, // 24 hours
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    const res = await fetch('http://localhost:5000/api/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(credentials),
                    });
                    
                    if (!res.ok) {
                        console.error('Login API failed:', res.status);
                        return null;
                    }
                    
                    const user = await res.json();
                    console.log('User from API:', user); // Debug log
                    
                    if (user && user.email) {
                        return {
                            id: user.id || user._id,
                            email: user.email,
                            name: user.name || user.email,
                            image: user.image || null,
                        };
                    }
                    return null;
                } catch (error) {
                    console.error('Authorization error:', error);
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            },
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                }
            }
        }),
    ],
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/login',
        error: '/auth/login',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            console.log('JWT Callback - Token:', token, 'User:', user, 'Account:', account);
            
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.image = user.image;
            }
            
            // Handle Google OAuth
            if (account?.provider === 'google') {
                token.provider = 'google';
            }
            
            return token;
        },
        async session({ session, token }) {
            console.log('Session Callback - Session:', session, 'Token:', token);
            
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.image = token.image;
                session.user.provider = token.provider;
            }
            
            return session;
        },
        async redirect({ url, baseUrl }) {
            console.log('Redirect callback - URL:', url, 'BaseURL:', baseUrl);
            
            // Always redirect to dashboard after successful login
            if (url.startsWith('/auth/login') || url === '/api/auth/signin') {
                return `${baseUrl}/dashboard`;
            }
            
            // For Google OAuth callback
            if (url.includes('/api/auth/callback/google')) {
                return `${baseUrl}/dashboard`;
            }
            
            // Default dashboard redirect for successful authentication
            if (url === baseUrl || url === `${baseUrl}/`) {
                return `${baseUrl}/dashboard`;
            }
            
            return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
        },
    },
    debug: process.env.NODE_ENV === 'development', // Enable debug in development
    trustHost: true, // Add this for localhost development
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };