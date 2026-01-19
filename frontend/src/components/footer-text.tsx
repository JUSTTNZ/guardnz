import { Shield, Lock } from "lucide-react"

export function FooterText() {
  return (
    <div className="flex flex-col items-center gap-3 max-w-md mx-auto text-center">
      <div className="flex items-center gap-4 text-muted-foreground">
        <div className="flex items-center gap-1.5 text-xs">
          <Shield className="w-3.5 h-3.5 text-primary" />
          <span>Privacy First</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-border" />
        <div className="flex items-center gap-1.5 text-xs">
          <Lock className="w-3.5 h-3.5 text-primary" />
          <span>No Tracking</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground/70">
        GUARDNZ analyzes URLs for security threats. We don&apos;t store your data.
      </p>
    </div>
  )
}
