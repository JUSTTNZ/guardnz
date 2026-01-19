import { ResultContent } from "@/components/result-content"

export default async function ResultPage({ params }: { params: Promise<{ scan_id: string }> }) {
  const { scan_id } = await params

  return (
    <main className="flex-1 flex flex-col cyber-grid relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center px-4 py-8 md:py-12 relative z-10">
        <div className="w-full max-w-2xl">
          <ResultContent scanId={scan_id} />
        </div>
      </div>
    </main>
  )
}
