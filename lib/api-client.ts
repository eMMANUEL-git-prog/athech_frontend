// lib/api-client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
}

async function safeJsonFetch<T>(url: string, options: RequestInit): Promise<T> {
  try {
    const res = await fetch(url, options);
    const text = await res.text();

    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      console.error("Failed to parse JSON from response:", text);
      throw new Error(`Invalid JSON from ${url}`);
    }

    // If HTTP error, throw with backend message
    if (!res.ok) {
      const message =
        data?.message || `API request failed with status ${res.status}`;
      throw new Error(message);
    }

    return data as T;
  } catch (err: any) {
    console.error("Network or API error:", err);
    throw new Error(err.message || `Failed to fetch ${url}`);
  }
}

export const apiClient = {
  async request<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<T> {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    return safeJsonFetch<T>(`${API_BASE_URL}${endpoint}`, {
      method: options.method || "GET",
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  },

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "GET" });
  },
  post<T>(endpoint: string, body?: any) {
    return this.request<T>(endpoint, { method: "POST", body });
  },
  put<T>(endpoint: string, body?: any) {
    return this.request<T>(endpoint, { method: "PUT", body });
  },
  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "DELETE" });
  },
};

// ====================== AUTH ======================
export const authApi = {
  register: (data: any) =>
    apiClient.post("/api/auth/register", { ...data, role: "athlete" }),
  login: (email: string, password: string) =>
    apiClient.post("/api/auth/login", { email, password }),
  getProfile: () => apiClient.get("/api/auth/profile"),
};

// ====================== ATHLETE ======================
export const athletesApi = {
  list: () => apiClient.get("/api/athletes"),
  get: (id: string) => apiClient.get(`/api/athletes/${id}`),
  getDashboard: (id: string) =>
    apiClient.get(`/api/admin/athletes/${id}/dashboard`),
};

// ====================== PERFORMANCE ======================
export const performanceApi = {
  list: () => apiClient.get("/api/performances"),
  create: (data: any) => apiClient.post("/api/performances", data),
  update: (id: string, data: any) =>
    apiClient.put(`/api/performances/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/performances/${id}`),

  adminList: () => apiClient.get("/api/admin/performances"),
  adminCreate: (athleteId: string, data: any) =>
    apiClient.post(`/api/admin/performances/${athleteId}`, data),
  adminUpdate: (id: string, data: any) =>
    apiClient.put(`/api/admin/performances/${id}`, data),
  adminDelete: (id: string) =>
    apiClient.delete(`/api/admin/performances/${id}`),
};

// ====================== INJURIES ======================
export const injuryApi = {
  list: () => apiClient.get("/api/injuries"),
  create: (data: any) => apiClient.post("/api/injuries", data),
  update: (id: string, data: any) => apiClient.put(`/api/injuries/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/injuries/${id}`),

  adminList: () => apiClient.get("/api/admin/injuries"),
  adminCreate: (athleteId: string, data: any) =>
    apiClient.post(`/api/admin/injuries/${athleteId}`, data),
  adminUpdate: (id: string, data: any) =>
    apiClient.put(`/api/admin/injuries/${id}`, data),
  adminDelete: (id: string) => apiClient.delete(`/api/admin/injuries/${id}`),
};

// ====================== NUTRITION ======================
export const nutritionApi = {
  list: () => apiClient.get("/api/nutrition"),
  create: (data: any) => apiClient.post("/api/nutrition", data),
  update: (id: string, data: any) =>
    apiClient.put(`/api/nutrition/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/nutrition/${id}`),

  adminList: () => apiClient.get("/api/admin/nutrition"),
  adminCreate: (athleteId: string, data: any) =>
    apiClient.post(`/api/admin/nutrition/${athleteId}`, data),
  adminUpdate: (id: string, data: any) =>
    apiClient.put(`/api/admin/nutrition/${id}`, data),
  adminDelete: (id: string) => apiClient.delete(`/api/admin/nutrition/${id}`),
};

// ====================== COACH ======================
export const coachApi = {
  getAthletes: () => apiClient.get("/api/coach/athletes"),
  getAthlete: (id: string) => apiClient.get(`/api/coach/athletes/${id}`),

  addPerformance: (athleteId: string, data: any) =>
    apiClient.post(`/api/coach/performances/${athleteId}`, data),
  addInjury: (athleteId: string, data: any) =>
    apiClient.post(`/api/coach/injuries/${athleteId}`, data),
  addNutrition: (athleteId: string, data: any) =>
    apiClient.post(`/api/coach/nutrition/${athleteId}`, data),
};

// ====================== ADMIN ======================
export const adminApi = {
  listAthletes: () => apiClient.get("/api/admin/athletes"),
  getAthleteDashboard: (athleteId: string) =>
    apiClient.get(`/api/admin/athletes/${athleteId}/dashboard`),
  deleteAthlete: (athleteId: string) =>
    apiClient.delete(`/api/admin/athletes/${athleteId}`),
  updateAthlete: (athleteId: string, data: any) =>
    apiClient.put(`/api/admin/athletes/${athleteId}`, data),
};

// ====================== GEMINI AI ======================
export const aiApi = {
  chat: (prompt: string) => apiClient.post("/api/ai/chat", { prompt }),
  download: (fileName: string) => apiClient.get(`/api/ai/download/${fileName}`),
};
