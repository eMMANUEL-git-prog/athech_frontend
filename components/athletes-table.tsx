"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit2, Trash2 } from "lucide-react"

interface Athlete {
  id: string
  name: string
  email: string
  sport: string
  team: string
  joinDate: string
}

interface AthletesTableProps {
  athletes: Athlete[]
  onEdit: (athlete: Athlete) => void
  onDelete: (id: string) => void
}

export function AthletesTable({ athletes, onEdit, onDelete }: AthletesTableProps) {
  if (athletes.length === 0) {
    return (
      <Card className="p-8">
        <p className="text-center text-muted-foreground">No athletes found. Add one to get started.</p>
      </Card>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Card>
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Sport</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Team</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Join Date</th>
              <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((athlete) => (
              <tr key={athlete.id} className="border-b hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium">{athlete.name}</td>
                <td className="px-6 py-4 text-sm">{athlete.email}</td>
                <td className="px-6 py-4 text-sm">{athlete.sport}</td>
                <td className="px-6 py-4 text-sm">{athlete.team}</td>
                <td className="px-6 py-4 text-sm">{athlete.joinDate}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(athlete)} className="gap-2">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this athlete?")) {
                          onDelete(athlete.id)
                        }
                      }}
                      className="gap-2 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
