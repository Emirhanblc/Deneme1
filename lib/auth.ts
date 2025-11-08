import React from 'react';

import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Email/Password authentication
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          // In a real app, you'd create a new user here
          // For demo purposes, we'll return null
          return null;
        }

        // In a real app, you'd verify the password hash
        // For now, we'll use a simple check
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password || ''
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          isPremiumMember: user.isPremiumMember,
        };
      },
    }),
    // OAuth providers
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Add user info to token on sign in
      if (user) {
        token.id = user.id;
        token.isPremiumMember = (user as any).isPremiumMember || false;
      }

      // Fetch fresh user data from database
      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: {
            id: true,
            isPremiumMember: true,
            subscriptionTier: true,
            subscriptionEnds: true,
          },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.isPremiumMember = dbUser.isPremiumMember;
          token.subscriptionTier = dbUser.subscriptionTier;
          token.subscriptionEnds = dbUser.subscriptionEnds?.toISOString();
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Add user info to session
      if (token) {
        session.user.id = token.id as string;
        session.user.isPremiumMember = token.isPremiumMember as boolean;
        session.user.subscriptionTier = token.subscriptionTier as string;
        session.user.subscriptionEnds = token.subscriptionEnds as string;
      }

      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
};

// Extend NextAuth types
declare module 'next-auth' {
  interface User {
    id: string;
    isPremiumMember?: boolean;
    subscriptionTier?: string;
    subscriptionEnds?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      isPremiumMember: boolean;
      subscriptionTier?: string;
      subscriptionEnds?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    isPremiumMember: boolean;
    subscriptionTier?: string;
    subscriptionEnds?: string;
  }
}
