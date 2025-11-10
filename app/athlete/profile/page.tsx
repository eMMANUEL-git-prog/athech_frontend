"use client";

import type React from "react";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.athlete?.first_name || "",
    last_name: user?.athlete?.last_name || "",
    dob: user?.athlete?.dob || "",
    gender: user?.athlete?.gender || "",
    county: user?.athlete?.county || "",
    club: user?.athlete?.club || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Call API to update profile
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsEditing(false);
        // Optionally refresh user data here
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-6">
        {/* Profile Header */}
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your athlete profile information
          </p>
        </div>

        {/* Profile Information */}
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                Edit Profile
              </Button>
            )}
          </div>

          <div className="space-y-6">
            {/* Email (Read-only) */}
            <div>
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
                className="mt-2"
              />
            </div>

            {/* Athlete ID (Read-only) */}
            <div>
              <Label htmlFor="athlete-id" className="text-base">
                Athlete ID
              </Label>
              <Input
                id="athlete-id"
                value={user?.athlete?.unique_athlete_id || ""}
                disabled
                className="mt-2"
              />
            </div>

            {/* First Name */}
            <div>
              <Label htmlFor="first_name" className="text-base">
                First Name
              </Label>
              <Input
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-2"
              />
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="last_name" className="text-base">
                Last Name
              </Label>
              <Input
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-2"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <Label htmlFor="dob" className="text-base">
                Date of Birth
              </Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-2"
              />
            </div>

            {/* Gender */}
            <div>
              <Label htmlFor="gender" className="text-base">
                Gender
              </Label>
              <Input
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-2"
              />
            </div>

            {/* County */}
            <div>
              <Label htmlFor="county" className="text-base">
                County
              </Label>
              <Input
                id="county"
                name="county"
                value={formData.county}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-2"
              />
            </div>

            {/* Club */}
            <div>
              <Label htmlFor="club" className="text-base">
                Club
              </Label>
              <Input
                id="club"
                name="club"
                value={formData.club}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-2"
              />
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave}>Save Changes</Button>
                <Button onClick={() => setIsEditing(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
