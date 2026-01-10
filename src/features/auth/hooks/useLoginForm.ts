import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { LoginFormData } from "../types/authTypes";
import { validateEmail, validatePassword } from "../utils/authValidators";
import { mockLogin } from "@/data/auth.mock";

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

      // Mock login with role-based redirect
      const user = mockLogin(data.email, data.password);

      if (!user) {
        setFormError("Email atau password salah");
        return;
      }

      console.log("Login success:", user);

      // Role-based redirect
      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (user.role === "karyawan") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
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
