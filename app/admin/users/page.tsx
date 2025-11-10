"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { UsersTable } from "@/components/users-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { apiClient } from "@/lib/api-client";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  status: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiClient.get<
          {
            id: string;
            email: string;
            role: string;
            created_at: string;
            first_name?: string;
            last_name?: string;
          }[]
        >("/api/admin/users");

        const transformed: User[] = res.map((u) => ({
          id: u.id,
          name:
            u.first_name && u.last_name
              ? `${u.first_name} ${u.last_name}`
              : u.role.charAt(0).toUpperCase() + u.role.slice(1),
          email: u.email,
          role: u.role,
          joinDate: new Date(u.created_at).toLocaleDateString(),
          status: "active", // default; you can extend backend to return status
        }));

        setUsers(transformed);
      } catch (err: any) {
        setError(err.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete user
  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await apiClient.delete(`/api/admin/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete user");
    }
  };

  // Edit user
  const handleEditUser = (user: User) => {
    console.log("Edit user:", user);
    // TODO: open modal to edit user details
  };

  if (loading)
    return (
      <DashboardLayout>
        <div>Loading users...</div>
      </DashboardLayout>
    );
  if (error)
    return (
      <DashboardLayout>
        <div className="text-red-500">{error}</div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Manage Users</h1>
            <p className="text-muted-foreground mt-2">
              System user management and permissions
            </p>
          </div>
          <Button
            className="gap-2"
            onClick={() => console.log("Add user clicked")}
          >
            <Plus className="w-4 h-4" />
            Add User
          </Button>
        </div>

        {/* Users Table */}
        <UsersTable
          users={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </div>
    </DashboardLayout>
  );
}
