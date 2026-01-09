import { X } from "lucide-react";
import type { User } from "@/features/auth/types/authTypes";
import { Avatar } from "@/ui/components/Avatar";

interface ProfileDetailModalProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onEditClick: () => void;
}

export function ProfileDetailModal({
  isOpen,
  user,
  onClose,
  onEditClick,
}: ProfileDetailModalProps) {
  if (!isOpen) return null;

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
          <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Tutup modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-8">
          <div className="flex justify-center mb-6">
            <Avatar
              src={user.avatarUrl}
              alt={user.name}
              size="lg"
              className="h-32 w-32 rounded-full"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Jabatan
              </label>
              <p className="mt-1 text-base font-medium text-gray-900">
                {user.jabatan}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                Nama
              </label>
              <p className="mt-1 text-base font-medium text-gray-900">
                {user.name}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">
                E-mail
              </label>
              <p className="mt-1 text-base font-medium text-gray-900">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4">
          <button
            onClick={onEditClick}
            className="w-full rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
          >
            Edit profile
          </button>
        </div>
      </div>
    </div>
  );
}
