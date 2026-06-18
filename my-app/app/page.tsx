// Our homepage
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { User } from "@/types/types";
// Primary:#2563EB Success:#22C55E Warning:#F59E0B Danger:#EF4444
import { Button } from "@/components/button";

export default async function Home() {
  const session = await getSession()
  const user = session?.user as User | undefined
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-gray-800 dark:text-white">
      <div className="flex-1">
        {user ?(
                  <>
                  <div className="container mx-auto px-4 py-32">
                 <h1 className="text-blue-900 font-bold mb-7 text-4xl">Glad to see you again {user.name}!</h1>
                 <p className="text-center">Ready to continue managing your projects? Visit <Link href="/dashboard" className="text-blue-800">Dashboard</Link></p>
                 </div>
                  </>) : (
                  <>
        <section className="container mx-auto px-4 py-32">
          <div className="text-center mx-auto max-w-4xl">
            <h1 className="text-blue-900 font-bold mb-7 text-6xl">Project Management, simplified</h1>
            <p className="text-gray-600 mb-10 text-large">Organize your work, track your progress, meet deadlines and always stay on top with TaskFlow.</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-row items-center justify-center gap-3">
            <Link href="/register">
            <Button className="bg-black">Join today</Button>
            </Link>
            <Link href="/login">
            <Button className="bg-black">Login</Button>
            </Link>
            </div>
            <p className=" text-gray-600">Your projects are waiting. Join us for free today.</p>
          </div>

        </section>
        </> )}
      </div>
    </div>
  );
}
