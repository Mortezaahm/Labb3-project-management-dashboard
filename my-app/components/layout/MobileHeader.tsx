"use client";

import { Menu } from "lucide-react";

interface MobileHeaderProps {
  onOpen: () => void;
}

export default function MobileHeader({
  onOpen,
}: MobileHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b p-4 md:hidden dark:border-gray-700">
      <h1 className="font-bold">Mobile menu</h1>

      <button
        onClick={onOpen}
        className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Menu size={24} />
      </button>
    </header>
  );
}
