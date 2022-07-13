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
        console.log(credentials)
        const user = await prisma.user.findFirst({
          where : {
            email : credentials?.email
          },
          include : {
            password : true
          }
        })

        if(!user){
          throw new Error('User not found')
        }

        const isValid = user.password?.hash === credentials?.password ? true : false
        if(!isValid){
          throw new Error('Invalid password')
        }
        return user
      },
    })
  ],
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  callbacks: {
    async jwt({ token }) {
      console.log('ini',token)
      return token
    },
  },
}

export default NextAuth(authOptions)
