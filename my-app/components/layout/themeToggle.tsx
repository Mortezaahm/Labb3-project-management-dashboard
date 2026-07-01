"use client"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react";
import {useState, useEffect} from "react"
export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => {
            setMounted(true)
        });
        return () => cancelAnimationFrame(id);
    },[]);

    if (!mounted) { return null; }

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="cursor-pointer"
        >
            {resolvedTheme === "dark" ? <Sun className="text-white" /> : <Moon className="text-black" />}
        </button>
    ) }
