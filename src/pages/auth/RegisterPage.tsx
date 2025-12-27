import { AuthLayout } from "@/ui/components/layouts/AuthLayout";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout title="Buat Akun Decintan" subtitle="Daftar sebagai karyawan">
      <RegisterForm />
    </AuthLayout>
  );
}
