import Link from 'next/link'
import { LoginStatus } from '../LoginStatus'
// import ThemeToggle from "@/components/layout/ThemeToggle";
import { ui } from '@/lib/styles'
import ThemeToggle from './ThemeToggle'
import FontSizeSelector from './FontSizeSelector'

export default async function Navbar() {
    return (
        <nav className={ui.navbar}>
            <div className={ui.navbarContainer}>
                <Link href="/">TaskFlow</Link>
                <div className="flex items-center gap-4">
                    <FontSizeSelector />
                    <ThemeToggle />
                    <LoginStatus />
                </div>
            </div>
        </nav>
    )
}
