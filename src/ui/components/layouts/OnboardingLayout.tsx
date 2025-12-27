import type { ReactNode } from "react";

interface OnboardingLayoutProps {
  children: ReactNode;
}

export const OnboardingLayout = ({ children }: OnboardingLayoutProps) => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {children}
    </div>
  );
};
