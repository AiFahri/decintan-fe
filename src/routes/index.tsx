import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OnboardingPage from "@/pages/Onboarding/OnboardingPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AbsensiPage from "@/pages/admin/AbsensiPage";
import { PlaceholderPage } from "@/pages/admin/PlaceholderPage";
import EmployeeDashboardPage from "@/pages/employee/EmployeeDashboardPage";
import EmployeeAttendancePage from "@/pages/employee/EmployeeAttendancePage";
import OvertimeFormPage from "@/pages/employee/OvertimeFormPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PurchasingPage } from "@/pages/admin/PurchasingPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Employee Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["karyawan"]}>
              <EmployeeDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/absensi"
          element={
            <ProtectedRoute allowedRoles={["karyawan"]}>
              <EmployeeAttendancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/absensi/lembur"
          element={
            <ProtectedRoute allowedRoles={["karyawan"]}>
              <OvertimeFormPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/absensi"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AbsensiPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/purchasing"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <PurchasingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/surat"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <PlaceholderPage
                title="Surat"
                breadcrumbs={["Aplikasi", "Surat"]}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/keuangan"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <PlaceholderPage
                title="Keuangan"
                breadcrumbs={["Aplikasi", "Keuangan"]}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/progres"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <PlaceholderPage
                title="Progres"
                breadcrumbs={["Aplikasi", "Progres"]}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/gaji"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <PlaceholderPage
                title="Gaji"
                breadcrumbs={["Aplikasi", "Gaji"]}
              />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
