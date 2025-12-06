"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GuardnzLogo } from "./logo"

export function TopNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/history", label: "History" },
    { href: "/about", label: "About" },
    { href: "/settings", label: "Settings" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="hidden md:flex items-center justify-between bg-background border-b border-border px-6 py-4">
      <Link href="/" className="flex items-center gap-2 mr-8">
        <GuardnzLogo className="w-6 h-6 text-primary" />
        <span className="text-lg font-bold neon-glow">GUARDNZ</span>
      </Link>

      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium transition-colors ${
              isActive(item.href) ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
