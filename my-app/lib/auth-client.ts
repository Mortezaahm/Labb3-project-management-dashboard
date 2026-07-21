import { createAuthClient } from "better-auth/react";

// changed for testing on mobile devices
const baseURL = typeof window !== "undefined"
? `${window.location.origin}/api/auth`
: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || ""

if (!baseURL) {
  throw new Error('Please define the NEXT_PUBLIC_BETTER_AUTH_URL environment variable inside .env.local')
}

export const authClient = createAuthClient({
  baseURL,
})

export const {signIn, signUp, signOut, useSession } = authClient
