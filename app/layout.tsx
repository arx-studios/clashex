import type { Metadata } from "next"
import { Russo_One, Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-russo-one",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Clashex — AI-Powered Clash of Clans Tracker",
  description:
    "Know your base. Max smarter. Clashex tracks your Clash of Clans progress and uses AI to advise your next upgrade.",
  metadataBase: new URL("https://clashex.arxstudios.pro"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn("dark", russoOne.variable, inter.variable)}
    >
      <body className="antialiased font-sans bg-black text-white">
        {children}
      </body>
    </html>
  )
}
