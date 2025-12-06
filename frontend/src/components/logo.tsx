"use client"

export function GuardnzLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Z on top - neon green */}
      <text x="12" y="24" fontSize="20" fontWeight="bold" fill="currentColor" className="text-primary">
        Z
      </text>
      {/* N below - electric blue offset */}
      <text x="12" y="48" fontSize="20" fontWeight="bold" fill="currentColor" className="text-secondary">
        N
      </text>
    </svg>
  )
}
