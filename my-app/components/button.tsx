'use client'
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter()
  const handleLogout = async (): Promise<void> => {

    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Could not log out:', error)
    }
  }
  return (
    <button onClick={handleLogout}
     className="bg-black hover:bg-red-700 font-normal text-white py-0.5 px-3 rounded cursor-pointer">Logout</button>
  )
}
