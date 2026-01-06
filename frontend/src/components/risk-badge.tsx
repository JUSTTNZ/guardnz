import { riskConfig, type RiskLevel } from "@/lib/risk-config"

interface RiskBadgeProps {
  risk_level: RiskLevel
  size?: "sm" | "md" | "lg"
}

export function RiskBadge({ risk_level, size = "md" }: RiskBadgeProps) {
  const config = riskConfig[risk_level] || riskConfig.safe

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
