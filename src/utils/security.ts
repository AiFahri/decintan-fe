/**
 * Environment-based logger
 * Only logs in development, silent in production
 */
export const logger = {
  log: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.log(...args);
    }
  },
  error: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.error(...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.warn(...args);
    }
  },
  debug: (...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.debug(...args);
    }
  },
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePasswordStrength = (
  password: string,
): {
  isValid: boolean;
  message: string;
} => {
  if (password.length < 8) {
    return {
      isValid: false,
      message: "Password minimal 8 karakter",
    };
  }

  if (!/\d/.test(password)) {
    return {
      isValid: false,
      message: "Password harus mengandung minimal 1 angka",
    };
  }

  if (!/[a-zA-Z]/.test(password)) {
    return {
      isValid: false,
      message: "Password harus mengandung minimal 1 huruf",
    };
  }

  return {
    isValid: true,
    message: "Password valid",
  };
};

export const validateFile = (
  file: File,
  options: {
    maxSizeMB?: number;
    allowedTypes?: string[];
  } = {},
): { isValid: boolean; message: string } => {
  const {
    maxSizeMB = 5,
    allowedTypes = ["image/jpeg", "image/png", "image/jpg"],
  } = options;

  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > maxSizeMB) {
    return {
      isValid: false,
      message: `Ukuran file maksimal ${maxSizeMB}MB`,
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      message: `Tipe file tidak didukung. Hanya ${allowedTypes.join(", ")}`,
    };
  }

  return {
    isValid: true,
    message: "File valid",
  };
};

export const maskSensitiveData = (data: string, visibleChars = 4): string => {
  if (data.length <= visibleChars * 2) {
    return "****";
  }

  const start = data.slice(0, visibleChars);
  const end = data.slice(-visibleChars);
  const masked = "*".repeat(Math.min(data.length - visibleChars * 2, 10));

  return `${start}${masked}${end}`;
};

/**
 * Rate limiter for preventing brute force attacks
 * Usage: const canProceed = checkRateLimit("login", 5, 60000); // 5 attempts per minute
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export const checkRateLimit = (
  key: string,
  maxAttempts: number,
  windowMs: number,
): { allowed: boolean; remainingAttempts: number; resetAt: number } => {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remainingAttempts: maxAttempts - 1,
      resetAt: now + windowMs,
    };
  }

  record.count += 1;

  if (record.count > maxAttempts) {
    return { allowed: false, remainingAttempts: 0, resetAt: record.resetAt };
  }

  return {
    allowed: true,
    remainingAttempts: maxAttempts - record.count,
    resetAt: record.resetAt,
  };
};

export const clearRateLimit = (key: string): void => {
  rateLimitStore.delete(key);
};
