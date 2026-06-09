import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 font-bold">
        <Link href="/">
        TaskFlow
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/register">Join Now</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </nav>
  )
}
