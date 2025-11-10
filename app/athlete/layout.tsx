import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Athlete Dashboard",
}

export default function AthleteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
