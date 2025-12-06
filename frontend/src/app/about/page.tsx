import Link from "next/link"
import { GuardnzLogo } from "@/components/logo"
import { FooterText } from "@/components/footer-text"

export default function AboutPage() {
  return (
    <main className="flex-1 flex flex-col justify-between cyber-grid">
      {/* Header */}
      <header className="border-b border-border py-6 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <GuardnzLogo className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold neon-glow">GUARDNZ</h1>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col px-4 py-12">
        <div className="max-w-2xl mx-auto w-full space-y-8">
          <h2 className="text-3xl font-bold text-foreground">About GUARDNZ</h2>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">What is Phishing?</h3>
            <p className="text-foreground leading-relaxed">
              Phishing is a type of cyber attack where fraudsters impersonate legitimate organizations to trick people
              into revealing sensitive information like passwords, credit card numbers, or personal data. These attacks
              typically occur via emails, text messages, or malicious websites designed to look authentic.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">What Are Malicious Links?</h3>
            <p className="text-foreground leading-relaxed">
              Malicious links are URLs that lead to websites or downloads that can compromise your security. They may
              contain malware, ransomware, spyware, or trojans designed to steal data or damage your device. These links
              are often disguised as legitimate sites or shortened to hide their true destination.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">Why Check URLs Before Clicking?</h3>
            <p className="text-foreground leading-relaxed">
              By analyzing URLs before clicking, you can identify suspicious patterns and avoid falling victim to scams,
              data theft, or malware infections. A simple check can save you from financial loss, identity theft, and
              the time-consuming process of recovering your accounts and devices.
            </p>
          </section>

          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-secondary">What is GUARDNZ?</h3>
            <p className="text-foreground leading-relaxed">
              GUARDNZ helps you analyze URLs before you click, reducing the risk of phishing, scams, and malware. Our
              tool provides real-time security analysis to keep you safe online. Whether you are checking an email link,
              a shortened URL, or a suspicious message, GUARDNZ gives you the confidence to browse safely.
            </p>
          </div>

          <section className="space-y-4 bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground">Disclaimer</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This is an early-stage tool and no scanner is perfect. Always stay cautious and verify sources manually.
              While GUARDNZ provides valuable insights, it should be used as part of a comprehensive security strategy,
              not as a replacement for critical thinking and caution. When in doubt, contact the organization directly
              using contact information from their official website.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4">
        <FooterText />
      </footer>
    </main>
  )
}
