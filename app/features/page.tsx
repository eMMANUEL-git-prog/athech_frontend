"use client";

import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Target,
  Users,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react";

export default function Features() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold text-black mb-6">Features</h1>
        <p className="text-xl text-gray-600 mb-12">
          Comprehensive tools designed to help athletes, coaches, and teams
          succeed
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {[
            {
              icon: TrendingUp,
              title: "Performance Analytics",
              description:
                "Track your progress with detailed metrics, charts, and insights. Monitor strength gains, endurance improvements, and overall athletic development.",
            },
            {
              icon: Target,
              title: "Injury Management",
              description:
                "Manage injuries and recovery plans effectively. Track rehabilitation progress and stay informed about your recovery timeline.",
            },
            {
              icon: BarChart3,
              title: "Nutrition Tracking",
              description:
                "Log your meals and monitor nutrition data. Ensure you're fueling your body correctly to support your athletic goals.",
            },
            {
              icon: Users,
              title: "Team Collaboration",
              description:
                "Connect with coaches, trainers, and teammates. Share goals, collaborate on training plans, and support each other.",
            },
            {
              icon: Award,
              title: "Goal Setting",
              description:
                "Set SMART goals and track progress towards them. Get motivation and accountability from your team.",
            },
            {
              icon: Clock,
              title: "Schedule Management",
              description:
                "Organize training sessions, competitions, and recovery days. Never miss an important event or training.",
            },
          ].map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div key={feature.title} className="flex gap-6">
                <div className="flex-shrink-0">
                  <IconComponent className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to get started?
          </h2>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Start Free Trial
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
