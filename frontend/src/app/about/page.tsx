import { Info, Shield, AlertTriangle, Link2, CheckCircle, AlertCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="flex-1 flex flex-col cyber-grid relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />

      {/* Main content */}
      <div className="flex-1 flex flex-col px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          {/* Page header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">About GUARDNZ</h1>
              <p className="text-sm text-muted-foreground">Learn about online security threats</p>
            </div>
          </div>

          {/* What is Phishing */}
          <section className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-destructive" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">What is Phishing?</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Phishing is a type of cyber attack where fraudsters impersonate legitimate organizations to trick people
              into revealing sensitive information like passwords, credit card numbers, or personal data. These attacks
              typically occur via emails, text messages, or malicious websites designed to look authentic.
            </p>
          </section>

          {/* Malicious Links */}
          <section className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                <Link2 className="w-4 h-4 text-warning" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">What Are Malicious Links?</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Malicious links are URLs that lead to websites or downloads that can compromise your security. They may
              contain malware, ransomware, spyware, or trojans designed to steal data or damage your device. These links
              are often disguised as legitimate sites or shortened to hide their true destination.
            </p>
          </section>

          {/* Why Check URLs */}
          <section className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Why Check URLs Before Clicking?</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              By analyzing URLs before clicking, you can identify suspicious patterns and avoid falling victim to scams,
              data theft, or malware infections. A simple check can save you from financial loss, identity theft, and
              the time-consuming process of recovering your accounts and devices.
            </p>
          </section>

          {/* What is GUARDNZ */}
          <section className="glass-card p-6 space-y-4 border-primary/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">What is GUARDNZ?</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              GUARDNZ helps you analyze URLs before you click, reducing the risk of phishing, scams, and malware. Our
              tool provides real-time security analysis to keep you safe online. Whether you are checking an email link,
              a shortened URL, or a suspicious message, GUARDNZ gives you the confidence to browse safely.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
                <CheckCircle className="w-3 h-3 text-primary" />
                Real-time analysis
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
                <CheckCircle className="w-3 h-3 text-primary" />
                Deep scan evidence
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
                <CheckCircle className="w-3 h-3 text-primary" />
                Privacy focused
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="glass-card p-6 space-y-4 border-muted">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-muted-foreground" />
              </div>
              <h2 className="text-base font-semibold text-foreground">Disclaimer</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This is an early-stage tool and no scanner is perfect. Always stay cautious and verify sources manually.
              While GUARDNZ provides valuable insights, it should be used as part of a comprehensive security strategy,
              not as a replacement for critical thinking and caution. When in doubt, contact the organization directly
              using contact information from their official website.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
