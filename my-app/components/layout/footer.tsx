export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 px-4 text-center text-sm text-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-500">
      <div className="container mx-auto flex gap-4 items-center justify-center md:flex-row flex-col">
        <span className="text-blue-500 hover:text-blue-900">&copy; 2026 TaskFlow</span>
        <a className="text-blue-500 hover:text-blue-900" href="#">About</a>
        <a className="text-blue-500 hover:text-blue-900" href="#">Contact</a>
        <a className="text-blue-500 hover:text-blue-900" href="#">Terms</a>
        <a className="text-blue-500 hover:text-blue-900" href="#">Privacy</a>
        <span className="text-blue-500 hover:text-blue-900">All rights reserved.</span>
      </div>
    </footer>
  )
}
