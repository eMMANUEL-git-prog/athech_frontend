"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Award,
  Clock,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import PartnersSection from "@/components/partners";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        const role = localStorage.getItem("userRole");
        switch (role) {
          case "athlete":
            router.push("/athlete/dashboard");
            break;
          case "coach":
            router.push("/coach/dashboard");
            break;
          case "admin":
            router.push("/admin/dashboard");
            break;
          default:
            router.push("/login");
        }
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section with Background Image */}
        <section className="relative h-screen md:h-[600px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(/hero.jpeg?height=600&width=1200&query=athlete+training+outdoor)",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>

          <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-red-500 mb-2 uppercase tracking-wider">
                ATHLETE PERFORMANCE PLATFORM
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Unlock Your Athletic Potential
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-xl">
                Track performance, manage injuries, optimize nutrition, and
                connect with coaches. Everything athletes need to excel in one
                platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 w-full sm:w-auto"
                  >
                    Get Started Free
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 w-full sm:w-auto bg-transparent"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Stats Section */}
        <section className="bg-black text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "50K+", label: "Active Athletes" },
                { number: "500+", label: "Coaches Worldwide" },
                { number: "98%", label: "Success Rate" },
                { number: "24/7", label: "Support Available" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-green-500 mb-2">
                    {stat.number}
                  </p>
                  <p className="text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Designed for athletes, coaches, and organizations to work together
              seamlessly
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-red-500 transition-colors">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-red-600 w-6 h-6" />
              </div>
              <h3 className="font-bold text-black text-lg mb-2">
                Performance Tracking
              </h3>
              <p className="text-gray-600">
                Monitor strength, endurance, and progress with detailed
                analytics and charts
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-red-500 transition-colors">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Target className="text-red-600 w-6 h-6" />
              </div>
              <h3 className="font-bold text-black text-lg mb-2">
                Injury Management
              </h3>
              <p className="text-gray-600">
                Track injuries, recovery plans, and rehabilitation progress in
                real-time
              </p>
            </div>

            {/* Feature 3 */}
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 transition-colors">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="text-green-600 w-6 h-6" />
              </div>
              <h3 className="font-bold text-black text-lg mb-2">
                Nutrition Planning
              </h3>
              <p className="text-gray-600">
                Log meals and track nutrition data aligned with your fitness
                goals
              </p>
            </div>

            {/* Feature 4 */}
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 transition-colors">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-green-600 w-6 h-6" />
              </div>
              <h3 className="font-bold text-black text-lg mb-2">
                Team Collaboration
              </h3>
              <p className="text-gray-600">
                Connect with coaches and teammates for coordinated training and
                support
              </p>
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-black text-center mb-16">
              Why Choose ATHECH?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Award,
                  title: "Award-Winning Platform",
                  description:
                    "Trusted by elite athletes and professional teams globally",
                },
                {
                  icon: Clock,
                  title: "Real-Time Updates",
                  description:
                    "Get instant notifications on performance metrics and alerts",
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description:
                    "Optimized performance ensures smooth experience always",
                },
              ].map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="bg-white rounded-xl p-8 border border-gray-200"
                  >
                    <IconComponent className="w-8 h-8 text-red-600 mb-4" />
                    <h3 className="text-xl font-bold text-black mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <PartnersSection />

        {/* CTA Section */}
        <section className="bg-green-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Transform Your Game?
            </h2>
            <p className="text-lg text-red-100 mb-8">
              Join thousands of athletes and coaches worldwide using ATHECH to
              reach their goals
            </p>
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-gray-400 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="text-white font-bold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/features" className="hover:text-white">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:text-white">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Follow</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-white">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center">
              <p>&copy; 2025 ATHECH. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return null;
}
