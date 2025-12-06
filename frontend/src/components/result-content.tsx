"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { storageUtils, type ScanRecord } from "@/lib/storage"
import { RiskBadge } from "./risk-badge"

interface ResultContentProps {
  scanId: string
}

export function ResultContent({ scanId }: ResultContentProps) {
  const [record, setRecord] = useState<ScanRecord | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const data = storageUtils.getHistoryById(scanId)
    setRecord(data || null)
    setIsLoading(false)
  }, [scanId])

  const handleSaveToHistory = () => {
    setIsSaved(true)
    // It's already in history from the initial scan, so just update UI
    setTimeout(() => setIsSaved(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading scan results...</div>
      </div>
    )
  }

  if (!record) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">Scan not found. Please start a new scan.</p>
        <Link href="/" className="text-primary hover:underline">
          Return to Scanner
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* URL Display */}
      <div className="bg-card border border-border rounded-lg p-6">
        <p className="text-muted-foreground text-sm mb-2">Scanned URL:</p>
        <p className="text-foreground break-all font-mono text-sm">{record.url}</p>
      </div>

      {/* Risk Result */}
      <div className="bg-card border border-border rounded-lg p-6">
        <p className="text-muted-foreground text-sm mb-4">Analysis Result:</p>
        <RiskBadge risk={record.risk} size="lg" />
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Link href="/" className="glow-button flex-1 py-3 rounded-lg text-center font-semibold">
          Scan Another Link
        </Link>
        <button
          onClick={handleSaveToHistory}
          className="flex-1 py-3 rounded-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {isSaved ? "✓ Saved to History" : "Save to History"}
        </button>
      </div>
    </div>
  )
}
