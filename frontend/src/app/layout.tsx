import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { BottomNav } from "@/components/bottom-nav"
import { TopNav } from "@/components/top-nav"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GUARDNZ - Malicious URL Scanner",
  description: "Analyze suspicious links before you click. Stay safe from phishing and malware.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#0a0e27" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col pb-20 md:pb-0">
        <TopNav />
        {children}
        <BottomNav />
        <Analytics />
      </body>
    </html>
  )
}
