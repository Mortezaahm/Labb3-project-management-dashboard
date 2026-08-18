"use client"
import { useState } from "react";

import Sidebar from "@/components/layout/Sidebar";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileDrawer from "@/components/layout/MobileDrawer";

export default function PrivateLayout({children}: {children: React.ReactNode;}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <MobileHeader onOpen={()=> setOpen(true)} />
      <MobileDrawer
        open={open}
        onClose={() => setOpen(false)}
      />

      <div className="flex flex-1 min-w-0">
        <Sidebar />
        <main className="flex-1 min-w-0 p-6">
          {children}
        </main>
      </div>
    </>
  );
}
