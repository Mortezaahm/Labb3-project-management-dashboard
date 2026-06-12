import { createAuthClient } from "better-auth/react";

const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL

if (!baseURL) {
  throw new Error('Please define the NEXT_PUBLIC_BETTER_AUTH_URL environment variable inside .env.local')
}

export const authClient = createAuthClient({
  baseURL,
})

export const {signIn, signUp, signOut, useSession } = authClient
