"use client"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react";
import {useState, useEffect} from "react"
export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => { setIsLoaded(true); }, []);

    if (!isLoaded) { return null; }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer"
        >
            {theme === "dark" ? <Sun className="text-white" /> : <Moon className="text-black" />}
        </button>
    ) }
