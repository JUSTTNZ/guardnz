"use client"

import { useState } from "react"
import Link from "next/link"
import { GuardnzLogo } from "@/components/logo"
import { FooterText } from "@/components/footer-text"
import { HistoryList } from "@/components/history-list"
import { ClearHistoryModal } from "@/components/clear-history-modal"
import { storageUtils } from "@/lib/storage"

export default function HistoryPage() {
  const [showClearModal, setShowClearModal] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleClearHistory = () => {
    storageUtils.clearHistory()
    setRefreshKey((k) => k + 1)
  }

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
        <div className="max-w-2xl mx-auto w-full flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Scan History</h2>
            <button
              onClick={() => setShowClearModal(true)}
              className="px-4 py-2 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition-colors text-sm font-semibold"
            >
              Clear History
            </button>
          </div>

          <HistoryList key={refreshKey} />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4">
        <FooterText />
      </footer>

      {/* Modal */}
      <ClearHistoryModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={handleClearHistory}
      />
    </main>
  )
}
