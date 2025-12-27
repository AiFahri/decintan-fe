import { X } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

interface InfoBannerProps {
  children: ReactNode;
  dismissible?: boolean;
}

export const InfoBanner = ({
  children,
  dismissible = true,
}: InfoBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start justify-between gap-4 mb-6">
      <div className="flex-1 text-sm text-blue-900">{children}</div>
      {dismissible && (
        <button
          onClick={() => setIsVisible(false)}
          className="shrink-0 text-blue-400 hover:text-blue-600 transition-colors p-1 rounded-lg hover:bg-blue-100"
          aria-label="Tutup banner"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
