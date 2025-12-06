type RiskLevel = "safe" | "warning" | "danger"

interface RiskBadgeProps {
  risk: RiskLevel
  size?: "sm" | "md" | "lg"
}

export function RiskBadge({ risk, size = "md" }: RiskBadgeProps) {
  const riskConfig = {
    safe: {
      bg: "bg-[#00ff88]",
      text: "text-[#0a0e27]",
      label: "SAFE",
      description: "This link does not match common phishing patterns.",
      action: "You can safely visit this link.",
    },
    warning: {
      bg: "bg-[#ffaa00]",
      text: "text-[#0a0e27]",
      label: "WARNING",
      description: "This link shows suspicious patterns often used in scams.",
      action: "Proceed with caution. Verify the domain carefully.",
    },
    danger: {
      bg: "bg-[#ff3333]",
      text: "text-[#fff]",
      label: "DANGER",
      description: "This link resembles known phishing or malware distribution URLs.",
      action: "Avoid clicking this link. Delete suspicious messages.",
    },
  }

  const config = riskConfig[risk]

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <div className="space-y-4">
      <div className={`${config.bg} ${config.text} ${sizeClasses[size]} rounded-lg font-bold inline-block`}>
        {config.label}
      </div>
      <p className="text-foreground text-base">{config.description}</p>
      <p className="text-muted-foreground text-sm italic">{config.action}</p>
    </div>
  )
}
