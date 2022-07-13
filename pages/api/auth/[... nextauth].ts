import NextAuth from 'next-auth'
import { AppProviders} from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials'

const providers:AppProviders = []

providers.push(
  CredentialsProvider({
    name : 'credentials',
    credentials: {
      email : {label : 'email', type: 'string'},
      password : {label : 'password', type: 'password'},
    },
    async authorize(credentials){
      const user = {
        id : credentials?.email,
        email : credentials?.email,
        password : credentials?.password
      }
      return user
    },
  })
)

export default NextAuth({
  providers
})
