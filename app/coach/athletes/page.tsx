"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AthleteForm } from "@/components/athlete-form"
import { AthletesTable } from "@/components/athletes-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Athlete {
  id: string
  name: string
  email: string
  sport: string
  team: string
  joinDate: string
}

export default function CoachAthletesPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      sport: "Basketball",
      team: "Team A",
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      sport: "Soccer",
      team: "Team B",
      joinDate: "2024-02-10",
    },
  ])
  const [showForm, setShowForm] = useState(false)
  const [editingAthlete, setEditingAthlete] = useState<Athlete | undefined>()

  const handleAddAthlete = (formData: any) => {
    if (editingAthlete) {
      setAthletes(athletes.map((a) => (a.id === editingAthlete.id ? { ...a, ...formData } : a)))
      setEditingAthlete(undefined)
    } else {
      const newAthlete: Athlete = {
        id: Math.random().toString(),
        ...formData,
      }
      setAthletes([...athletes, newAthlete])
    }
    setShowForm(false)
  }

  const handleEditAthlete = (athlete: Athlete) => {
    setEditingAthlete(athlete)
    setShowForm(true)
  }

  const handleDeleteAthlete = (id: string) => {
    setAthletes(athletes.filter((a) => a.id !== id))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Manage Athletes</h1>
            <p className="text-muted-foreground mt-2">View and manage your team athletes</p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Athlete
            </Button>
          )}
        </div>

        {/* Form or Table */}
        {showForm ? (
          <AthleteForm
            athlete={editingAthlete}
            onSubmit={handleAddAthlete}
            onCancel={() => {
              setShowForm(false)
              setEditingAthlete(undefined)
            }}
          />
        ) : (
          <AthletesTable athletes={athletes} onEdit={handleEditAthlete} onDelete={handleDeleteAthlete} />
        )}
      </div>
    </DashboardLayout>
  )
}
