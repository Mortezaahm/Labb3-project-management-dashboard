import { createAuthClient } from 'better-auth/react'

<<<<<<< HEAD
// changed for testing on mobile devices
const baseURL = typeof window !== "undefined"
? `${window.location.origin}/api/auth`
: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || ""
=======
const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || ''
>>>>>>> dev

// throws error if baseURL is not defined
if (!baseURL) {
    throw new Error(
        'Please define the NEXT_PUBLIC_BETTER_AUTH_URL environment variable inside .env.local'
    )
}

// creates auth client
export const authClient = createAuthClient({
    baseURL
})

// exports auth client methods
export const { signIn, signUp, signOut, useSession } = authClient
