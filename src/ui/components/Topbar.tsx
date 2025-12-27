import { Search, Bell, Menu } from "lucide-react";
import { Avatar } from "./Avatar";

interface TopbarProps {
  breadcrumbs: string[];
  onMenuClick: () => void;
}

export const Topbar = ({ breadcrumbs, onMenuClick }: TopbarProps) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 lg:px-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Buka menu"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-400">&gt;</span>}
              <span
                className={
                  index === breadcrumbs.length - 1
                    ? "text-gray-900 font-medium"
                    : ""
                }
              >
                {crumb}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-64">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="pencarian..."
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-500 focus:outline-none"
          />
        </div>

        <button
          className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Notifikasi"
        >
          <Bell className="w-5 h-5 text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <Avatar src="https://i.pravatar.cc/150?img=10" alt="Admin" size="md" />
      </div>
    </header>
  );
};
