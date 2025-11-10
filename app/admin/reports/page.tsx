"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { PerformanceChart } from "@/components/performance-chart";
import { apiClient } from "@/lib/api-client";

interface ReportData {
  totalAthletes: number;
  totalPerformances: number;
  totalInjuries: number;
  performances: { name: string; average: number }[];
  injuries: { name: string; injuries: number }[];
}

export default function AdminReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await apiClient.get<ReportData>("/api/admin/reports");
        setData(res);
      } catch (err: any) {
        setError(err.message || "Failed to fetch reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading)
    return (
      <DashboardLayout>
        <p>Loading reports...</p>
      </DashboardLayout>
    );
  if (error)
    return (
      <DashboardLayout>
        <p className="text-red-500">{error}</p>
      </DashboardLayout>
    );
  if (!data)
    return (
      <DashboardLayout>
        <p>No data available</p>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">System Reports</h1>
          <p className="text-muted-foreground mt-2">
            View comprehensive analytics and reports
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceChart
            title="Weekly Performance Average"
            data={data.performances}
            type="line"
            dataKey="average"
          />
          <PerformanceChart
            title="Injury Incidents by Month"
            data={data.injuries}
            type="bar"
            dataKey="injuries"
          />
        </div>

        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">System Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Athletes</p>
              <p className="text-2xl font-bold mt-1">{data.totalAthletes}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Total Workouts Logged
              </p>
              <p className="text-2xl font-bold mt-1">
                {data.totalPerformances}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Injuries</p>
              <p className="text-2xl font-bold mt-1 text-red-500">
                {data.totalInjuries}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
