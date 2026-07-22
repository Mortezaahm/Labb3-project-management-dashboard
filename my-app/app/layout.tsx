import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ThemeProvider from "@/components/providers/ThemeProvider";
// import FontSizeProvider from "@/components/providers/FontSizeProvider";
import { getUserSettings } from "@/lib/user-settings";
import SettingsProvider from "@/components/providers/SettingsProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "Project Management Dashboard",
};

export default async function RootLayout({children}:
  Readonly<{children: React.ReactNode;}>) {

  const settings = await getUserSettings();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SettingsProvider serverSettings={settings} >
            <Navbar />
            <main className="flex-1 dark:bg-gray-800 dark:text-gray-300">
            {children}
            </main>
            <Footer />
          </SettingsProvider>
       </ThemeProvider>
       </body>

    </html>
  );
}
