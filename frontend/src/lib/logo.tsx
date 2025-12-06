export function GuardnzLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Z - Neon Green */}
      <text
        x="50"
        y="55"
        fontSize="48"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
        fill="#00FF88"
        textAnchor="middle"
        filter="url(#neonGlow)"
      >
        Z
      </text>

      {/* N - Electric Blue, slightly offset */}
      <text
        x="50"
        y="70"
        fontSize="32"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
        fill="#00C8FF"
        textAnchor="middle"
        filter="url(#neonGlow)"
        opacity="0.8"
      >
        N
      </text>
    </svg>
  )
}
