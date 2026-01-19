import { GuardnzLogo } from "@/components/logo"
import { UrlInputForm } from "@/components/url-input-form"
import { FooterText } from "@/components/footer-text"
import { Shield, Zap, Lock, Eye } from "lucide-react"

export default function Home() {
  return (
    <main className="flex-1 flex flex-col justify-between cyber-grid relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-16 relative z-10">
        <div className="w-full max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-10 md:mb-14 animate-fade-in-up">
            {/* Logo and brand */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <GuardnzLogo className="w-14 h-14 md:w-16 md:h-16" />
                <div className="absolute inset-0 blur-xl bg-primary/30 -z-10" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold neon-glow tracking-tight">
                GUARDNZ
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-muted-foreground mb-3">
              AI-Powered Link Security Scanner
            </p>

            {/* Main heading */}
            <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight mb-4">
              Protect yourself from phishing,
              <br />
              <span className="text-primary">scams, and malware.</span>
            </h2>

            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
              Paste any suspicious link below and let our advanced security engine
              analyze it for threats before you click.
            </p>
          </div>

          {/* Input Form */}
          <div className="mb-12 md:mb-16">
            <UrlInputForm />
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 stagger-children">
            <TrustCard
              icon={<Shield className="w-5 h-5" />}
              title="Deep Analysis"
              description="Multi-layer threat detection"
            />
            <TrustCard
              icon={<Zap className="w-5 h-5" />}
              title="Instant Results"
              description="Real-time URL scanning"
            />
            <TrustCard
              icon={<Lock className="w-5 h-5" />}
              title="Privacy First"
              description="No data stored on servers"
            />
            <TrustCard
              icon={<Eye className="w-5 h-5" />}
              title="Visual Evidence"
              description="Screenshot verification"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 px-4 relative z-10 bg-background/50 backdrop-blur-sm">
        <FooterText />
      </footer>
    </main>
  )
}

function TrustCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="glass-card p-4 md:p-5 text-center group cursor-default">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-3 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}
