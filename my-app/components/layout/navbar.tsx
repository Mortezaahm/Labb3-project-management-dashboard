import Link from "next/link";
import { LoginStatus } from "../loginStatus";

export default async function Navbar() {

  return (
    <nav className="border-b border-gray-200">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 font-bold">
        <Link href="/">
        TaskFlow
        </Link>
        <LoginStatus />
      </div>
    </nav>
  )
}
