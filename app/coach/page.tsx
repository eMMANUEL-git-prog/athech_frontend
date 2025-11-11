"use client";

import { useRequireRole } from "@/hooks/useRequireRole";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Zap,
  Trophy,
  AlertTriangle,
} from "lucide-react";
import { apiClient } from "@/lib/api-client";

export default function CoachDashboard() {
  const { user, loading } = useRequireRole(["coach"]);
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  useEffect(() => {
    if (!loading && user) {
      apiClient("/ai/coach-insights")
        .then((data) => setAiInsights(data.insights))
        .catch((err) => console.error(err));
    }
  }, [user, loading]);

  const [stats, setStats] = useState({
    totalAthletes: 0,
    upcomingCamps: 0,
    completedCamps: 0,
    eventsToday: 0,
  });

  const [alerts, setAlerts] = useState<
    { id: string; title: string; body: string; created_at: string }[]
  >([]);

  useEffect(() => {
    if (!loading && user) {
      apiClient("/coach/stats")
        .then((data) => setStats(data))
        .catch((err) => console.error(err));

      apiClient("/alerts/recent")
        .then((data) => setAlerts(data))
        .catch((err) => console.error(err));
    }
  }, [user, loading]);

  if (loading)
    return (
      <div className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center gap-4">
        <Skeleton className="w-64 h-8" />
        <Skeleton className="w-full h-32" />
        <Skeleton className="w-full h-32" />
      </div>
    );
  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-73px)] px-4 py-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <LayoutDashboard className="w-6 h-6 text-gray-700" />
        Coach Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          icon={Users}
          title="Total Athletes"
          value={stats.totalAthletes}
          gradient="from-gray-600 to-gray-700"
        />
        <Card
          icon={Calendar}
          title="Upcoming Camps"
          value={stats.upcomingCamps}
          gradient="from-yellow-500 to-yellow-600"
        />
        <Card
          icon={Zap}
          title="Completed Camps"
          value={stats.completedCamps}
          gradient="from-indigo-500 to-indigo-600"
        />
        <Card
          icon={Trophy}
          title="Events Today"
          value={stats.eventsToday}
          gradient="from-green-500 to-green-600"
        />
      </div>

      {/* AI Insights */}
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          AI Coach Insights
        </h2>
        {aiInsights.length === 0 ? (
          <p className="text-gray-500">No AI insights available.</p>
        ) : (
          <ul className="list-disc list-inside space-y-2">
            {aiInsights.map((insight, idx) => (
              <li key={idx} className="text-gray-700">
                {insight}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recent Alerts */}
      <AlertsList alerts={alerts} />

      {/* Quick Links */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Button className="bg-gray-700 text-white hover:bg-gray-800">
          Manage Athletes
        </Button>
        <Button className="bg-yellow-500 text-white hover:bg-yellow-600">
          View Camps
        </Button>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
          Enter Performance
        </Button>
        <Link href="/coach/register-event">
          <Button className="bg-green-500 text-white hover:bg-green-600">
            Register Event
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Card({
  icon: Icon,
  title,
  value,
  gradient = "from-gray-700 to-gray-800",
}: {
  icon: any;
  title: string;
  value: number;
  gradient?: string;
}) {
  return (
    <div
      className={`flex items-center p-5 rounded-xl shadow-md bg-gradient-to-r ${gradient} text-white`}
    >
      <Icon className="w-6 h-6 mr-4" />
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function AlertsList({
  alerts,
}: {
  alerts: { id: string; title: string; body: string; created_at: string }[];
}) {
  if (alerts.length === 0)
    return <p className="text-gray-500">No recent alerts.</p>;

  return (
    <div className="bg-white shadow rounded-xl p-6 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        Recent Alerts
      </h2>
      <ul className="space-y-3">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className="p-4 bg-gray-100 rounded-lg border border-gray-200 hover:shadow-sm transition-all duration-200"
          >
            <h3 className="font-medium text-gray-800">{alert.title}</h3>
            <p className="text-gray-600 text-sm">{alert.body}</p>
            <p className="text-gray-400 text-xs mt-1">
              {new Date(alert.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
