export type UserRole = "karyawan" | "admin";

export type ApiUserRole = "Admin" | "Employee";

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  role: ApiUserRole;
  position?: string;
  photo_url?: string;
}

export interface SignInResponse {
  payload: {
    token: string;
    user: ApiUser;
  };
}

export interface SelfSessionResponse {
  payload: ApiUser;
}

export interface ApiErrorResponse {
  message?: string;
  error?: string;
}

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
