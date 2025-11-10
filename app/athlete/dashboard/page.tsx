"use client";

import { Navbar } from "@/components/navbar";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { PerformanceChart } from "@/components/performance-chart";

export default function AthleteDashboard() {
  const { user } = useAuth();

  const performanceData = [
    { name: "Mon", performance: 78 },
    { name: "Tue", performance: 82 },
    { name: "Wed", performance: 75 },
    { name: "Thu", performance: 85 },
    { name: "Fri", performance: 88 },
    { name: "Sat", performance: 90 },
    { name: "Sun", performance: 87 },
  ];

  const caloriesData = [
    { name: "Mon", calories: 2100 },
    { name: "Tue", calories: 2350 },
    { name: "Wed", calories: 2200 },
    { name: "Thu", calories: 2430 },
    { name: "Fri", calories: 2300 },
    { name: "Sat", calories: 2500 },
    { name: "Sun", calories: 2250 },
  ];

  const strengthData = [
    { name: "Week 1", strength: 75 },
    { name: "Week 2", strength: 78 },
    { name: "Week 3", strength: 82 },
    { name: "Week 4", strength: 85 },
  ];

  const firstName = user?.athlete?.first_name || user?.email;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-balance">
            Welcome, {firstName}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track your performance and health metrics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Workouts This Week
            </div>
            <div className="mt-2 text-2xl font-bold">4</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Average Performance
            </div>
            <div className="mt-2 text-2xl font-bold">87%</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Injury Status
            </div>
            <div className="mt-2 text-2xl font-bold text-green-600">
              Healthy
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Calories Burned
            </div>
            <div className="mt-2 text-2xl font-bold">2,430</div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PerformanceChart
            title="Weekly Performance"
            data={performanceData}
            type="line"
            dataKey="performance"
          />
          <PerformanceChart
            title="Daily Calories"
            data={caloriesData}
            type="bar"
            dataKey="calories"
          />
        </div>

        {/* Monthly Strength Progress */}
        <PerformanceChart
          title="Monthly Strength Progress"
          data={strengthData}
          type="area"
          dataKey="strength"
        />

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Upper Body Strength Training</span>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Nutrition Log Completed</span>
              <span className="text-xs text-muted-foreground">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Performance Review</span>
              <span className="text-xs text-muted-foreground">1 day ago</span>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
