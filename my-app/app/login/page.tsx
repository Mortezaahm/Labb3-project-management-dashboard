'use client'
import Link from 'next/link'
import { useState } from 'react'
import { signIn } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button'
import { SiteImage } from '@/components/Image'
import Input from '@/components/ui/Input'


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

            if (!res.error) {
                router.push('/dashboard')
                router.refresh()
            } else {
                setError(res.error.message ?? 'Login failed')
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
            <SiteImage
                src="/login2.jpg"
                alt="login image with a notepad, pen and a coffee cup"
                variant="side"
                credit="Photo by Alphabag on Unsplash: https://unsplash.com/photos/a-cup-of-coffee-and-a-notepad-on-a-desk-t6sQLEUxqpk"
            />

            <div className="flex w-full md:w-1/2 items-center justify-center p-8 bg-gray-100 dark:bg-gray-800">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-center text-3xl font-bold mb-4 dark:text-black">
                        Login
                    </h1>
                    <p className="text-center text-gray-600 mb-4">
                        Login to your account to start managing your projects.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Email address
                            </label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                placeholder="John@example.com"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="text-sm dark:placeholder:text-gray-300"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                required
                                minLength={8}
                                name="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="text-sm dark:placeholder:text-gray-300"
                            />
                        </div>
                        {error && (
                            <p role="alert" className="text-red-500 text-sm">
                                {error}{' '}
                            </p>
                        )}
                        <Button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-900 hover:bg-blue-700 mt-4"
                            disabled={loading}
                        >
                            {loading ? 'logging in...' : 'Login'}{' '}
                        </Button>
                        <p className="text-center mt-2 dark:text-black">
                            Not signed up?{' '}
                            <Link href="/register" className="text-blue-800">
                                Register
                            </Link>{' '}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
