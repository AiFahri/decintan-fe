import { createContext, useState, useEffect, type ReactNode } from "react";
import { selfSession, signOut } from "@/api/endpoints/auth";
import type { User } from "@/features/auth/types/authTypes";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("decintan_token");

      if (!token) {
        setIsInitializing(false);
        return;
      }

      try {
        const userData = await selfSession();
        setUser(userData);
      } catch {
        localStorage.removeItem("decintan_token");
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  const logout = () => {
    signOut();
    setUser(null);
    window.location.href = "/login";
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      return { ...prev, ...updates } as User;
    });
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isInitializing,
    setUser,
    updateUser,
    logout,
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2b3d9d] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
