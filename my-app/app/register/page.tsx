'use client'
import Link from 'next/link'
import { useState } from 'react'
import { signUp } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button'
import registerSchema from '@/lib/registerSchema'
import { SiteImage } from '@/components/Image'
import Input from '@/components/ui/Input'

export default function Register() {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const router = useRouter()

    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setError('')
        setLoading(true)

        const validationResult = registerSchema.safeParse({
            name,
            email,
            password
        })

        if (!validationResult.success) {
            setError(validationResult.error.issues[0].message)
            setLoading(false)
            return
        }

        try {
            const res = await signUp.email({
                email: validationResult.data.email,
                name: validationResult.data.name,
                password: validationResult.data.password
            })
            if (res.error) {
                setError(
                    res.error.message ??
                        'Error could not create account, please try again'
                )
            } else {
                router.push('/dashboard')
            }
        } catch (error) {
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
                alt="register image with a notepad, pen and a coffee cup"
                variant="side"
                credit="Photo by Alphabag on Unsplash: https://unsplash.com/photos/a-cup-of-coffee-and-a-notepad-on-a-desk-t6sQLEUxqpk"
            />

            <div className="flex w-full md:w-1/2 items-center justify-center p-4 bg-gray-100 dark:bg-gray-800">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-center text-3xl font-bold mb-4 dark:text-black">
                        Create a new account{' '}
                    </h2>
                    <p className="text-center text-gray-600 mb-4">
                        Create a free account to start managing your projects.
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
                                placeholder="John@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                className="text-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Name
                            </label>
                            <Input
                                type="text"
                                id="name"
                                placeholder="John Doe"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                                className="text-sm"
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
                                required
                                minLength={8}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="text-sm"
                            />
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm">{error} </p>
                        )}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 bg-blue-900 rounded-md shadow hover:bg-blue-700 mt-4"
                        >
                            {loading ? 'Creating account...' : 'Sign up'}
                        </Button>
                        <p className="text-center mt-2 dark:text-black">
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-800">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
