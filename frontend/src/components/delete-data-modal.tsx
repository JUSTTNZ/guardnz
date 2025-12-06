"use client"

import { useState } from "react"

interface DeleteDataModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteDataModal({ isOpen, onClose, onConfirm }: DeleteDataModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = () => {
    setIsDeleting(true)
    onConfirm()
    setTimeout(() => {
      setIsDeleting(false)
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
          <h2 className="text-lg font-bold text-foreground">Delete All Local Data?</h2>
          <p className="text-muted-foreground">
            This will permanently delete your scan history and preferences. This action cannot be undone.
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
              disabled={isDeleting}
              className="flex-1 py-2 px-4 rounded-lg bg-destructive text-white font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
