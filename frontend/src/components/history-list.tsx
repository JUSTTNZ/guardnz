"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { storageUtils, type ScanRecord } from "@/lib/storage"
import { RiskBadge } from "./risk-badge"

export function HistoryList() {
  const [history, setHistory] = useState<ScanRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const data = storageUtils.getHistory()
    setHistory(data)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div className="text-center py-12 text-muted-foreground">Loading history...</div>
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-12 bg-card border border-border rounded-lg p-8">
        <p className="text-muted-foreground mb-4">
          No scans yet. Start by checking a suspicious link on the home page.
        </p>
        <Link href="/" className="text-primary hover:underline font-semibold">
          Start Scanning
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {history.map((record) => (
        <Link
          key={record.id}
          href={`/result/${record.id}`}
          className="block bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-foreground break-all font-mono text-sm mb-2">{record.url}</p>
              <div className="flex items-center gap-2 mb-1">
                <RiskBadge risk={record.risk} size="sm" />
                <span className="text-xs text-muted-foreground font-mono">{record.score}/100</span>
              </div>
              <p className="text-xs text-muted-foreground">{new Date(record.created_at).toLocaleString()}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
