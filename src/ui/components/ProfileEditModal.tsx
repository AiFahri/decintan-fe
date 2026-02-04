import { X } from "lucide-react";
import { useState } from "react";
import type { User } from "@/features/auth/types/authTypes";
import { useFileUpload } from "@/hooks/useFileUpload";
import { sanitizeInput, validateFile } from "@/utils/security";

interface ProfileEditModalProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onSave: (updates: Partial<User>) => void;
}

export function ProfileEditModal({
  isOpen,
  user,
  onClose,
  onSave,
}: ProfileEditModalProps) {
  const [formData, setFormData] = useState({
    jabatan: user.jabatan,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl || "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    user.avatarUrl || null,
  );

  const { uploadFile, isUploading, uploadError } = useFileUpload();
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validation = validateFile(file, {
        maxSizeMB: 5,
        allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
      });

      if (!validation.isValid) {
        alert(validation.message);
        e.target.value = "";
        return;
      }

      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsSaving(true);

    try {
      const updates: Partial<User> = {
        jabatan: sanitizeInput(formData.jabatan),
        name: sanitizeInput(formData.name),
        email: formData.email.trim().toLowerCase(),
      };

      if (photoFile) {
        const publicUrl = await uploadFile(photoFile);
        updates.avatarUrl = publicUrl;
      }

      onSave(updates);
      onClose();
    } catch {
      alert(uploadError || "Gagal mengupdate profile. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

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
          <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
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
              Jabatan
            </label>
            <input
              type="text"
              value={formData.jabatan}
              onChange={(e) =>
                setFormData({ ...formData, jabatan: e.target.value })
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              disabled={isSaving || isUploading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              disabled={isSaving || isUploading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              disabled={isSaving || isUploading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto Profile
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => document.getElementById("photo-upload")?.click()}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSaving || isUploading}
              >
                Pilih Foto
              </button>
              <span className="text-sm text-gray-500">
                {photoFile ? photoFile.name : "Belum ada foto"}
              </span>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                disabled={isSaving || isUploading}
              />
            </div>

            {photoPreview && (
              <div className="mt-4 flex justify-center">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="h-32 w-32 rounded-full object-cover border-4 border-gray-200"
                />
              </div>
            )}

            {isUploading && (
              <p className="mt-2 text-sm text-blue-600 animate-pulse">
                📤 Mengupload foto...
              </p>
            )}

            {uploadError && (
              <p className="mt-2 text-sm text-red-600">❌ {uploadError}</p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          <button
            onClick={handleSubmit}
            className="w-full rounded-xl bg-[#2b3d9d] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSaving || isUploading}
          >
            {isSaving
              ? "Menyimpan..."
              : isUploading
                ? "Mengupload..."
                : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
