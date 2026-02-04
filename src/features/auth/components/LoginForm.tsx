import { Link } from "react-router-dom";
import { Input } from "@/ui/components/Input";
import { Button } from "@/ui/components/Button";
import { Checkbox } from "@/ui/components/Checkbox";
import { useLoginForm } from "../hooks/useLoginForm";

export const LoginForm = () => {
  const { register, handleSubmit, errors, isSubmitting, formError } =
    useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {formError && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{formError}</p>
        </div>
      )}

      <Input
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="karyawan@perusahaan.com"
        error={errors.email?.message}
        {...register.email}
      />

      <Input
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="Masukkan password Anda"
        error={errors.password?.message}
        {...register.password}
      />

      <div className="flex items-center justify-between">
        <Checkbox label="Ingat saya" {...register.rememberMe} />
        <Link
          to="#"
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Lupa password?
        </Link>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isSubmitting}
      >
        Masuk
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="font-medium text-primary-600 hover:text-primary-700"
          >
            Daftar
          </Link>
        </p>
      </div>
    </form>
  );
};
