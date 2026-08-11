import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 py-8 px-4 text-center text-sm text-black font-bold dark:bg-gray-800 dark:text-white dark:border-gray-500">
            <div className="container mx-auto flex gap-2 items-center justify-center md:flex-row flex-col">
                <p>&copy; 2026 TaskFlow. All rights reserved.</p>
                <Link
                    className="hover:text-blue-400 dark:hover:text-blue-400"
                    href="/"
                >
                    Terms
                </Link>
                <Link
                    className="hover:text-blue-400 dark:hover:text-blue-400"
                    href="/"
                >
                    Privacy
                </Link>
            </div>
        </footer>
    )
}
