import { PrismaAdapter } from '@next-auth/prisma-adapter'
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from 'next-auth'
import GithubProvider, { type GithubProfile } from 'next-auth/providers/github'

import { env } from '@/env.mjs'
import { db } from '@/server/db'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      username?: string | undefined
    } & DefaultSession['user']
  }

  interface User {
    username?: string | undefined
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      username?: string | undefined
    } & DefaultSession['user']
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
        username: token.username,
        email: token.email,
        name: token.name,
        image: token.picture,
      },
    }),

    jwt: async ({ token, user }) => {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user.id
          token.username = user.username
          token.email = user.email
          token.name = user.name
          token.picture = user.image
        }
        return token
      }

      return {
        ...token,
        id: dbUser.id,
        username: dbUser.username,
        email: dbUser.email,
        name: dbUser.name,
        picture: dbUser.image,
      }
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)
