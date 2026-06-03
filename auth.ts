import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { prisma } from './lib/db';

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Пароль',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || typeof credentials.email !== 'string') {
          return null;
        }
        if (!credentials?.password || typeof credentials.password !== 'string') {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        const valid = await bcrypt.compare(credentials.password, user.password);

        if (!valid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt({ token, user }) {
      // user определён только при входе; на последующих запросах он undefined.
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      // name/email/image Auth.js кладёт в сессию сам, вручную нужен только id.
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
