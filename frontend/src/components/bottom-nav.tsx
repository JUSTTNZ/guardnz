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
    <nav className="fixed bottom-0 left-0 right-0 md:hidden border-t border-border/50 bg-background/80 backdrop-blur-xl z-50 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-2 px-4 rounded-xl text-xs font-medium transition-all ${
                active
                  ? "text-primary"
                  : "text-muted-foreground active:text-foreground"
              }`}
            >
              {/* Active indicator */}
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
              )}
              <Icon className={`w-5 h-5 mb-1 ${active ? "drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]" : ""}`} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
