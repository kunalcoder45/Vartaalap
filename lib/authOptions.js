import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // 'user' contains data from Google: { name, email, image }

      // Call your API or DB logic here to save or update user in your DB
      try {
        const res = await fetch('http://localhost:5000/api/auth/google-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            image: user.image,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          // User saved/updated successfully
          return true;
        } else {
          // Something wrong with saving user
          console.error('DB save failed:', data.message || data);
          return false;
        }
      } catch (error) {
        console.error('SignIn callback error:', error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) token.user = user; // store user info in JWT token
      return token;
    },

    async session({ session, token }) {
      session.user = token.user; // send user data in session
      return session;
    },
  },
};
export default NextAuth(authOptions);
