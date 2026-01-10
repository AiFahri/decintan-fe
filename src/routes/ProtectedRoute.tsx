import { Navigate } from "react-router-dom";
import { getCurrentUser } from "@/data/auth.mock";
import type { UserRole } from "@/features/auth/types/authTypes";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectTo = "/login",
}: ProtectedRouteProps) => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    if (currentUser.role === "karyawan") {
      return <Navigate to="/dashboard" replace />;
    }
    if (currentUser.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
