import { Sidebar } from "../Sidebar";
import { Topbar } from "../Topbar";
import { useSidebar } from "@/features/dashboard/hooks/useSidebar";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  breadcrumbs?: string[];
}

export const DashboardLayout = ({
  children,
  breadcrumbs = ["Aplikasi", "Dashboard"],
}: DashboardLayoutProps) => {
  const {
    isCollapsed,
    toggleCollapse,
    isMobileOpen,
    openMobileSidebar,
    closeMobileSidebar,
  } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onToggleCollapse={toggleCollapse}
        onCloseMobile={closeMobileSidebar}
      />

      <div
        className={`
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "lg:ml-20" : "lg:ml-64"}
        `}
      >
        <Topbar breadcrumbs={breadcrumbs} onMenuClick={openMobileSidebar} />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};
