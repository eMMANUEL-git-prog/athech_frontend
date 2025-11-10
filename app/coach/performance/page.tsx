"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"

export default function CoachPerformancePage() {
  const performanceData = [
    { athlete: "John Smith", metric: "Speed", value: "9.2s", trend: "↓" },
    { athlete: "Sarah Johnson", metric: "Endurance", value: "12.5 km", trend: "↑" },
    { athlete: "Mike Davis", metric: "Strength", value: "85 kg", trend: "↑" },
    { athlete: "Emma Wilson", metric: "Agility", value: "8.1s", trend: "↓" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">Performance Analytics</h1>
          <p className="text-muted-foreground mt-2">Track athlete performance metrics</p>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Athlete</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Metric</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Value</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Trend</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((row, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm">{row.athlete}</td>
                    <td className="px-6 py-4 text-sm">{row.metric}</td>
                    <td className="px-6 py-4 text-sm font-medium">{row.value}</td>
                    <td className="px-6 py-4 text-sm">
                      {row.trend === "↑" ? "🟢" : "🔴"} {row.trend}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
