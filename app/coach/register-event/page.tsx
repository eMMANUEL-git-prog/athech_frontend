"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function RegisterEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you could send the event to your backend if needed
    console.log("Event data:", formData);

    // Redirect to payments page with event info
    router.push(`/payments?event=${encodeURIComponent(formData.name)}`);
  };

  return (
    <div className="min-h-[calc(100vh-73px)] p-6 bg-gray-50 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4">Register New Event</h1>

        <div>
          <label className="block mb-1 font-medium">Event Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>

        <Button
          type="submit"
          className="bg-green-500 text-white hover:bg-green-600"
        >
          Proceed to Payment
        </Button>
      </form>
    </div>
  );
}
