export type RiskLevel = "safe" | "warning" | "danger"

export interface RiskConfig {
  bg: string
  text: string
  label: string
  description: string
  action: string
  title: string
  advice: string
}

export const riskConfig: Record<RiskLevel, RiskConfig> = {
  safe: {
    bg: "bg-[#00ff88]",
    text: "text-[#0a0e27]",
    label: "SAFE",
    description: "This link appears safe",
    action: "You can safely visit this link.",
    title: "Safe link",
    advice: "You can open this link safely",
  },
  warning: {
    bg: "bg-[#ffaa00]",
    text: "text-[#0a0e27]",
    label: "WARNING",
    description: "This link shows suspicious patterns often used in scams.",
    action: "Proceed with caution. Verify the domain carefully.",
    title: "Warning",
    advice: "Avoid entering passwords or personal information",
  },
  danger: {
    bg: "bg-[#ff3333]",
    text: "text-[#fff]",
    label: "DANGER",
    description: "This link resembles known phishing or malware distribution URLs.",
    action: "Avoid clicking this link. Delete suspicious messages.",
    title: "Danger",
    advice: "Do not open this link. It may steal your information",
  },
}
