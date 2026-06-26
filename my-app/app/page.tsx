// Our homepage
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { User } from "@/types/types";
import { Button } from "@/components/button";
import { SiteImage } from "@/components/image";
import { CardFeature } from "@/components/card";
import { FAQSection } from "@/components/question";
import { BookOpen, Zap, CheckCircle } from "lucide-react";

export default async function Home() {
  const session = await getSession()
  const user = session?.user
  return (
      <>
        {user ?(
                  <section className="container mx-auto px-4 py-32">
                 <h1 className="text-blue-900 text-center font-bold mb-7 text-4xl">Glad to see you again {user.name}!</h1>
                 <p className="text-center">Ready to continue managing your projects? Visit <Link href="/dashboard" className="text-blue-800">Dashboard</Link></p>
                 </section>
                  ) : (
                  <>
        <section className="container mx-auto px-4 py-32">
          <div className="text-center mx-auto max-w-4xl">
            <h1 className="text-blue-900 font-bold mb-7 text-6xl">Project Management, simplified</h1>
            <p className="text-gray-600 mb-10 text-lg dark:text-gray-300">Organize your work, track your progress, meet deadlines and always stay on top with TaskFlow.</p>
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
            <p className="text-gray-600 dark:text-white">Your projects are waiting. Join us for free today.</p>
          </div>
          <div className="mt-10 max-w-4xl mx-auto px-4">
            <SiteImage src="/dashboard-test-2.jpg" alt="Illustration 1" variant="center" />
          </div>
          </section>

          <section className="container mx-auto px-4 pt-16">
            <div className="text-center mx-auto max-w-4xl">
              <h2 className="font-bold text-3xl mb-2 text-blue-900">Everything you need to manage your projects</h2>
              <p className="text-gray-600 mb-10 text-lg dark:text-gray-300">Stop the endless juggling and focus on what matters most. With TaskFlow, you can easily bring your tasks and deadlines all togheter in one place.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto px-4">
              <CardFeature title="Projects" description="Creating projects with TaskFlow is simple and quick." icon={BookOpen} />
              <CardFeature title="Edit" description="When plans change, TaskFlow has you covered. Easily update your task." icon={Zap} />
              <CardFeature title="Deadlines" description="Done with a task? TaskFlow let's you mark it as done to help you keep track of your progress." icon={CheckCircle} />
            </div>
            </section>

            <FAQSection />
            <section className="container mx-auto px-4 pt-8 pb-24 max-w-4xl">
            <div className="flex flex-col items-center justify-center gap-4 bg-gray-600 text-white rounded-xl shadow-xl py-10">
              <h3 className=" text-3xl mb-2 text-white">Start managing your projects today!</h3>
              <Link href="/register">
              <Button className="bg-black">Join Now</Button>
            </Link>
            </div>
          </section>
        </> )}
        </>
  );
}
