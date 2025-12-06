"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { GuardnzLogo } from "@/components/logo"
import { FooterText } from "@/components/footer-text"
import { DeleteDataModal } from "@/components/delete-data-modal"
import { storageUtils } from "@/lib/storage"

export default function SettingsPage() {
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const settings = storageUtils.getSettings()
    setAnimationsEnabled(settings.animationsEnabled)
    setIsLoading(false)
  }, [])

  const handleAnimationToggle = () => {
    const newValue = !animationsEnabled
    setAnimationsEnabled(newValue)
    storageUtils.updateSettings({ animationsEnabled: newValue })
  }

  const handleDeleteData = () => {
    storageUtils.clearAllData()
    // Reset animations to default
    setAnimationsEnabled(true)
  }

  if (isLoading) {
    return (
      <main className="flex-1 flex flex-col justify-between cyber-grid">
        <header className="border-b border-border py-6 px-4">
          <div className="max-w-2xl mx-auto flex items-center">
            <GuardnzLogo className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold neon-glow ml-3">GUARDNZ</h1>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
        <footer className="border-t border-border py-6 px-4">
          <FooterText />
        </footer>
      </main>
    )
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
        <div className="max-w-2xl mx-auto w-full space-y-8">
          <h2 className="text-3xl font-bold text-foreground">Settings</h2>

          {/* Animations Toggle */}
          <section className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">UI Animations</h3>
                <p className="text-muted-foreground text-sm">Enable smooth transitions and animations</p>
              </div>
              <button
                onClick={handleAnimationToggle}
                className={`relative w-14 h-8 rounded-full transition-colors ${animationsEnabled ? "bg-primary" : "bg-muted"}`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${animationsEnabled ? "translate-x-6" : ""}`}
                />
              </button>
            </div>
          </section>

          {/* Future Features */}
          <section className="bg-card border border-border rounded-lg p-6 space-y-4 opacity-60">
            <h3 className="text-lg font-semibold text-muted-foreground">Account Features</h3>
            <p className="text-muted-foreground text-sm">Account sync and advanced security features coming soon.</p>
          </section>

          {/* Danger Zone */}
          <section className="bg-card border border-destructive rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full py-3 px-4 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition-colors font-semibold"
            >
              Delete All Local Data
            </button>
            <p className="text-muted-foreground text-xs">
              This will permanently delete all your scan history and preferences. This action cannot be undone.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4">
        <FooterText />
      </footer>

      {/* Modal */}
      <DeleteDataModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteData}
      />
    </main>
  )
}
