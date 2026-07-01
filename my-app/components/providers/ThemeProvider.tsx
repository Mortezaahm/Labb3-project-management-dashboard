"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes"

type Props = {
  children: React.ReactNode;
  initialTheme: "light" | "dark"
}

export default function ThemeProvider({ children, initialTheme }: Props) {
  return (
    <NextThemeProvider attribute="class" defaultTheme={initialTheme} enableSystem={false}>
      {children}
    </NextThemeProvider>
  )
}
