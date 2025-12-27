import type { ButtonHTMLAttributes, ReactNode, ComponentProps } from "react";
import { Link } from "react-router-dom";

interface BaseButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  className?: string;
}

interface ButtonAsButton
  extends BaseButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  as?: "button";
  to?: never;
}

interface ButtonAsLink
  extends BaseButtonProps,
    Omit<ComponentProps<typeof Link>, "to" | "children"> {
  as: "link";
  to: string;
  disabled?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center";

  const variantStyles = {
    primary:
      "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    outline:
      "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`;

  if (props.as === "link" && "to" in props) {
    const { as, to, ...linkProps } = props;
    return (
      <Link to={to} className={combinedClassName} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { disabled, ...buttonProps } = props as ButtonAsButton;
  return (
    <button
      className={combinedClassName}
      disabled={disabled || isLoading}
      {...buttonProps}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Memproses...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
