import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { LoginFormData } from "../types/authTypes";
import { validateEmail, validatePassword } from "../utils/authValidators";
import { signIn } from "@/api/endpoints/auth";
import { useAuth } from "./useAuth";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/authTypes";
import { checkRateLimit, clearRateLimit } from "@/utils/security";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
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

    const rateLimit = checkRateLimit("login", 5, 60000);
    if (!rateLimit.allowed) {
      const waitSeconds = Math.ceil((rateLimit.resetAt - Date.now()) / 1000);
      setFormError(
        `Terlalu banyak percobaan login. Coba lagi dalam ${waitSeconds} detik.`,
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const { user } = await signIn(data.email, data.password);

      clearRateLimit("login");
      setUser(user);

      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (user.role === "karyawan") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      if (axiosError.response) {
        const status = axiosError.response.status;
        const errorMessage =
          axiosError.response.data?.message || axiosError.response.data?.error;

        if (status === 401) {
          setFormError(errorMessage || "Email atau password salah");
        } else if (status === 400) {
          setFormError(errorMessage || "Data tidak valid");
        } else if (status === 500) {
          setFormError("Terjadi kesalahan pada server");
        } else {
          setFormError(errorMessage || "Terjadi kesalahan saat login");
        }
      } else if (axiosError.request) {
        setFormError("Tidak dapat terhubung ke server");
      } else {
        setFormError("Terjadi kesalahan saat login. Silakan coba lagi.");
      }
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
