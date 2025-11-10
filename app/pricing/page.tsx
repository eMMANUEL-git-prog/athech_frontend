"use client";

import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            Choose the plan that works best for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Free",
              price: "Ksh. 0",
              description: "Get started with basic features",
              features: [
                "Basic performance tracking",
                "Up to 5 workouts per month",
                "Mobile app access",
                "Community access",
              ],
            },
            {
              name: "Pro",
              price: "Ksh. 1,900",
              description: "For serious athletes",
              features: [
                "Advanced analytics",
                "Unlimited workouts",
                "Nutrition tracking",
                "Injury management",
                "Priority support",
                "Custom reports",
              ],
              highlighted: true,
            },
            {
              name: "Teams",
              price: "Ksh.9,900",
              description: "For coaches and teams",
              features: [
                "Manage up to 50 athletes",
                "Team performance analytics",
                "Training program builder",
                "Unlimited reports",
                "24/7 dedicated support",
                "Custom integrations",
              ],
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-8 border-2 ${
                plan.highlighted
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              {plan.highlighted && (
                <p className="text-green-600 font-bold text-sm mb-4">
                  MOST POPULAR
                </p>
              )}
              <h3 className="text-2xl font-bold text-black mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <p className="text-4xl font-bold text-black mb-2">{plan.price}</p>
              <p className="text-gray-600 mb-8">/month</p>
              <Link href="/register">
                <Button
                  size="lg"
                  className={`w-full mb-8 ${
                    plan.highlighted
                      ? "bg-green-600 hover:bg-green-700"
                      : "border-black text-black hover:bg-gray-50"
                  }`}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </Link>
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-red-600" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
