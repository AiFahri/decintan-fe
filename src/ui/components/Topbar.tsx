import {
  Search,
  Bell,
  Menu,
  History,
  Settings,
  User,
  Lock,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Avatar } from "./Avatar";
import { updateProfile, changePassword } from "@/api/endpoints/auth";
import { ProfileDetailModal } from "./ProfileDetailModal";
import { ProfileEditModal } from "./ProfileEditModal";
import { ChangePasswordModal } from "./ChangePasswordModal";
import { HistoryModal } from "./HistoryModal";
import { UserActivityDetailModal } from "./UserActivityDetailModal";
import { AccessMatrixModal } from "./AccessMatrixModal";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { User as UserType } from "@/features/auth/types/authTypes";

const extractKeyFromUrl = (urlOrKey: string): string => {
  if (!urlOrKey.startsWith("http")) {
    return urlOrKey;
  }

  const match = urlOrKey.match(/\/s3\/decintan\/(.+)$/);
  if (match && match[1]) {
    return match[1];
  }

  return urlOrKey;
};

interface TopbarProps {
  breadcrumbs: string[];
  onMenuClick: () => void;
}

export const Topbar = ({ breadcrumbs, onMenuClick }: TopbarProps) => {
  const { user: currentUser, logout, updateUser } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalState, setModalState] = useState<{
    profileDetail: boolean;
    profileEdit: boolean;
    changePassword: boolean;
    history: boolean;
    userActivityDetail: boolean;
    accessMatrix: boolean;
  }>({
    profileDetail: false,
    profileEdit: false,
    changePassword: false,
    history: false,
    userActivityDetail: false,
    accessMatrix: false,
  });

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileUpdate = async (updates: Partial<UserType>) => {
    try {
      let photoKey = "";

      if (updates.avatarUrl && !updates.avatarUrl.includes("pravatar.cc")) {
        photoKey = extractKeyFromUrl(updates.avatarUrl);
      } else if (
        currentUser?.avatarUrl &&
        !currentUser.avatarUrl.includes("pravatar.cc")
      ) {
        photoKey = extractKeyFromUrl(currentUser.avatarUrl);
      }

      if (!photoKey) {
        const shouldContinue = confirm(
          "⚠️ Anda belum memiliki foto profil. Backend memerlukan foto profil untuk update.\n\n" +
            "Silakan upload foto terlebih dahulu di modal Edit Profile.\n\n" +
            "Tetap lanjutkan tanpa foto? (Mungkin akan error)",
        );

        if (!shouldContinue) {
          return;
        }
      }

      const payload = {
        name: updates.name || currentUser?.name || "",
        email: updates.email || currentUser?.email || "",
        position: updates.jabatan || currentUser?.jabatan || "",
        photo_url: photoKey,
      };

      const updated = await updateProfile(payload);
      updateUser(updated);

      alert("✅ Profile berhasil diupdate");
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes("404")) {
        alert(
          "❌ Error 404: Photo file not found.\n\nBackend tidak dapat menemukan foto di server. Silakan upload foto baru.",
        );
      } else if (err instanceof Error && err.message.includes("400")) {
        alert(
          "❌ Error 400: Data tidak valid.\n\nPastikan semua field terisi dengan benar.",
        );
      } else {
        alert("Gagal memperbarui profile. Silakan coba lagi.");
      }
    }
  };

  const handlePasswordChange = async (newPassword: string) => {
    try {
      await changePassword(newPassword, newPassword);
      alert("✅ Password berhasil diubah");
    } catch {
      alert("Gagal mengubah password. Silakan coba lagi.");
    }
  };

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      logout();
    }
  };

  if (!currentUser) {
    return null;
  }

  const isAdmin = currentUser.role === "admin";

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 px-4 lg:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Buka menu"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-gray-400">&gt;</span>}
                <span
                  className={
                    index === breadcrumbs.length - 1
                      ? "text-gray-900 font-medium"
                      : ""
                  }
                >
                  {crumb}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-64">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="pencarian..."
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-500 focus:outline-none"
            />
          </div>

          {isAdmin && (
            <>
              <button
                onClick={() => setModalState({ ...modalState, history: true })}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="History"
                title="History"
              >
                <History className="w-5 h-5 text-gray-700" />
              </button>

              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Settings"
                title="Settings"
                onClick={() =>
                  setModalState({
                    ...modalState,
                    profileDetail: false,
                    profileEdit: false,
                    changePassword: false,
                    history: false,
                    userActivityDetail: false,
                    accessMatrix: true,
                  })
                }
              >
                <Settings className="w-5 h-5 text-gray-700" />
              </button>
            </>
          )}

          <button
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Notifikasi"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Avatar
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                size="md"
              />
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-white shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={() => {
                    setModalState({ ...modalState, profileDetail: true });
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => {
                    setModalState({ ...modalState, changePassword: true });
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  <span>Ubah password</span>
                </button>

                <div className="h-px bg-gray-200 my-2" />

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <ProfileDetailModal
        isOpen={modalState.profileDetail}
        user={currentUser}
        onClose={() => setModalState({ ...modalState, profileDetail: false })}
        onEditClick={() =>
          setModalState({
            ...modalState,
            profileDetail: false,
            profileEdit: true,
            changePassword: false,
          })
        }
      />

      <ProfileEditModal
        isOpen={modalState.profileEdit}
        user={currentUser}
        onClose={() => setModalState({ ...modalState, profileEdit: false })}
        onSave={handleProfileUpdate}
      />

      <ChangePasswordModal
        isOpen={modalState.changePassword}
        onClose={() => setModalState({ ...modalState, changePassword: false })}
        onSave={handlePasswordChange}
      />

      <HistoryModal
        isOpen={modalState.history}
        onClose={() => setModalState({ ...modalState, history: false })}
        onUserClick={(userId) => {
          setSelectedUserId(userId);
          setModalState({
            ...modalState,
            history: false,
            userActivityDetail: true,
          });
        }}
      />

      <UserActivityDetailModal
        isOpen={modalState.userActivityDetail}
        userId={selectedUserId}
        onClose={() =>
          setModalState({ ...modalState, userActivityDetail: false })
        }
        onBack={() =>
          setModalState({
            ...modalState,
            userActivityDetail: false,
            history: true,
          })
        }
      />

      <AccessMatrixModal
        isOpen={modalState.accessMatrix}
        onClose={() => setModalState({ ...modalState, accessMatrix: false })}
      />
    </>
  );
};
