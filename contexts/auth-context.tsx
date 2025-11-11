// "use client";

// import type React from "react";
// import { useRouter } from "next/navigation";
// import { createContext, useContext, useState, useEffect } from "react";
// import { authApi } from "@/lib/api-client";

// export interface User {
//   id: string;
//   email: string;
//   role: "athlete" | "coach" | "admin";
//   athlete?: {
//     id: string;
//     first_name: string;
//     last_name: string;
//     dob?: string;
//     gender?: string;
//     county?: string;
//     club?: string;
//     unique_athlete_id: string;
//     photo_url?: string;
//   };
// }

// interface AuthContextType {
//   user: User | null;
//   isLoading: boolean;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (data: {
//     email: string;
//     password: string;
//     first_name: string;
//     last_name: string;
//     dob?: string;
//     gender?: string;
//     county?: string;
//     club?: string;
//     photo_url?: string;
//   }) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   // Check if user is already logged in on mount
//   useEffect(() => {
//     const initializeAuth = async () => {
//       const token = localStorage.getItem("authToken");
//       if (token) {
//         try {
//           const profile = await authApi.getProfile();
//           setUser({
//             id: profile.user.id,
//             email: profile.user.email,
//             role: profile.user.role,
//             athlete: profile.athlete,
//           });
//         } catch (error) {
//           console.error("Failed to get profile:", error);
//           localStorage.removeItem("authToken");
//           localStorage.removeItem("userRole");
//         }
//       }
//       setIsLoading(false);
//     };

//     initializeAuth();
//   }, []);

//   const login = async (email: string, password: string) => {
//     const response = await authApi.login(email, password);
//     localStorage.setItem("authToken", response.token);
//     localStorage.setItem("userRole", response.role);
//     setUser({
//       id: response.id,
//       email: response.email,
//       role: response.role,
//     });
//   };

//   const register = async (data: {
//     email: string;
//     password: string;
//     first_name: string;
//     last_name: string;
//     dob?: string;
//     gender?: string;
//     county?: string;
//     club?: string;
//     photo_url?: string;
//   }) => {
//     try {
//       const response = await authApi.register(data);

//       // Save token and role
//       localStorage.setItem("authToken", response.token);
//       localStorage.setItem("userRole", "athlete");

//       // Set user state
//       setUser({
//         id: response.id,
//         email: response.email,
//         role: "athlete",
//         athlete: {
//           id: response.id,
//           first_name: data.first_name,
//           last_name: data.last_name,
//           dob: data.dob,
//           gender: data.gender,
//           county: data.county,
//           club: data.club,
//           unique_athlete_id: response.unique_athlete_id || "", // backend can return this if needed
//           photo_url: data.photo_url,
//         },
//       });
//     } catch (err: any) {
//       // Display backend message if available, fallback to generic
//       const message =
//         err.message ||
//         "Registration failed. Please try again or contact support.";
//       console.error("Register error:", message);
//       throw new Error(message); // re-throw so the UI can show it
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userRole");
//     setUser(null);
//     router.push("/"); // redirect to home
//   };
//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isLoading,
//         isAuthenticated: !!user,
//         login,
//         register,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return context;
// }

// context/auth-context.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  role: "admin" | "coach" | "athlete" | "medic"; // typed roles
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (email: string, password: string, role: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiClient("/auth/me"); // backend returns { user }
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const redirectByRole = (role: User["role"]) => {
    switch (role) {
      case "admin":
        router.push("/admin");
        break;
      case "coach":
        router.push("/coach");
        break;
      case "athlete":
        router.push("/athlete");
        break;
      default:
        router.push("/unauthorized");
    }
  };

  const register = async (email: string, password: string, role: string) => {
    const data = await apiClient("/auth/register", {
      method: "POST",
      body: { email, password, role },
    });
    setUser(data.user);
    redirectByRole(data.user.role);
  };

  const login = async (email: string, password: string) => {
    const data = await apiClient("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    setUser(data.user);
    redirectByRole(data.user.role);
  };

  const logout = async () => {
    await apiClient("/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
