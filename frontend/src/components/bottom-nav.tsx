"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, History, Info, Settings } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/history", label: "History", icon: History },
    { href: "/about", label: "About", icon: Info },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden border-t border-border bg-card z-50">
      <div className="flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-3 px-2 text-xs font-medium transition-colors ${
                isActive(item.href)
                  ? "text-primary border-t-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-center">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}