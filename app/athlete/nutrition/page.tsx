"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"

export default function AthleteNutritionPage() {
  const nutritionLog = [
    { meal: "Breakfast", calories: 450, time: "07:00 AM", items: "Oatmeal with berries" },
    { meal: "Lunch", calories: 650, time: "12:30 PM", items: "Grilled chicken, rice, vegetables" },
    { meal: "Snack", calories: 200, time: "03:00 PM", items: "Protein bar" },
    { meal: "Dinner", calories: 550, time: "07:00 PM", items: "Salmon, sweet potato, broccoli" },
  ]

  const totalCalories = nutritionLog.reduce((sum, item) => sum + item.calories, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-balance">Nutrition Tracker</h1>
          <p className="text-muted-foreground mt-2">Monitor your daily nutrition intake</p>
        </div>

        <Card className="p-6 bg-primary text-primary-foreground">
          <p className="text-sm font-medium opacity-90">Total Calories Today</p>
          <p className="text-4xl font-bold mt-2">{totalCalories}</p>
        </Card>

        <div className="space-y-3">
          {nutritionLog.map((log, idx) => (
            <Card key={idx} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{log.meal}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{log.items}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{log.calories} cal</p>
                  <p className="text-xs text-muted-foreground">{log.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
