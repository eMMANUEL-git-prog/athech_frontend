"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { PerformanceChart } from "@/components/performance-chart";
import { apiClient } from "@/lib/api-client";

interface DashboardData {
  totalAthletes: number;
  totalCoaches: number;
  totalPerformances: number;
  totalInjuries: number;
  userGrowth: { name: string; users: number }[];
  systemHealth: { name: string; uptime: number }[];
  teams: { name: string; teams: number }[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await apiClient.get<DashboardData>("/api/admin/dashboard");
        setData(res);
      } catch (err: any) {
        setError(err.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center text-muted-foreground">
          Loading dashboard...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center text-red-500">{error}</div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="text-center text-muted-foreground">
          No data available
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            System overview and management tools
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Total Athletes
            </div>
            <div className="text-2xl font-bold mt-2">{data.totalAthletes}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Total Coaches
            </div>
            <div className="text-2xl font-bold mt-2">{data.totalCoaches}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Performances
            </div>
            <div className="text-2xl font-bold mt-2">
              {data.totalPerformances}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium text-muted-foreground">
              Injuries
            </div>
            <div className="text-2xl font-bold mt-2 text-red-500">
              {data.totalInjuries}
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart
            title="User Growth"
            data={data.userGrowth}
            type="area"
            dataKey="users"
          />
          <PerformanceChart
            title="System Uptime"
            data={data.systemHealth}
            type="line"
            dataKey="uptime"
          />
        </div>

        {/* Teams */}
        <PerformanceChart
          title="Teams by Organization"
          data={data.teams}
          type="bar"
          dataKey="teams"
        />

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-3">User Management</h3>
            <p className="text-sm text-muted-foreground">
              Manage user accounts and permissions.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-3">System Logs</h3>
            <p className="text-sm text-muted-foreground">
              View application activity and errors.
            </p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
