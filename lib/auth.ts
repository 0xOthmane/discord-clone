import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./db";
import { compare } from "bcrypt";

export const options: NextAuthOptions = {
  providers: [
    // EmailProvider({
    //   server: "",
    //   from: "",
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@acme.me" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) return null;
        const passwordMatch = await compare(
          credentials.password,
          user.password
        );
        if (!passwordMatch) return null;
        return { id: user.id, username: user.username, email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    //   maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    //   verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    async session({ session, token }) {
      // session.user = user;
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) return { ...token, username: user.username };
      return token;
    },
  },
  // events: {
  //   async signIn({ user }) {
  //     console.log({ user }, "Signed in.");
  //   },
  // },
};

export const getUserAuth = async () => {
  const session = await getServerSession(options);
  return session?.user;
};

export const currentProfile = async () => {
  const user = await getUserAuth();
  if (!user) return null;
  const userDb = await db.user.findUnique({
    where: {
      username: user.username,
    },
  });
  if (!userDb) return null;
  const profile = await db.profile.findUnique({
    where: {
      userId: userDb?.id,
    },
  });
  return profile;
};
