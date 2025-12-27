import type { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export const H1 = ({ children, className = "" }: TypographyProps) => {
  return (
    <h1 className={`text-3xl sm:text-4xl font-bold text-gray-900 ${className}`}>
      {children}
    </h1>
  );
};

export const H2 = ({ children, className = "" }: TypographyProps) => {
  return (
    <h2
      className={`text-2xl sm:text-3xl font-semibold text-gray-900 ${className}`}
    >
      {children}
    </h2>
  );
};

export const H3 = ({ children, className = "" }: TypographyProps) => {
  return (
    <h3
      className={`text-xl sm:text-2xl font-semibold text-gray-800 ${className}`}
    >
      {children}
    </h3>
  );
};

export const Body = ({ children, className = "" }: TypographyProps) => {
  return <p className={`text-base text-gray-700 ${className}`}>{children}</p>;
};

export const Caption = ({ children, className = "" }: TypographyProps) => {
  return <p className={`text-sm text-gray-600 ${className}`}>{children}</p>;
};
