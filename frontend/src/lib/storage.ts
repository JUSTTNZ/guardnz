export interface ScanRecord {
  id: string
  url: string
  risk_level: "safe" | "warning" | "danger"
  score: number
  reasons: string[]
  domain: string
  source: string | null
  created_at: string
}

export interface UserSettings {
  animationsEnabled: boolean
}

const STORAGE_KEYS = {
  HISTORY: "guardnz_history",
  SETTINGS: "guardnz_settings",
}

export const storageUtils = {
  // History management
  getHistory: (): ScanRecord[] => {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(STORAGE_KEYS.HISTORY)
    return stored ? JSON.parse(stored) : []
  },

  addToHistory: (record: ScanRecord) => {
    if (typeof window === "undefined") return
    const history = storageUtils.getHistory()
    // Remove any existing record with the same ID to prevent duplicates
    const filtered = history.filter((r) => r.id !== record.id)
    const updated = [record, ...filtered]
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated))
  },

  getHistoryById: (id: string): ScanRecord | undefined => {
    const history = storageUtils.getHistory()
    return history.find((r) => r.id === id)
  },

  clearHistory: () => {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEYS.HISTORY)
  },

  // Settings management
  getSettings: (): UserSettings => {
    if (typeof window === "undefined") return { animationsEnabled: true }
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS)
    return stored ? JSON.parse(stored) : { animationsEnabled: true }
  },

  updateSettings: (settings: Partial<UserSettings>) => {
    if (typeof window === "undefined") return
    const current = storageUtils.getSettings()
    const updated = { ...current, ...settings }
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated))
  },

  clearAllData: () => {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEYS.HISTORY)
    localStorage.removeItem(STORAGE_KEYS.SETTINGS)
  },
}
