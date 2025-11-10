"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface Athlete {
  id: string
  name: string
  email: string
  sport: string
  team: string
  joinDate: string
}

interface AthleteFormProps {
  athlete?: Athlete
  onSubmit: (athlete: Omit<Athlete, "id"> & { id?: string }) => void
  onCancel: () => void
}

export function AthleteForm({ athlete, onSubmit, onCancel }: AthleteFormProps) {
  const [formData, setFormData] = useState({
    name: athlete?.name || "",
    email: athlete?.email || "",
    sport: athlete?.sport || "",
    team: athlete?.team || "",
    joinDate: athlete?.joinDate || new Date().toISOString().split("T")[0],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      id: athlete?.id,
      ...formData,
    })
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{athlete ? "Edit Athlete" : "Add Athlete"}</h2>
        <button onClick={onCancel} className="p-1 hover:bg-muted rounded-lg transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Smith"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="athlete@example.com"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Sport</label>
            <Input
              type="text"
              value={formData.sport}
              onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
              placeholder="Basketball"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Team</label>
            <Input
              type="text"
              value={formData.team}
              onChange={(e) => setFormData({ ...formData, team: e.target.value })}
              placeholder="Team A"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Join Date</label>
          <Input
            type="date"
            value={formData.joinDate}
            onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
            required
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1">
            {athlete ? "Update Athlete" : "Add Athlete"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
