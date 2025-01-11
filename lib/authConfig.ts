import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/prisma";
import { Session, User, DefaultSession } from "next-auth";

// Extend the Session type to include `user.id`
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string; // Mark `id` as required
    } & DefaultSession["user"];
  }
}

export const authOptions = {
  adapter: PrismaAdapter(db), // Connect to Prisma
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // Google OAuth client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Google OAuth client secret
    }),
    // Add more providers here (e.g., GitHub, Email)
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      // Add user ID to the session
      if (session.user && user.id) {
        session.user.id = user.id; // Now TypeScript knows `user.id` is a string
      }
      return session;
    },
    async jwt({ token, user }: { token: any; user: User }) {
      // Add user ID to the token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!, // Encryption secret
  debug: process.env.NODE_ENV === "development", // Enable debug mode in development
};
