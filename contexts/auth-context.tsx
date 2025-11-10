"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "@/lib/api-client";

export interface User {
  id: string;
  email: string;
  role: "athlete" | "coach" | "admin";
  athlete?: {
    id: string;
    first_name: string;
    last_name: string;
    dob?: string;
    gender?: string;
    county?: string;
    club?: string;
    unique_athlete_id: string;
    photo_url?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    dob?: string;
    gender?: string;
    county?: string;
    club?: string;
    photo_url?: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is already logged in on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const profile = await authApi.getProfile();
          setUser({
            id: profile.user.id,
            email: profile.user.email,
            role: profile.user.role,
            athlete: profile.athlete,
          });
        } catch (error) {
          console.error("Failed to get profile:", error);
          localStorage.removeItem("authToken");
          localStorage.removeItem("userRole");
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    localStorage.setItem("authToken", response.token);
    localStorage.setItem("userRole", response.role);
    setUser({
      id: response.id,
      email: response.email,
      role: response.role,
    });
  };

  const register = async (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    dob?: string;
    gender?: string;
    county?: string;
    club?: string;
    photo_url?: string;
  }) => {
    const response = await authApi.register(data);
    localStorage.setItem("authToken", response.token);
    localStorage.setItem("userRole", "athlete");
    setUser({
      id: response.id,
      email: response.email,
      role: "athlete",
      athlete: {
        id: response.id,
        first_name: data.first_name,
        last_name: data.last_name,
        dob: data.dob,
        gender: data.gender,
        county: data.county,
        club: data.club,
        unique_athlete_id: "",
        photo_url: data.photo_url,
      },
    });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setUser(null);
    router.push("/"); // redirect to home
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
