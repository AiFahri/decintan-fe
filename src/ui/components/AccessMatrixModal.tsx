import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  getAllUsersPermissions,
  updateUserPermission,
  type UserPermission,
} from "@/data/access.mock";

interface AccessMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  changesCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmationModal({
  isOpen,
  changesCount,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="bg-primary-600 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">
            Konfirmasi Perubahan
          </h3>
        </div>
        <div className="px-6 py-6">
          <p className="text-sm text-gray-700">
            Anda telah mengubah{" "}
            <span className="font-semibold">{changesCount} permission</span>.
            Apakah Anda yakin ingin menyimpan perubahan ini?
          </p>
        </div>
        <div className="flex gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}

const purchasingFeatures = [
  { key: "satuan", label: "Satuan" },
  { key: "proyek1", label: "Proyek" },
  { key: "proyek2", label: "Proyek" },
  { key: "stok", label: "Stok" },
  { key: "pemesanan", label: "Pemesanan" },
  { key: "barangKeluar", label: "Barang Keluar" },
  { key: "persetujuang", label: "Persetujuang" },
  { key: "permintaanAset", label: "Permintaan Aset" },
] as const;

export function AccessMatrixModal({ isOpen, onClose }: AccessMatrixModalProps) {
  const [showInfoBanner, setShowInfoBanner] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [, setRefreshKey] = useState(0);

  // Track changes
  const [pendingChanges, setPendingChanges] = useState<
    Array<{
      userId: string;
      feature: keyof UserPermission["permissions"]["purchasing"];
      oldValue: boolean;
      newValue: boolean;
    }>
  >([]);

  const usersPerPage = 10; // Increased for better scrolling

  if (!isOpen) return null;

  const users = getAllUsersPermissions();

  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = currentPage * usersPerPage;
  const visibleUsers = users.slice(startIndex, startIndex + usersPerPage);

  const handlePermissionToggle = (
    userId: string,
    feature: keyof UserPermission["permissions"]["purchasing"]
  ) => {
    const user = users.find((u) => u.userId === userId);
    if (!user) return;

    const oldValue = user.permissions.purchasing[feature];
    const newValue = !oldValue;

    // Track change
    const existingChangeIndex = pendingChanges.findIndex(
      (c) => c.userId === userId && c.feature === feature
    );

    if (existingChangeIndex >= 0) {
      // If already changed, check if reverting to original
      const existingChange = pendingChanges[existingChangeIndex];
      if (existingChange.oldValue === newValue) {
        // Reverting to original - remove from pending changes
        setPendingChanges((prev) =>
          prev.filter((_, i) => i !== existingChangeIndex)
        );
      } else {
        // Update the change
        setPendingChanges((prev) =>
          prev.map((c, i) =>
            i === existingChangeIndex ? { ...c, newValue } : c
          )
        );
      }
    } else {
      // New change
      setPendingChanges((prev) => [
        ...prev,
        { userId, feature, oldValue, newValue },
      ]);
    }

    // Update permission temporarily
    updateUserPermission(userId, "purchasing", feature, newValue);
    setRefreshKey((prev) => prev + 1);
  };

  const handleSaveChanges = () => {
    if (pendingChanges.length === 0) {
      onClose();
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmSave = () => {
    // Changes are already applied
    setPendingChanges([]);
    setShowConfirmation(false);
    onClose();
  };

  const handleCancelSave = () => {
    setShowConfirmation(false);
  };

  const handleModalClose = () => {
    if (pendingChanges.length > 0) {
      // Revert all changes
      pendingChanges.forEach((change) => {
        updateUserPermission(
          change.userId,
          "purchasing",
          change.feature,
          change.oldValue
        );
      });
      setPendingChanges([]);
    }
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-6xl h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col">
          <div className="flex items-center justify-between bg-primary-600 px-6 py-4 shrink-0">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-white">
                Pengaturan Akses
              </h3>
              {pendingChanges.length > 0 && (
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                  {pendingChanges.length} perubahan
                </span>
              )}
            </div>
            <button
              onClick={handleModalClose}
              className="rounded-lg p-2 text-white/80 transition-colors hover:bg-primary-700 hover:text-white"
              aria-label="Tutup modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {showInfoBanner && (
            <div className="relative bg-primary-600 px-6 py-3 text-white shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  <span className="font-semibold">Info Terbaru</span> Dari
                  perusahaan
                </span>
                <button
                  onClick={() => setShowInfoBanner(false)}
                  className="rounded p-1 transition-colors hover:bg-primary-700"
                  aria-label="Tutup info"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-auto px-6 py-6">
            <div className="min-w-[800px]">
              <div className="mb-4">
                <div className="flex items-center border-b border-gray-200 pb-2">
                  <div className="w-48 shrink-0" />
                  <div className="flex-1 text-center">
                    <span className="text-sm font-semibold text-gray-700">
                      Purchasing
                    </span>
                  </div>
                </div>

                <div className="flex items-center border-b border-gray-200 py-2">
                  <div className="w-48 shrink-0" />
                  <div className="flex flex-1 gap-4">
                    {purchasingFeatures.map((feature) => (
                      <div
                        key={feature.key}
                        className="w-24 shrink-0 text-center"
                      >
                        <span className="text-xs font-medium text-gray-600">
                          {feature.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {visibleUsers.map((user) => (
                  <div
                    key={user.userId}
                    className="flex items-center border-b border-gray-100 py-3 hover:bg-gray-50"
                  >
                    <div className="w-48 shrink-0">
                      <p className="text-sm font-medium text-gray-900">
                        {user.userName}
                      </p>
                    </div>

                    <div className="flex flex-1 gap-4">
                      {purchasingFeatures.map((feature) => (
                        <div
                          key={feature.key}
                          className="w-24 shrink-0 flex justify-center"
                        >
                          <input
                            type="checkbox"
                            checked={
                              user.permissions.purchasing[
                                feature.key as keyof typeof user.permissions.purchasing
                              ]
                            }
                            onChange={() =>
                              handlePermissionToggle(
                                user.userId,
                                feature.key as keyof UserPermission["permissions"]["purchasing"]
                              )
                            }
                            className="h-5 w-5 cursor-pointer rounded border-gray-300 text-primary-600 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-4 shrink-0">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>
                  Menampilkan {startIndex + 1}-
                  {Math.min(startIndex + usersPerPage, users.length)} dari{" "}
                  {users.length} karyawan
                </span>
                {totalPages > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(0, prev - 1))
                      }
                      disabled={currentPage === 0}
                      className="rounded p-1 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="px-2 text-xs">
                      {currentPage + 1}/{totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(totalPages - 1, prev + 1)
                        )
                      }
                      disabled={currentPage === totalPages - 1}
                      className="rounded p-1 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleSaveChanges}
                className="rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={pendingChanges.length === 0}
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        changesCount={pendingChanges.length}
        onConfirm={handleConfirmSave}
        onCancel={handleCancelSave}
      />
    </>
  );
}
