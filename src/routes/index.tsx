import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OnboardingPage from "@/pages/Onboarding/OnboardingPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AbsensiPage from "@/pages/admin/AbsensiPage";
import { PlaceholderPage } from "@/pages/admin/PlaceholderPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/absensi" element={<AbsensiPage />} />
        <Route
          path="/admin/purchasing"
          element={
            <PlaceholderPage
              title="Purchasing"
              breadcrumbs={["Aplikasi", "Purchasing"]}
            />
          }
        />
        <Route
          path="/admin/surat"
          element={
            <PlaceholderPage
              title="Surat"
              breadcrumbs={["Aplikasi", "Surat"]}
            />
          }
        />
        <Route
          path="/admin/keuangan"
          element={
            <PlaceholderPage
              title="Keuangan"
              breadcrumbs={["Aplikasi", "Keuangan"]}
            />
          }
        />
        <Route
          path="/admin/progres"
          element={
            <PlaceholderPage
              title="Progres"
              breadcrumbs={["Aplikasi", "Progres"]}
            />
          }
        />
        <Route
          path="/admin/gaji"
          element={
            <PlaceholderPage title="Gaji" breadcrumbs={["Aplikasi", "Gaji"]} />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
