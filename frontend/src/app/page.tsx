import { GuardnzLogo } from "@/components/logo"
import { UrlInputForm } from "@/components/url-input-form"
import { FooterText } from "@/components/footer-text"

export default function Home() {
  return (
    <main className="flex-1 flex flex-col justify-between cyber-grid">
      {/* Header */}
      <header className="border-b border-border py-6 px-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <GuardnzLogo className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold neon-glow">GUARDNZ</h1>
            <p className="text-xs text-muted-foreground">Analyze suspicious links before you click.</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-3">
            Analyze suspicious links before you click.
          </h2>
          <p className="text-muted-foreground text-lg">
            GUARDNZ helps you stay safe from phishing, scams, and malware.
          </p>
        </div>

        <UrlInputForm />
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4">
        <FooterText />
      </footer>
    </main>
  )
}
