"use client"
import { useTheme } from "next-themes"
import {useState, useEffect} from "react"
export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    if (!mounted) { return null; }

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="bg-black font-normal text-white py-0.5 px-3 rounded cursor-pointer"
        >
            {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </button>
    ) }
