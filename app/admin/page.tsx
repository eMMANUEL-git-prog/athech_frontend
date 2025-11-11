"use client";
import { io } from "socket.io-client";
import { useRequireRole } from "@/hooks/useRequireRole";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  LayoutDashboard,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Brain,
} from "lucide-react";
import { apiClient } from "@/lib/api-client";

export default function AdminDashboard() {
  const socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000");
  const { user, loading } = useRequireRole(["admin"]);

  // inside component:
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [refreshingAI, setRefreshingAI] = useState(false);

  const fetchAdminAIInsights = async () => {
    try {
      setRefreshingAI(true);
      const res = await apiClient.get("/ai/admin-insights");
      setAiInsights(res.data.insights);
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshingAI(false);
    }
  };

  useEffect(() => {
    socket.on("dataUpdated", (payload) => {
      console.log("🔁 Data updated:", payload);
      // If relevant to this user type, refetch AI insights automatically
      if (user?.role === "athlete" && payload.athlete_id === user.id) {
        fetchAIInsights(); // your existing function
      }
      if (user?.role === "admin") {
        fetchAdminAIInsights();
      }
    });

    return () => {
      socket.off("dataUpdated");
    };
  }, [user]);

  useEffect(() => {
    fetchAdminAIInsights();
  }, []);

  useEffect(() => {
    if (!loading && user) {
      apiClient("/ai/admin-insights")
        .then((data) => setAiInsights(data.insights))
        .catch((err) => console.error(err));
    }
  }, [user, loading]);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalCoaches: 0,
    totalAthletes: 0,
    totalCamps: 0,
    accreditedCamps: 0,
    revokedCamps: 0,
  });

  const [alerts, setAlerts] = useState<
    { id: string; title: string; body: string; created_at: string }[]
  >([]);

  useEffect(() => {
    if (!loading && user) {
      apiClient("/admin/stats")
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
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card icon={Users} title="Total Users" value={stats.totalUsers} />
        <Card
          icon={Users}
          title="Admins"
          value={stats.totalAdmins}
          gradient="from-purple-400 to-purple-500"
        />
        <Card
          icon={Users}
          title="Coaches"
          value={stats.totalCoaches}
          gradient="from-indigo-400 to-indigo-500"
        />
        <Card
          icon={Users}
          title="Athletes"
          value={stats.totalAthletes}
          gradient="from-green-400 to-green-500"
        />
        <Card
          icon={Shield}
          title="Camps"
          value={stats.totalCamps}
          gradient="from-yellow-400 to-yellow-500"
        />
        <Card
          icon={CheckCircle2}
          title="Accredited Camps"
          value={stats.accreditedCamps}
          gradient="from-green-400 to-green-500"
        />
        <Card
          icon={XCircle}
          title="Revoked Camps"
          value={stats.revokedCamps}
          gradient="from-red-400 to-red-500"
        />
      </div>

      {/* AI Analytics Overview */}
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            AI Analytics Overview
          </h2>
          <Button
            variant="outline"
            onClick={fetchAdminAIInsights}
            disabled={refreshingAI}
            className="text-sm"
          >
            {refreshingAI ? "Refreshing..." : "🔄 Refresh"}
          </Button>
        </div>

        {aiInsights.length === 0 ? (
          <p className="text-gray-500">
            No insights yet. AI will analyze data as soon as activity logs or
            athlete performance records are available.
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
          Manage Users
        </Button>
        <Button className="bg-yellow-500 text-white hover:bg-yellow-600">
          Manage Camps
        </Button>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
          View Reports
        </Button>
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
