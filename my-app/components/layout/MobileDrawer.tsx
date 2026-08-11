'use client'
import Link from 'next/link'
import { X } from 'lucide-react'
import { navItems } from '@/data/navigation'
import { LogoutButton } from '../Button'

interface MobileDrawerProps {
    open: boolean
    onClose: () => void
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
                    open ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
            />

            {/* Drawer */}
            <aside
                className={`fixed top-0 left-0 z-50 flex h-full w-64 flex-col bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300 ${
                    open ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
                    <h2 className="font-bold text-lg">TaskFlow</h2>

                    <button
                        onClick={onClose}
                        className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className="block rounded px-3 py-2 transition hover:bg-blue-100 dark:hover:bg-gray-700"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Logout */}
                <LogoutButton />
            </aside>
        </>
    )
}
