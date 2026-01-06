"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Shield, AlertTriangle, AlertOctagon, Search, Link2, FileText, Save, CheckCircle, Loader2, Globe, ExternalLink, Eye } from "lucide-react"
import { storageUtils, type ScanRecord } from "@/lib/storage"
import { riskConfig } from "@/lib/risk-config"
import { RiskBadge } from "./risk-badge"

interface EvidenceData {
  final_url: string
  screenshot: string
  domains_contacted: string[]
  verdict_score: number
}

interface ResultContentProps {
  scanId: string
}

export function ResultContent({ scanId }: ResultContentProps) {
  const [record, setRecord] = useState<ScanRecord | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [evidence, setEvidence] = useState<EvidenceData | null>(null)
  const [evidenceError, setEvidenceError] = useState(false)
  const [isEvidenceLoading, setIsEvidenceLoading] = useState(false)

  useEffect(() => {
    const record = storageUtils.getHistoryById(scanId)
    if (record) {
      setRecord(record)
      setIsLoading(false)
      setTimeout(() => setShowContent(true), 100)
    } else {
      setIsLoading(false)
    }
  }, [scanId])

  useEffect(() => {
    if (record && record.risk_level && record.risk_level !== "safe") {
      setIsEvidenceLoading(true)
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/scan/evidence/${scanId}`)
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else if (response.status === 404) {
            setEvidenceError(true)
            return null
          } else {
            throw new Error('Failed to fetch evidence')
          }
        })
        .then((data) => {
          if (data) {
            setEvidence(data)
          }
        })
        .catch((error) => {
          console.error('Error fetching evidence:', error)
          setEvidenceError(true)
        })
        .finally(() => {
          setIsEvidenceLoading(false)
        })
    }
  }, [record, scanId])

  const handleSaveToHistory = () => {
    setIsSaved(true)
    // It's already in history from the initial scan, so just update UI
    setTimeout(() => setIsSaved(false), 2000)
  }



  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
        </div>
        <div className="text-muted-foreground animate-pulse">Loading scan results...</div>
      </div>
    )
  }

  if (!record) {
    return (
      <div className="text-center py-16 space-y-6">
        <AlertOctagon className="w-24 h-24 mx-auto text-destructive" />
        <div className="space-y-2">
          <p className="text-2xl font-semibold text-foreground">Scan Not Found</p>
          <p className="text-muted-foreground">This scan result doesn't exist or has expired.</p>
        </div>
        <Link 
          href="/" 
          className="inline-block glow-button px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
        >
          Start New Scan
        </Link>
      </div>
    )
  }

  return (
    <div className={`space-y-6 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* A. Risk Badge */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <RiskBadge risk_level={record.risk_level} size="lg" />
      </div>

      {/* B. What this link is */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">What this link is</h3>
        <p className="text-foreground">
          {record.source ? `This link claims to be from ${record.source}` : `This link points to an unknown website (${record.domain})`}
        </p>
      </div>

      {/* URL Display */}
      <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
        <div className="flex items-start gap-3">
          <Link2 className="w-6 h-6 text-primary mt-1" />
          <div className="flex-1 min-w-0">
            <p className="text-muted-foreground text-sm font-medium mb-2">Scanned URL</p>
            <p className="text-foreground break-all font-mono text-sm bg-muted/30 p-3 rounded-lg">
              {record.url}
            </p>
          </div>
        </div>
      </div>

      {/* C. Why GuardNZ flagged it */}
      {record.reasons && record.reasons.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Why GuardNZ flagged it</h3>
          <ul className="space-y-3">
            {record.reasons.map((reason, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <span className="text-primary text-lg mt-0.5">•</span>
                <span className="text-foreground text-sm flex-1">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* D. Evidence section */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Deep Scan Evidence</h3>
        {record.risk_level !== "safe" ? (
          isEvidenceLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-primary animate-spin mr-2" />
              <span className="text-muted-foreground">Loading evidence...</span>
            </div>
          ) : evidence ? (
          <div className="space-y-4">
            {/* Screenshot */}
            {evidence.screenshot && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">Screenshot Preview</span>
                </div>
                <div className="border border-border rounded-lg overflow-hidden">
                  <img
                    src={evidence.screenshot}
                    alt="Website screenshot"
                    className="w-full h-auto max-h-64 object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Final redirect URL */}
            {evidence.final_url && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">Final Redirect URL</span>
                </div>
                <p className="text-sm text-muted-foreground break-all bg-muted/30 p-3 rounded-lg">
                  {evidence.final_url}
                </p>
              </div>
            )}

            {/* Domains contacted */}
            {evidence.domains_contacted && evidence.domains_contacted.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">Domains Contacted</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {evidence.domains_contacted.map((domain, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted/30 text-sm text-muted-foreground rounded-full"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          ) : evidenceError ? (
            <div className="text-center py-8">
              <span className="text-muted-foreground">Deep scan still running or unavailable</span>
            </div>
          ) : null
        ) : (
          <div className="text-center py-8">
            <span className="text-muted-foreground">Deep scan not required for safe links</span>
          </div>
        )}
      </div>

      {/* Timestamp */}
      <div className="text-center text-sm text-muted-foreground">
        Scanned on {new Date(record.created_at).toLocaleString()}
      </div>

      {/* E. Safety Advice */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">Safety Advice</h3>
        <p className="text-foreground">
          {record.risk_level && riskConfig[record.risk_level] ? riskConfig[record.risk_level].advice : "Loading advice..."}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link 
          href="/" 
          className="glow-button flex-1 py-4 rounded-xl text-center font-semibold hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          Scan Another Link
        </Link>
        <button
          onClick={handleSaveToHistory}
          className={`flex-1 py-4 rounded-xl font-semibold border-2 transition-all shadow-lg flex items-center justify-center gap-2 ${
            isSaved 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105'
          }`}
        >
          {isSaved ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Saved to History
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save to History
            </>
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}