import { createAuthClient } from 'better-auth/react'

const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || ''

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
