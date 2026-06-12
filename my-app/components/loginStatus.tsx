'use client'

import Link from "next/link";
import { LogoutButton } from "./button";
import { useSession } from "@/lib/auth-client";

export function LoginStatus() {
  const { data: session } = useSession()

  return (
    <>
    {session ?(
             <LogoutButton />
              ) : (
            <div className="flex items-center gap-4">
              <Link href="/register">Join Now</Link>
              <Link href="/login">Login</Link>
            </div>
            )}
     </>
  )
}
