import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { api } from "../utils/api";

import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "../utils/token";

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

export const AuthProvider = ({
  children,
}: any) => {
  const [user, setUser] = useState<User | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  // 🔹 Refresh token flow
  const refreshAccessToken = async () => {
    const refresh = getRefreshToken();

    if (!refresh) {
      logout();
      return null;
    }

    try {
      const data = await api(
        "/auth/refresh/",
        "POST",
        {
          refresh,
        }
      );

      localStorage.setItem(
        "access",
        data.access
      );

      return data.access;
    } catch {
      logout();
      return null;
    }
  };

  // 🔹 Fetch current user
  const fetchMe = async () => {
    let token = getAccessToken();

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data = await api(
        "/auth/me/",
        "GET",
        undefined,
        token
      );

      setUser(data);
    } catch {
      // 🔥 Try refreshing token
      const newAccess =
        await refreshAccessToken();

      if (!newAccess) {
        setLoading(false);
        return;
      }

      try {
        const data = await api(
          "/auth/me/",
          "GET",
          undefined,
          newAccess
        );

        setUser(data);
      } catch {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  // 🔹 Login
  const login = async (
    email: string,
    password: string
  ) => {
    const data = await api(
      "/auth/login/",
      "POST",
      {
        email,
        password,
      }
    );

    setTokens(
      data.access,
      data.refresh
    );

    await fetchMe();
  };

  // 🔹 Register
  const register = async (
    payload: any
  ) => {
    await api(
      "/auth/register/",
      "POST",
      payload
    );
  };

  // 🔹 Logout
  const logout = () => {
    clearTokens();
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

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "AuthContext not found"
    );
  }

  return ctx;
};