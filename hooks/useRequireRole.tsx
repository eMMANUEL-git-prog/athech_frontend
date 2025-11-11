"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

/**
 * Custom hook to restrict access based on user roles.
 * @param roles Array of allowed roles (e.g., ["admin", "coach"])
 */
export function useRequireRole(
  roles: ("admin" | "coach" | "athlete" | "medic")[]
) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not logged in → redirect to login
        router.push("/login");
      } else if (!roles.includes(user.role)) {
        // Logged in but role mismatch → redirect to unauthorized
        router.push("/unauthorized");
      }
    }
  }, [user, loading, roles, router]);

  return { user, loading };
}
