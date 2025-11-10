"use client";

import React from "react";
import { Button } from "./ui/button";
import { Edit, Trash2 } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  status: string;
}

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onEdit,
  onDelete,
}) => {
  if (users.length === 0)
    return <div className="text-muted-foreground">No users found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Email
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Role
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Join Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Status
            </th>
            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">{user.joinDate}</td>
              <td className="px-4 py-2">{user.status}</td>
              <td className="px-4 py-2 flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(user)}
                  className="flex items-center gap-1"
                >
                  <Edit className="w-4 h-4" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    if (
                      confirm(`Are you sure you want to delete ${user.name}?`)
                    ) {
                      onDelete(user.id);
                    }
                  }}
                  className="flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
