import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'
import Cognito from 'next-auth/providers/cognito'

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Cognito]
})
