import Link from 'next/link'
import { ui } from '@/lib/styles'

export default function Footer() {
    return (
        <footer className={ui.footer}>
            <div className={ui.footerContainer}>
                <p>&copy; 2026 TaskFlow. All rights reserved.</p>
                <Link className={ui.footerLink} href="/">
                    Terms
                </Link>
                <Link className={ui.footerLink} href="/">
                    Privacy
                </Link>
            </div>
        </footer>
    )
}
