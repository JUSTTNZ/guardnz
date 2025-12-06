"use client"

import { useState } from "react"

interface ClearHistoryModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ClearHistoryModal({ isOpen, onClose, onConfirm }: ClearHistoryModalProps) {
  const [isConfirming, setIsConfirming] = useState(false)

  const handleConfirm = () => {
    setIsConfirming(true)
    onConfirm()
    setTimeout(() => {
      setIsConfirming(false)
      onClose()
    }, 300)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div className="bg-card border-2 border-border rounded-lg max-w-sm w-full p-6 space-y-4">
          <h2 className="text-lg font-bold text-foreground">Clear All History?</h2>
          <p className="text-muted-foreground">
            This action cannot be undone. All your scan history will be permanently deleted.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 rounded-lg border-2 border-border text-foreground hover:bg-border transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isConfirming}
              className="flex-1 py-2 px-4 rounded-lg bg-destructive text-white font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {isConfirming ? "Clearing..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
