import { GuardnzLogo } from "@/components/logo"
import { FooterText } from "@/components/footer-text"
import { ResultContent } from "@/components/result-content"

export default async function ResultPage({ params }: { params: Promise<{ scan_id: string }> }) {
  const { scan_id } = await params

  return (
    <main className="flex-1 flex flex-col justify-between cyber-grid">
      {/* Header */}
      <header className="border-b border-border py-6 px-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <GuardnzLogo className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold neon-glow">GUARDNZ</h1>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <ResultContent scanId={scan_id} />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4">
        <FooterText />
      </footer>
    </main>
  )
}
