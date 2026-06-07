import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const demoHash = await bcrypt.hash("RayCake2026!", 10);
        const valid = parsed.data.email === "owner@raycake.test" && (await bcrypt.compare(parsed.data.password, demoHash));
        if (!valid) return null;

        return { id: "usr_owner", name: "Ray Cake Owner", email: parsed.data.email, role: "Owner" };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = "Owner";
      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.role = String(token.role || "Cashier");
      return session;
    }
  },
  pages: {
    signIn: "/login"
  }
});
