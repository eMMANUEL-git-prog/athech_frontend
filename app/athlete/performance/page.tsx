"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"

export default function AthletePerformancePage() {
  const performanceMetrics = [
    { label: "Running Speed", value: "9.2s", unit: "per 100m", status: "improving" },
    { label: "Endurance", value: "12.5", unit: "km", status: "stable" },
    { label: "Strength", value: "85", unit: "kg", status: "improving" },
    { label: "Flexibility", value: "7.8", unit: "score", status: "needs work" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">Your Performance</h1>
          <p className="text-muted-foreground mt-2">Track your athletic performance metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {performanceMetrics.map((metric, idx) => (
            <Card key={idx} className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground">{metric.label}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold">{metric.value}</span>
                <span className="text-muted-foreground">{metric.unit}</span>
              </div>
              <p className="mt-3 text-xs font-semibold capitalize">Status: {metric.status}</p>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
