"use client"

import { useState, useEffect } from "react"
import { Settings, Sparkles, User, Trash2, Loader2, AlertTriangle } from "lucide-react"
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
    setAnimationsEnabled(true)
  }

  if (isLoading) {
    return (
      <main className="flex-1 flex flex-col cyber-grid relative overflow-hidden">
        <div className="gradient-orb gradient-orb-1" />
        <div className="gradient-orb gradient-orb-2" />
        <div className="flex-1 flex items-center justify-center relative z-10">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-muted-foreground">Loading settings...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 flex flex-col cyber-grid relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />

      {/* Main content */}
      <div className="flex-1 flex flex-col px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          {/* Page header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Settings</h1>
              <p className="text-sm text-muted-foreground">Customize your experience</p>
            </div>
          </div>

          {/* Animations Toggle */}
          <section className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">UI Animations</h3>
                  <p className="text-sm text-muted-foreground">Enable smooth transitions and visual effects</p>
                </div>
              </div>
              <button
                onClick={handleAnimationToggle}
                className={`relative w-14 h-8 rounded-full transition-all flex-shrink-0 ${
                  animationsEnabled
                    ? "bg-primary shadow-[0_0_15px_rgba(0,255,136,0.4)]"
                    : "bg-muted"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform shadow-md ${
                    animationsEnabled ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Future Features */}
          <section className="glass-card p-6 opacity-60">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-muted-foreground">Account Features</h3>
                <p className="text-sm text-muted-foreground">
                  Account sync and advanced security features coming soon
                </p>
                <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground">
                  Coming Soon
                </span>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="glass-card p-6 border-destructive/30">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-destructive">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Permanently delete all your local data including scan history and preferences
                </p>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border-2 border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive transition-all font-semibold"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete All Local Data
                </button>
                <p className="text-xs text-muted-foreground mt-3">
                  This action cannot be undone. All your data will be permanently removed.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Modal */}
      <DeleteDataModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteData}
      />
    </main>
  )
}
