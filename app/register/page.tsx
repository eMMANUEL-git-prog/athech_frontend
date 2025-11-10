"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [county, setCounty] = useState("");
  const [club, setClub] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      await register({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        dob: dob || undefined,
        gender: gender || undefined,
        county: county || undefined,
        club: club || undefined,
      });
      router.push("/athlete/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white pt-24 pb-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-black mb-2">
              Create Athlete Account
            </h1>
            <p className="text-gray-600">
              Join ATHECH and start tracking your performance
            </p>
          </div>

          <Card className="bg-white border-2 border-gray-200">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border-2 border-red-600 rounded-lg p-3 flex gap-2 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-black">
                      First Name
                    </label>
                    <Input
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="bg-white border-2 border-gray-200 text-black placeholder:text-gray-500 focus:border-red-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-black">
                      Last Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="bg-white border-2 border-gray-200 text-black placeholder:text-gray-500 focus:border-red-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white border-2 border-gray-200 text-black placeholder:text-gray-500 focus:border-red-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-black">
                      Date of Birth
                    </label>
                    <Input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="bg-white border-2 border-gray-200 text-black focus:border-red-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-black">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-3 py-2 bg-white border-2 border-gray-200 text-black rounded-md focus:border-red-600"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-black">
                      County
                    </label>
                    <Input
                      type="text"
                      placeholder="Your county"
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                      className="bg-white border-2 border-gray-200 text-black placeholder:text-gray-500 focus:border-red-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-black">
                      Club
                    </label>
                    <Input
                      type="text"
                      placeholder="Your club"
                      value={club}
                      onChange={(e) => setClub(e.target.value)}
                      className="bg-white border-2 border-gray-200 text-black placeholder:text-gray-500 focus:border-red-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white border-2 border-gray-200 text-black placeholder:text-gray-500 focus:border-red-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-black">
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-white border-2 border-gray-200 text-black placeholder:text-gray-500 focus:border-red-600"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center text-gray-600">
                <p>
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-green-600 hover:text-green-700 font-semibold"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
