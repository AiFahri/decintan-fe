export type UserRole = 'Karyawan' | 'Admin HR';

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

