import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = "", ...props }, ref) => {
    const checkboxId = props.id || `checkbox-${props.name || "default"}`;
    const hasError = !!error;

    return (
      <div className="w-full">
        <div className="flex items-start">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={`
              mt-1 h-4 w-4 rounded border-gray-300 text-primary-600
              focus:ring-primary-500 focus:ring-2
              ${hasError ? "border-red-300" : ""}
              ${className}
            `}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className="ml-2 text-sm text-gray-700 cursor-pointer"
            >
              {label}
            </label>
          )}
        </div>
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
