"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"

export default function AthleteInjuriesPage() {
  const injuries = [
    {
      id: "1",
      type: "Ankle Sprain",
      status: "Recovered",
      date: "2024-09-15",
      notes: "Fully recovered, cleared for full training",
    },
    {
      id: "2",
      type: "Shoulder Pain",
      status: "In Recovery",
      date: "2024-11-01",
      notes: "Light training only, avoid heavy lifting",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">Injury Management</h1>
          <p className="text-muted-foreground mt-2">Track and manage your injuries</p>
        </div>

        <div className="space-y-4">
          {injuries.map((injury) => (
            <Card key={injury.id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{injury.type}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{injury.notes}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    injury.status === "Recovered"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {injury.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-3">{injury.date}</p>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
