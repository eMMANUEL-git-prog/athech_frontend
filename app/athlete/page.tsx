"use client";

import { useRequireRole } from "@/hooks/useRequireRole";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Zap,
  Calendar,
  Trophy,
  AlertTriangle,
} from "lucide-react";
import { apiClient } from "@/lib/api-client";

export default function AthleteDashboard() {
  const { user, loading } = useRequireRole(["athlete"]);

  const [stats, setStats] = useState({
    upcomingEvents: 0,
    completedEvents: 0,
    nutritionLogs: 0,
    injuries: 0,
  });

  const [alerts, setAlerts] = useState<
    { id: string; title: string; body: string; created_at: string }[]
  >([]);

  useEffect(() => {
    if (!loading && user) {
      apiClient("/athlete/stats")
        .then((data) => setStats(data))
        .catch((err) => console.error(err));

      apiClient("/alerts/recent")
        .then((data) => setAlerts(data))
        .catch((err) => console.error(err));
    }
  }, [user, loading]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-73px)] px-4 py-6 bg-gradient-to-b from-green-50 to-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <LayoutDashboard className="w-6 h-6 text-green-600" />
        Athlete Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          icon={Calendar}
          title="Upcoming Events"
          value={stats.upcomingEvents}
          gradient="from-yellow-400 to-yellow-500"
        />
        <Card
          icon={Trophy}
          title="Completed Events"
          value={stats.completedEvents}
          gradient="from-indigo-500 to-indigo-600"
        />
        <Card
          icon={Zap}
          title="Nutrition Logs"
          value={stats.nutritionLogs}
          gradient="from-green-500 to-green-600"
        />
        <Card
          icon={Zap}
          title="Injuries"
          value={stats.injuries}
          gradient="from-red-500 to-red-600"
        />
      </div>

      {/* Recent Alerts */}
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Recent Alerts
        </h2>
        {alerts.length === 0 ? (
          <p className="text-gray-500">No recent alerts.</p>
        ) : (
          <ul className="space-y-3">
            {alerts.map((alert) => (
              <li
                key={alert.id}
                className="p-4 bg-green-50 rounded-xl border border-green-200 hover:shadow-md transition-all duration-200"
              >
                <h3 className="font-medium text-gray-800">{alert.title}</h3>
                <p className="text-gray-600 text-sm">{alert.body}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {new Date(alert.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick Links */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
          View Schedule
        </Button>
        <Button className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
          Log Nutrition
        </Button>
        <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
          Report Injury
        </Button>
      </div>
    </div>
  );
}

function Card({
  icon: Icon,
  title,
  value,
  gradient = "from-green-500 to-green-600",
}: {
  icon: any;
  title: string;
  value: number;
  gradient?: string;
}) {
  return (
    <div
      className={`flex items-center p-5 rounded-2xl shadow-md bg-gradient-to-r ${gradient} text-white hover:shadow-lg transition-all duration-300`}
    >
      <Icon className="w-6 h-6 mr-4" />
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
