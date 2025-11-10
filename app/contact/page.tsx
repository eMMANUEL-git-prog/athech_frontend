"use client";

import type React from "react";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    alert("Thank you for your message. We'll get back to you soon!");
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold text-black mb-6">Contact Us</h1>
        <p className="text-xl text-gray-600 mb-12">
          Have questions? We'd love to hear from you. Send us a message.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-black font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 text-black focus:outline-none focus:border-red-600"
                required
              />
            </div>
            <div>
              <label className="block text-black font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 text-black focus:outline-none focus:border-red-600"
                required
              />
            </div>
            <div>
              <label className="block text-black font-medium mb-2">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 text-black focus:outline-none focus:border-red-600 h-32"
                required
              ></textarea>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white w-full">
              Send Message
            </Button>
          </form>

          <div className="space-y-8">
            <div className="flex gap-4">
              <Mail className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-black mb-1">Email</h3>
                <p className="text-gray-600">support@athech.com</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-black mb-1">Phone</h3>
                <p className="text-gray-600">+254 795 198 141</p>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-black mb-1">Office</h3>
                <p className="text-gray-600">
                  123 Athlete Street, Eldoret City, SC 12345
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
