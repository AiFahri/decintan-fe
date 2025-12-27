import { useState } from "react";
import { useForm } from "react-hook-form";
import type { RegisterFormData, UserRole } from "../types/authTypes";
import { validateEmail, validatePassword } from "../utils/authValidators";

export const useRegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      role: "Karyawan" as UserRole,
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    mode: "onBlur",
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setFormError(null);

    // Simulasi API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log("Register data:", data);

      alert("Registrasi berhasil! (Dummy)");

    } catch {
      setFormError("Terjadi kesalahan saat registrasi. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fullNameRegister = register("fullName", {
    required: "Nama lengkap wajib diisi",
  });

  const emailRegister = register("email", {
    required: "Email wajib diisi",
    validate: (value) => validateEmail(value),
  });

  const roleRegister = register("role", {
    required: "Role wajib dipilih",
  });

  const passwordRegister = register("password", {
    required: "Password wajib diisi",
    validate: (value) => validatePassword(value),
  });

  const confirmPasswordRegister = register("confirmPassword", {
    required: "Konfirmasi password wajib diisi",
    validate: (value) => {
      if (value !== password) {
        return "Password dan konfirmasi password tidak sama";
      }
      return true;
    },
  });

  const agreeToTermsRegister = register("agreeToTerms", {
    required: "Anda harus menyetujui Syarat & Ketentuan",
  });

  return {
    register: {
      fullName: fullNameRegister,
      email: emailRegister,
      phone: register("phone"),
      role: roleRegister,
      password: passwordRegister,
      confirmPassword: confirmPasswordRegister,
      agreeToTerms: agreeToTermsRegister,
    },
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    formError,
    watch,
  };
};
