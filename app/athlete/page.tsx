"use client";

import { io } from "socket.io-client";
import { useRequireRole } from "@/hooks/useRequireRole";
import CoachChat from "@/components/coach-chat";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAiInsights = async () => {
    try {
      setRefreshing(true);
      const res = await apiClient.get("/ai/athlete-insights");
      setAiInsights(res.data.insights);
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAiInsights();
  }, []);

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

  if (loading)
    return (
      <div className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center">
        <Skeleton className="w-64 h-8 mb-4" />
        <Skeleton className="w-full h-40 mb-2" />
        <Skeleton className="w-full h-40 mb-2" />
      </div>
    );

  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-73px)] px-4 py-6 bg-gradient-to-b from-gray-50 to-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <LayoutDashboard className="w-6 h-6 text-gray-700" />
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
          gradient="from-indigo-400 to-indigo-500"
        />
        <Card
          icon={Zap}
          title="Nutrition Logs"
          value={stats.nutritionLogs}
          gradient="from-green-400 to-green-500"
        />
        <Card
          icon={Zap}
          title="Injuries"
          value={stats.injuries}
          gradient="from-red-400 to-red-500"
        />
      </div>

      <div className="bg-white shadow-lg rounded-2xl m-16 p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600" />
            AI Performance Insights
          </h2>
          <Button
            variant="outline"
            onClick={fetchAiInsights}
            disabled={refreshing}
            className="text-sm"
          >
            {refreshing ? "Refreshing..." : "🔄 Refresh"}
          </Button>
        </div>

        {aiInsights.length === 0 ? (
          <p className="text-gray-500">
            No insights yet. Add training or nutrition data to get personalized
            AI feedback.
          </p>
        ) : (
          <ul className="list-disc list-inside space-y-2">
            {aiInsights.map((insight, idx) => (
              <li key={idx} className="text-gray-700 leading-relaxed">
                {insight}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recent Alerts */}
      <AlertsList alerts={alerts} />

      {/* Quick Links */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button className="bg-gray-700 text-white hover:bg-gray-800">
          View Schedule
        </Button>
        <Button className="bg-indigo-500 text-white hover:bg-indigo-600">
          Log Nutrition
        </Button>
        <Button className="bg-red-500 text-white hover:bg-red-600">
          Report Injury
        </Button>
      </div>
      <div className="my-10">
        <CoachChat userId={user.id} />
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
      className={`flex items-center p-5 rounded-2xl shadow-md bg-gradient-to-r ${gradient} text-white`}
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
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        Recent Alerts
      </h2>
      <ul className="space-y-3">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className="p-4 bg-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
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
