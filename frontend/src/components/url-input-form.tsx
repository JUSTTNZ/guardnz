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
  const [isCopied, setIsCopied] = useState(false)
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
      // Calculate minimum display time (3 seconds per message * number of messages)
      const minimumDuration = scanningMessages.length * 3000
      const startTime = Date.now()

      // Make the API call
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

      // Calculate how much time has elapsed
      const elapsedTime = Date.now() - startTime
      const remainingTime = minimumDuration - elapsedTime

      // If the API responded too quickly, wait for the remaining time
      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime))
      }

      const normalizedUrl = urlUtils.normalizeUrl(url)

      const record: ScanRecord = {
        id: data.id,
        url: normalizedUrl,
        risk_level: data.risk_level,
        score: data.score,
        reasons: data.reasons || [],
        domain: data.domain,
        source: data.source,
        created_at: new Date().toISOString(),
      }

      storageUtils.addToHistory(record)
      router.push(`/result/${data.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during scanning")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!url.trim()) return

    try {
      await navigator.clipboard.writeText(url)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
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
            className="w-full px-6 py-4 pr-12 bg-card border-2 border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors text-base"
            disabled={isLoading}
            autoFocus
          />
          {url.trim() && (
            <button
              type="button"
              onClick={handleCopy}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
              title="Copy URL"
            >
              {isCopied ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          )}
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