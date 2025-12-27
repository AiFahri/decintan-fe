import type {
  LoginFormData,
  RegisterFormData,
  AuthFormErrors,
} from "../types/authTypes";

export const validateEmail = (email: string): string | undefined => {
  if (!email) {
    return "Email wajib diisi";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Format email tidak valid";
  }
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return "Password wajib diisi";
  }
  if (password.length < 6) {
    return "Password minimal 6 karakter";
  }
  return undefined;
};

export const validateLoginForm = (data: LoginFormData): AuthFormErrors => {
  const errors: AuthFormErrors = {};

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const validateRegisterForm = (
  data: RegisterFormData
): AuthFormErrors => {
  const errors: AuthFormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = "Nama lengkap wajib diisi";
  }

  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;

  if (!data.role) {
    errors.role = "Role wajib dipilih";
  }

  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;

  if (!data.confirmPassword) {
    errors.confirmPassword = "Konfirmasi password wajib diisi";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Password dan konfirmasi password tidak sama";
  }

  if (!data.agreeToTerms) {
    errors.agreeToTerms = "Anda harus menyetujui Syarat & Ketentuan";
  }

  return errors;
};
