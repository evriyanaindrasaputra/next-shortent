import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '~/lib/prisma'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'string' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email
          },
          include: {
            password: true
          }
        })

        if (!user) {
          throw new Error('User not found')
        }

        const isValid = user.password?.hash === credentials?.password ? true : false
        if (!isValid) {
          throw new Error('Invalid password')
        }
        return {
          id: user.id,
          email: user.email,
        }
      },
    })
  ],
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 1
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id
      }
      return session
    }
  },
}

export default NextAuth(authOptions)
