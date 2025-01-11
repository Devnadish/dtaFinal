import NextAuth from "next-auth";
import { authOptions } from "@/lib/authConfig";

const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

export { handlers, auth, signIn, signOut };
