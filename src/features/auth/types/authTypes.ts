export type UserRole = "karyawan" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  jabatan: string;
  avatarUrl?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export type AuthFormErrors = {
  [key: string]: string | undefined;
};
