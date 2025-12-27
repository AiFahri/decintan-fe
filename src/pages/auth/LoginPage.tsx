import { AuthLayout } from "@/ui/components/layouts/AuthLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout title="Masuk ke Akun Anda" subtitle="Sistem Decintan">
      <LoginForm />
    </AuthLayout>
  );
}
