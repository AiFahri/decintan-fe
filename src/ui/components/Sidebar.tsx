import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  ShoppingCart,
  Mail,
  Wallet,
  TrendingUp,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import logoDecintan from "@/assets/logo_decintan.jpg";

interface MenuItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Absensi", path: "/admin/absensi", icon: CalendarCheck },
  { label: "Purchasing", path: "/admin/purchasing", icon: ShoppingCart },
  { label: "Surat", path: "/admin/surat", icon: Mail },
  { label: "Keuangan", path: "/admin/keuangan", icon: Wallet },
  { label: "Progres", path: "/admin/progres", icon: TrendingUp },
  { label: "Gaji", path: "/admin/gaji", icon: DollarSign },
];

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
}

export const Sidebar = ({
  isCollapsed,
  isMobileOpen,
  onToggleCollapse,
  onCloseMobile,
}: SidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full bg-[#2b3d9d] text-white z-50
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-64"}
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#1f2d73]">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <img
                src={logoDecintan}
                alt="Decintan Logo"
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="font-bold text-lg">DECINTAN</span>
            </div>
          )}
          {isCollapsed && (
            <img
              src={logoDecintan}
              alt="Decintan Logo"
              className="w-8 h-8 rounded-lg object-cover mx-auto"
            />
          )}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Tutup sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-3 py-3 rounded-xl
                      transition-all duration-200
                      ${
                        active
                          ? "bg-white text-[#2b3d9d] shadow-lg"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }
                      ${isCollapsed ? "justify-center" : ""}
                    `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {!isCollapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block p-4 border-t border-[#1f2d73]">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            aria-label={isCollapsed ? "Perbesar sidebar" : "Perkecil sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Perkecil</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
