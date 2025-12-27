import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { LoginFormData } from "../types/authTypes";
import { validateEmail, validatePassword } from "../utils/authValidators";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setFormError(null);

    // Simulasi API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      console.log("Login data:", data);

      navigate("/admin/dashboard", { replace: true });
    } catch {
      setFormError("Terjadi kesalahan saat login. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const emailRegister = register("email", {
    required: "Email wajib diisi",
    validate: (value) => validateEmail(value),
  });

  const passwordRegister = register("password", {
    required: "Password wajib diisi",
    validate: (value) => validatePassword(value),
  });

  return {
    register: {
      email: emailRegister,
      password: passwordRegister,
      rememberMe: register("rememberMe"),
    },
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    formError,
  };
};
