"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { urlUtils } from "@/lib/url-validation"
import { storageUtils, type ScanRecord } from "@/lib/storage"

export function UrlInputForm() {
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [scanningText, setScanningText] = useState(0)
  const router = useRouter()

  const scanningMessages = [
    "Scanning link...",
    "Analyzing URL structure...",
    "Checking security threats...",
    "Verifying SSL certificates...",
    "Detecting phishing patterns...",
    "Reviewing domain reputation...",
    "Finalizing scan results...",
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isLoading) {
      interval = setInterval(() => {
        setScanningText((prev) => (prev + 1) % scanningMessages.length)
      }, 3000)
    } else {
      setScanningText(0)
    }
    return () => clearInterval(interval)
  }, [isLoading, scanningMessages.length])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!urlUtils.isValidUrl(url)) {
      setError("Please enter a valid URL")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/scan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error(`Scan failed: ${response.statusText}`)
      }

      const data = await response.json()

      const scanId = urlUtils.generateScanId()
      const normalizedUrl = urlUtils.normalizeUrl(url)

      // Map backend risk_level to frontend risk
      const riskMapping: Record<string, "safe" | "warning" | "danger"> = {
        clean: "safe",
        warning: "warning",
        malicious: "danger",
      }

      const record: ScanRecord = {
        id: scanId,
        url: normalizedUrl,
        risk: riskMapping[data.risk_level as keyof typeof riskMapping] || "warning",
        score: data.score,
        reasons: data.reasons || [],
        created_at: new Date().toISOString(),
      }

      storageUtils.addToHistory(record)
      router.push(`/result/${scanId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during scanning")
    } finally {
      setIsLoading(false)
    }
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
          className="glow-button w-full py-3 rounded-lg text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span className="animate-pulse">{scanningMessages[scanningText]}</span>
            </span>
          ) : (
            "Scan Link"
          )}
        </button>
      </div>
    </form>
  )
}