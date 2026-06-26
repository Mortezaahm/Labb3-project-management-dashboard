import Link from "next/link";
import { LoginStatus } from "../loginStatus";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { ui } from "@/lib/styles"

export default async function Navbar() {

  return (
    <nav className={ui.navbar}>
      <div className={ui.navbarContainer}>
        <Link href="/">
        TaskFlow
        </Link>
        <LoginStatus />
        <ThemeToggle />
      </div>
    </nav>
  )
}
