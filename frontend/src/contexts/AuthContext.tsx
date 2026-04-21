import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../utils/api";
import { getToken, setToken, clearToken } from "../utils/token";

type User = {
  id: string;
  email: string;
  tenant: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch current user
  const fetchMe = async () => {
    const token = getToken();

    if (!token) {
      setLoading(false); // ✅ FIX: stop loading if no token
      return;
    }

    try {
      const data = await api("/auth/me/", "GET", undefined, token);
      setUser(data);
    } catch (err) {
      console.error("fetchMe failed:", err);
      clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  // 🔹 Login
  const login = async (email: string, password: string) => {
    try {
      const data = await api("/auth/login/", "POST", { email, password });

      if (!data.access) {
        throw new Error("Invalid response from server");
      }

      setToken(data.access);
      await fetchMe();
    } catch (err: any) {
      console.error("Login error:", err);
      throw err; // ✅ propagate to UI
    }
  };

  // 🔹 Register
  const register = async (payload: any) => {
    try {
      await api("/auth/register/", "POST", payload);
    } catch (err: any) {
      console.error("Register error:", err);
      throw err; // ✅ propagate to UI
    }
  };

  // 🔹 Logout
  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 Hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext not found");
  return ctx;
};