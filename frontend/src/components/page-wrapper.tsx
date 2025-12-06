"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { storageUtils } from "@/lib/storage"

interface PageWrapperProps {
  children: React.ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  const [animationsDisabled, setAnimationsDisabled] = useState(false)

  useEffect(() => {
    const settings = storageUtils.getSettings()
    setAnimationsDisabled(!settings.animationsEnabled)
  }, [])

  return (
    <div
      className={animationsDisabled ? "prefers-reduced-motion" : ""}
      style={animationsDisabled ? { colorScheme: "dark" } : {}}
    >
      {children}
    </div>
  )
}
