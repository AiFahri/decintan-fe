import type { ReactNode } from "react";
import { Card } from "../Card";
import logoDecintan from "@/assets/logo_decintan.jpg";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-primary-50/30 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-200 rounded-full blur-3xl opacity-20 -z-10"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img
              src={logoDecintan}
              alt="Decintan Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg shadow-md"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-gray-600">{subtitle}</p>
          )}
        </div>
        <Card padding="lg" className="shadow-xl">
          {children}
        </Card>
      </div>
    </div>
  );
};
