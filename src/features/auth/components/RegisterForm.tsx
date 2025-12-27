import { Link } from "react-router-dom";
import { Input } from "@/ui/components/Input";
import { Button } from "@/ui/components/Button";
import { Checkbox } from "@/ui/components/Checkbox";
import { useRegisterForm } from "../hooks/useRegisterForm";

export const RegisterForm = () => {
  const { register, handleSubmit, errors, isSubmitting, formError } =
    useRegisterForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {formError && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{formError}</p>
        </div>
      )}

      <Input
        label="Nama Lengkap"
        type="text"
        placeholder="Masukkan nama lengkap Anda"
        error={errors.fullName?.message}
        {...register.fullName}
      />

      <Input
        label="Email"
        type="email"
        placeholder="karyawan@perusahaan.com"
        error={errors.email?.message}
        {...register.email}
      />

      <Input
        label="Nomor Telepon"
        type="tel"
        placeholder="081234567890"
        error={errors.phone?.message}
        {...register.phone}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Role
        </label>
        <select
          {...register.role}
          className={`
            w-full px-4 py-3 rounded-lg border transition-colors
            focus:outline-none focus:ring-2 focus:ring-offset-1
            ${
              errors.role
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary-500 focus:ring-primary-500"
            }
          `}
        >
          <option value="Karyawan">Karyawan</option>
          <option value="Admin HR">Admin HR</option>
        </select>
        {errors.role && (
          <p className="mt-1.5 text-sm text-red-600">{errors.role.message}</p>
        )}
      </div>

      <Input
        label="Password"
        type="password"
        placeholder="Minimal 6 karakter"
        error={errors.password?.message}
        {...register.password}
      />

      <Input
        label="Konfirmasi Password"
        type="password"
        placeholder="Ulangi password Anda"
        error={errors.confirmPassword?.message}
        {...register.confirmPassword}
      />

      <Checkbox
        label="Saya menyetujui Syarat & Ketentuan"
        error={errors.agreeToTerms?.message}
        {...register.agreeToTerms}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isSubmitting}
      >
        Daftar
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:text-primary-700"
          >
            Masuk
          </Link>
        </p>
      </div>
    </form>
  );
};
