import { EmployeeSidebar } from "../EmployeeSidebar";
import { Topbar } from "../Topbar";
import { useSidebar } from "@/features/dashboard/hooks/useSidebar";
import type { ReactNode } from "react";

interface EmployeeDashboardLayoutProps {
  children: ReactNode;
  breadcrumbs?: string[];
}

export const EmployeeDashboardLayout = ({
  children,
  breadcrumbs = ["Aplikasi", "Dashboard"],
}: EmployeeDashboardLayoutProps) => {
  const { isMobileOpen, openMobileSidebar, closeMobileSidebar } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50">
      <EmployeeSidebar
        isMobileOpen={isMobileOpen}
        onCloseMobile={closeMobileSidebar}
      />

      <div className="transition-all duration-300 ease-in-out lg:ml-64">
        <Topbar breadcrumbs={breadcrumbs} onMenuClick={openMobileSidebar} />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};
