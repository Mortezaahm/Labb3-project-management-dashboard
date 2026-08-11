import Link from "next/link"
import { navItems } from "@/data/navigation"
import { LogoutButton } from "@/components/button"

 export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-60 md:flex-col border-r">
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-3 py-2 rounded-lg hover:bg-blue-200 transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <LogoutButton  className="w-full text-left bg-transparent px-3 py-2 text-red-600 shadow-none hover:bg-red-700" />
      </div>
    </aside>
  );
}
