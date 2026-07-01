"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={ isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() =>
        setTheme(isDark ? "light" : "dark")
      }
      className="p-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
    >
      {isDark ? (
        <Sun className="text-white" size={20}/>
      ) : (
        <Moon className="text-black" size={20}/>
      )}
    </button>
  );
}
