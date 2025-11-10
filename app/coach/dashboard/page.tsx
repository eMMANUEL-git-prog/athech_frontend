"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { PerformanceChart } from "@/components/performance-chart"

export default function CoachDashboard() {
  const { user } = useAuth()

  const teamPerformanceData = [
    { name: "Mon", performance: 82 },
    { name: "Tue", performance: 84 },
    { name: "Wed", performance: 79 },
    { name: "Thu", performance: 87 },
    { name: "Fri", performance: 89 },
    { name: "Sat", performance: 91 },
    { name: "Sun", performance: 88 },
  ]

  const athleteProgressData = [
    { name: "John Smith", score: 88 },
    { name: "Sarah Johnson", score: 92 },
    { name: "Mike Davis", score: 85 },
    { name: "Emma Wilson", score: 90 },
    { name: "Alex Brown", score: 87 },
  ]

  const attendanceData = [
    { name: "Week 1", attendance: 92 },
    { name: "Week 2", attendance: 88 },
    { name: "Week 3", attendance: 95 },
    { name: "Week 4", attendance: 90 },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-balance">Coach Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage athletes and track team performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Total Athletes</div>
            <div className="text-2xl font-bold mt-2">12</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Active Sessions</div>
            <div className="text-2xl font-bold mt-2">3</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Injuries</div>
            <div className="text-2xl font-bold mt-2 text-yellow-600">1</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground">Team Performance</div>
            <div className="text-2xl font-bold mt-2">91%</div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart
            title="Weekly Team Performance"
            data={teamPerformanceData}
            type="line"
            dataKey="performance"
          />
          <PerformanceChart title="Athlete Performance Scores" data={athleteProgressData} type="bar" dataKey="score" />
        </div>

        {/* Attendance Trend */}
        <PerformanceChart title="Team Attendance Rate" data={attendanceData} type="area" dataKey="attendance" />

        {/* Alerts */}
        <Card className="p-6 border-yellow-200 bg-yellow-50 dark:bg-yellow-950">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">Active Alerts</h3>
          <div className="mt-3 space-y-2">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">⚠️ Athlete overtraining: John Smith</p>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">🩹 Minor injury reported: Sarah Johnson</p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
