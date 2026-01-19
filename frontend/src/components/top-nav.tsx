"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, History, Info, Settings } from "lucide-react"
import { GuardnzLogo } from "./logo"

export function TopNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/history", label: "History", icon: History },
    { href: "/about", label: "About", icon: Info },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="hidden md:flex items-center justify-between bg-background/80 backdrop-blur-xl border-b border-border/50 px-6 py-3 sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="relative">
          <GuardnzLogo className="w-7 h-7" />
          <div className="absolute inset-0 blur-lg bg-primary/30 -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <span className="text-lg font-bold neon-glow tracking-tight">GUARDNZ</span>
      </Link>

      <div className="flex items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
