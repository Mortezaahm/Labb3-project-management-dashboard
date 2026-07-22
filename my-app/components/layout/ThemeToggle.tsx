'use client'
import { Sun, Moon } from 'lucide-react'
import { useSettings } from '../providers/SettingsProvider'

export default function ThemeToggle() {
    const { theme, setTheme } = useSettings()
    const isDark = theme === 'dark'

    return (
        <button
            type="button"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="p-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
        >
            {isDark ? (
                <Sun className="text-white" size={20} />
            ) : (
                <Moon className="text-black" size={20} />
            )}
        </button>
    )
}
