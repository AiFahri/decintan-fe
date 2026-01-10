import { X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newPassword: string) => void;
}

export function ChangePasswordModal({
  isOpen,
  onClose,
  onSave,
}: ChangePasswordModalProps) {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {
      newPassword: "",
      confirmPassword: "",
    };

    if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password minimal 6 karakter";
    }

    if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }

    setErrors(newErrors);
    return !newErrors.newPassword && !newErrors.confirmPassword;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData.newPassword);
      setFormData({ newPassword: "", confirmPassword: "" });
      onClose();
    }
  };

  const isFormValid =
    formData.newPassword.length >= 6 &&
    formData.confirmPassword === formData.newPassword;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">Ubah Password</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Tutup modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Baru
            </label>
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => {
                  setFormData({ ...formData, newPassword: e.target.value });
                  setErrors({ ...errors, newPassword: "" });
                }}
                className={`w-full rounded-xl border ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                } px-4 py-2.5 pr-10 text-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                placeholder="Masukkan password baru"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({ ...showPassword, new: !showPassword.new })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword.new ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verifikasi Password Baru
            </label>
            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  });
                  setErrors({ ...errors, confirmPassword: "" });
                }}
                className={`w-full rounded-xl border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } px-4 py-2.5 pr-10 text-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                placeholder="Ketik ulang password baru"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    confirm: !showPassword.confirm,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword.confirm ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`w-full rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-colors ${
              isFormValid
                ? "bg-[#2b3d9d] hover:bg-primary-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
