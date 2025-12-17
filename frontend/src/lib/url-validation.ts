export const urlUtils = {
  isValidUrl: (input: string): boolean => {
    try {
      // Remove whitespace
      const trimmed = input.trim()
      if (!trimmed) return false

      // Add protocol if missing
      const withProtocol = trimmed.startsWith("http://") || trimmed.startsWith("https://") ? trimmed : `https://${trimmed}`

      const url = new URL(withProtocol)

      // Ensure hostname contains at least one dot (indicating a proper domain)
      if (!url.hostname.includes(".")) {
        return false
      }

      return true
    } catch {
      return false
    }
  },

  normalizeUrl: (input: string): string => {
    const trimmed = input.trim()
    return trimmed.startsWith("http://") || trimmed.startsWith("https://") ? trimmed : `https://${trimmed}`
  },

  generateScanId: (): string => {
    return `scan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  },

  // Placeholder risk detection for demo (future: integrate with AI)
  getPlaceholderRisk: (url: string): "safe" | "warning" | "danger" => {
    const dangerous = ["phishing", "malware", "scam", "fake", "virus", "bit.ly", "tinyurl"]
    const warning = ["redirect", "shortened", "suspicious", "unusual"]

    const lowerUrl = url.toLowerCase()

    if (dangerous.some((term) => lowerUrl.includes(term))) return "danger"
    if (warning.some((term) => lowerUrl.includes(term))) return "warning"

    return "safe"
  },
}
