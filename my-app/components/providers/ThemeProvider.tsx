// import { useEffect } from "react"

// type Props = {
//   children: React.ReactNode;
//   initialTheme?: "light" | "dark"
// }

// function ThemeInitializer({initialTheme} : {initialTheme?: "light" | "dark"}) {
//   const { setTheme } = useTheme()

//   useEffect(() => {
//     const theme = initialTheme ??
//       ((localStorage.getItem("theme") as "light" | "dark" | null) ?? "light")
//     setTheme(theme)
//   }, [initialTheme, setTheme])

//   return null
// }

"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes" // useTheme


export default function ThemeProvider({ children }: { children: React.ReactNode}) {
  return (
    <NextThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
      {/* <ThemeInitializer initialTheme={initialTheme} /> */}
      {children}
    </NextThemeProvider>
  )
}
