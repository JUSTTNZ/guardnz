"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { urlUtils } from "@/lib/url-validation"
import { storageUtils, type ScanRecord } from "@/lib/storage"

export function UrlInputForm() {
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!urlUtils.isValidUrl(url)) {
      setError("Please enter a valid URL")
      return
    }

    setIsLoading(true)

    // Simulate a brief scan delay
    setTimeout(() => {
      const scanId = urlUtils.generateScanId()
      const normalizedUrl = urlUtils.normalizeUrl(url)
      const risk = urlUtils.getPlaceholderRisk(normalizedUrl)

      const record: ScanRecord = {
        id: scanId,
        url: normalizedUrl,
        risk,
        created_at: new Date().toISOString(),
      }

      storageUtils.addToHistory(record)
      router.push(`/result/${scanId}`)
    }, 300)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto px-4">
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
              setError("")
            }}
            placeholder="Paste a link here to scan..."
            className="w-full px-6 py-4 bg-card border-2 border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors text-base"
            disabled={isLoading}
            autoFocus
          />
        </div>

        {error && <p className="text-destructive text-sm flex items-center gap-2">⚠ {error}</p>}

        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="glow-button w-full py-3 rounded-lg text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Scanning..." : "Scan Link"}
        </button>
      </div>
    </form>
  )
}
