import Link from "next/link"

 const navItems = [
    {label: "Dashboard", href: "/dashboard"},
    {label: "Projects", href: "/projects"},
    {label: "Statistics", href: "/statistics"},
    {label: "Profile", href: "/profile"},
 ]

 export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-60 md:flex-col border-r">
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-3 py-2 rounded hover:bg-blue-200 transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      {/* TODO: Replace with real logout functionality */}
      <div className="p-4 border-t">
        <Link href="/" className="block w-full text-left px-3 py-2 rounded hover:bg-red-100 text-red-600 transition">
            Log out
        </Link>
      </div>
    </aside>
  );
}
