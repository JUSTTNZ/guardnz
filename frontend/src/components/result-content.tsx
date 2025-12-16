"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Shield, AlertTriangle, AlertOctagon, Search, Link2, FileText, Save, CheckCircle, Loader2 } from "lucide-react"
import { storageUtils, type ScanRecord } from "@/lib/storage"
import { RiskBadge } from "./risk-badge"

interface ResultContentProps {
  scanId: string
}

export function ResultContent({ scanId }: ResultContentProps) {
  const [record, setRecord] = useState<ScanRecord | null>(null)
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const data = storageUtils.getHistoryById(scanId)
    setRecord(data || null)
    setIsLoading(false)
    
    // Trigger animation after data loads
    if (data) {
      setTimeout(() => setShowContent(true), 100)
    }
  }, [scanId])

  const handleSaveToHistory = () => {
    setIsSaved(true)
    // It's already in history from the initial scan, so just update UI
    setTimeout(() => setIsSaved(false), 2000)
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "safe":
        return <Shield className="w-20 h-20 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-20 h-20 text-yellow-500" />
      case "danger":
        return <AlertOctagon className="w-20 h-20 text-red-500" />
      default:
        return <Search className="w-20 h-20 text-primary" />
    }
  }

  const getRiskMessage = (risk: string) => {
    switch (risk) {
      case "safe":
        return "This link appears to be safe"
      case "warning":
        return "Exercise caution with this link"
      case "danger":
        return "This link may be dangerous"
      default:
        return "Analysis complete"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-red-500"
    if (score >= 50) return "text-yellow-500"
    return "text-green-500"
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
      {/* Hero Result Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-card via-card to-card/80 border-2 border-border rounded-2xl p-8 shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative space-y-6">
          {/* Status Icon and Message */}
          <div className="text-center space-y-3">
            <div className="animate-bounce-slow inline-block">
              {getRiskIcon(record.risk)}
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {getRiskMessage(record.risk)}
            </h2>
          </div>

          {/* Risk Badge */}
          <div className="flex justify-center">
            <div className="transform hover:scale-105 transition-transform">
              <RiskBadge risk={record.risk} size="lg" />
            </div>
          </div>

          {/* Score Display */}
          <div className="bg-background/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-medium">Risk Score</span>
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-bold font-mono ${getScoreColor(record.score)}`}>
                  {record.score}
                </span>
                <span className="text-2xl text-muted-foreground font-mono">/100</span>
              </div>
            </div>
            
            {/* Score Bar */}
            <div className="mt-4 h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  record.score >= 80 ? 'bg-red-500' : 
                  record.score >= 50 ? 'bg-yellow-500' : 
                  'bg-green-500'
                }`}
                style={{ width: `${record.score}%` }}
              />
            </div>
          </div>
        </div>
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

      {/* Analysis Details */}
      {record.reasons && record.reasons.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Analysis Details</h3>
          </div>
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

      {/* Timestamp */}
      <div className="text-center text-sm text-muted-foreground">
        Scanned on {new Date(record.created_at).toLocaleString()}
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