import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Coach Dashboard",
}

export default function CoachLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
