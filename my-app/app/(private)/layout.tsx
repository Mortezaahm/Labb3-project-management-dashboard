import Sidebar from "@/components/layout/Sidebar";

export default function PrivateLayout({children}: {children: React.ReactNode;}) {
  return (
    <div className="flex flex-1 min-w-0">
      <Sidebar />
      <main className="flex-1 min-w-0 p-6">
        {children}
      </main>
    </div>
  );
}
