'use client'
import Link from 'next/link'
import { useState } from 'react'
import { signIn } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export default function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const router = useRouter()

    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setError('')
        setLoading(true)

        try {
            const res = await signIn.email({
                email,
                password
            })

            if (res.error) {
                setError(res.error.message ?? 'Login failed')
            } else {
                router.push('/dashboard')
            }
        } catch (error: unknown) {
            setError(
                error instanceof Error ? error.message : 'An error occurred'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen">
          <div className="hidden md:flex w-1/2 bg-cover bg-center items-center justify-center"
          style={{ backgroundImage: "url('/login2.jpg')"
           }}
           role="img"
           aria-label="login image with a notepad, pen and a coffee cup"
           >
            <span className="sr-only">
              Photo by Alphabag on Unsplash: https://unsplash.com/photos/a-cup-of-coffee-and-a-notepad-on-a-desk-t6sQLEUxqpk
            </span>
          </div>

            <div className="flex items-center justify-center p-8 bg-gray-100 ">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 ">
                <h2 className="text-center text-3xl font-bold mb-4">Login</h2>
                <p className="text-center text-gray-600 mb-4">
                    Login to your account to start managing your projects.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="John@example.com"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-2 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    required
                                    minLength={8}
                                    name="password"
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            {error && (
                                <p className="text-red-500 text-sm">{error} </p>
                            )}
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-blue-900 text-white font-bold rounded-md shadow  hover:bg-blue-700 transition-colors mt-4 cursor-pointer"
                                disabled={loading}
                            >
                                {loading ? 'logging in...' : 'Login'}{' '}
                            </button>
                            <p className="text-center mt-2">
                                Not signed up?{' '}
                                <Link
                                    href="/register"
                                    className="text-blue-800"
                                >
                                    Register
                                </Link>{' '}
                            </p>
                        </div>
                    </div>
                </form>
            </div>
         </div>
      </div>
    )
}
