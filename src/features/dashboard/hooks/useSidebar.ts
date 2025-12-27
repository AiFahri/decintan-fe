import { useState } from "react";

interface UseSidebarReturn {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isMobileOpen: boolean;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}

export const useSidebar = (): UseSidebarReturn => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  const openMobileSidebar = () => setIsMobileOpen(true);
  const closeMobileSidebar = () => setIsMobileOpen(false);

  return {
    isCollapsed,
    toggleCollapse,
    isMobileOpen,
    openMobileSidebar,
    closeMobileSidebar,
  };
};
