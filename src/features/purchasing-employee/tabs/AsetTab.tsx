import { useState } from "react";
import { Camera, CheckCircle, XCircle } from "lucide-react";
import { CameraCaptureModal } from "@/ui/components/CameraCaptureModal";
import { SuccessModal } from "@/ui/components/SuccessModal";
import { projectsMock, assetLoansMock } from "@/data/purchasing.mock";

type AssetSubTab = "meminjam" | "pengembalian" | "penyesuaian";

interface LoanForm {
  tanggal: string;
  projectId: string;
  itemName: string;
  qty: number;
  unit: string;
  picName: string;
  note: string;
}

export function AsetTab() {
  const [activeSubTab, setActiveSubTab] = useState<AssetSubTab>("meminjam");

  // Meminjam state
  const [loanForm, setLoanForm] = useState<LoanForm>({
    tanggal: new Date().toISOString().split("T")[0],
    projectId: "",
    itemName: "",
    qty: 0,
    unit: "",
    picName: "",
    note: "",
  });

  // Penyesuaian state
  const [selectedLoanForAdjustment, setSelectedLoanForAdjustment] = useState<
    string | null
  >(null);
  const [missingQty, setMissingQty] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const [missingEvidencePhoto, setMissingEvidencePhoto] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const borrowedAssets = assetLoansMock.filter(
    (loan) => loan.status === "borrowed",
  );
  const returnedAssets = assetLoansMock.filter(
    (loan) => loan.status === "returned",
  );

  const handleLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!loanForm.projectId) {
      setError("Pilih proyek terlebih dahulu");
      return;
    }
    if (!loanForm.itemName.trim()) {
      setError("Nama barang harus diisi");
      return;
    }
    if (loanForm.qty <= 0) {
      setError("Qty harus lebih dari 0");
      return;
    }
    if (!loanForm.unit.trim()) {
      setError("Satuan harus diisi");
      return;
    }
    if (!loanForm.picName.trim()) {
      setError("Nama PIC harus diisi");
      return;
    }

    // Get project name
    const projectName =
      projectsMock.find((p) => p.id === loanForm.projectId)?.name || "";

    // Add to mock
    assetLoansMock.push({
      id: `loan-${assetLoansMock.length + 1}`,
      loanDate: new Date().toISOString().split("T")[0],
      picName: loanForm.picName,
      projectName,
      itemName: loanForm.itemName,
      qty: loanForm.qty,
      unit: loanForm.unit,
      status: "borrowed",
      note: loanForm.note || undefined,
      createdAt: new Date().toISOString(),
    });

    // Show success
    setShowSuccess(true);

    // Reset form
    setLoanForm({
      tanggal: new Date().toISOString().split("T")[0],
      projectId: "",
      itemName: "",
      qty: 0,
      unit: "",
      picName: "",
      note: "",
    });
  };

  const handleReturn = (loanId: string) => {
    const loan = assetLoansMock.find((l) => l.id === loanId);
    if (loan) {
      loan.status = "returned";
      loan.returnDate = new Date().toISOString().split("T")[0];
      setShowSuccess(true);
    }
  };

  const handleCameraCapture = (imageBase64: string) => {
    setMissingEvidencePhoto(imageBase64);
    setShowCamera(false);
  };

  const handleAdjustmentSubmit = (loanId: string) => {
    setError("");

    if (missingQty <= 0) {
      setError("Qty hilang harus lebih dari 0");
      return;
    }
    if (!missingEvidencePhoto) {
      setError("Foto bukti harus diambil");
      return;
    }

    const loan = assetLoansMock.find((l) => l.id === loanId);
    if (loan) {
      loan.missingQty = missingQty;
      loan.missingEvidenceUrl = missingEvidencePhoto;
      setShowSuccess(true);

      // Reset
      setSelectedLoanForAdjustment(null);
      setMissingQty(0);
      setMissingEvidencePhoto("");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">
        Manajemen Peminjaman Aset
      </h2>

      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveSubTab("meminjam")}
          className={`px-6 py-3 font-medium transition-colors ${
            activeSubTab === "meminjam"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-white hover:text-blue-200"
          }`}
        >
          Meminjam
        </button>
        <button
          onClick={() => setActiveSubTab("pengembalian")}
          className={`px-6 py-3 font-medium transition-colors ${
            activeSubTab === "pengembalian"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-white  hover:text-blue-200"
          }`}
        >
          Pengembalian
        </button>
        <button
          onClick={() => setActiveSubTab("penyesuaian")}
          className={`px-6 py-3 font-medium transition-colors ${
            activeSubTab === "penyesuaian"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-white  hover:text-blue-200"
          }`}
        >
          Penyesuaian
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {activeSubTab === "meminjam" && (
        <form onSubmit={handleLoanSubmit} className="space-y-4">
          <p className="text-sm text-white">
            Form peminjaman aset/barang untuk proyek tertentu.
          </p>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Tanggal <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={loanForm.tanggal}
              onChange={(e) =>
                setLoanForm({ ...loanForm, tanggal: e.target.value })
              }
              className="w-full px-4 py-3 text-black bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Proyek <span className="text-red-500">*</span>
              </label>
              <select
                value={loanForm.projectId}
                onChange={(e) =>
                  setLoanForm({ ...loanForm, projectId: e.target.value })
                }
                className="w-full px-4 py-3 text-black bg-white  border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Pilih Proyek</option>
                {projectsMock.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Nama PIC <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={loanForm.picName}
                onChange={(e) =>
                  setLoanForm({ ...loanForm, picName: e.target.value })
                }
                placeholder="Nama penanggung jawab..."
                className="w-full px-4 py-3 border text-black bg-white  border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Nama Barang <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={loanForm.itemName}
              onChange={(e) =>
                setLoanForm({ ...loanForm, itemName: e.target.value })
              }
              placeholder="Nama aset/barang..."
              className="w-full px-4 py-3 text-black bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Qty <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={loanForm.qty || ""}
                onChange={(e) =>
                  setLoanForm({
                    ...loanForm,
                    qty: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-3 text-black bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Satuan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={loanForm.unit}
                onChange={(e) =>
                  setLoanForm({ ...loanForm, unit: e.target.value })
                }
                placeholder="Pcs, Unit, dll..."
                className="w-full px-4 py-3 text-black bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Catatan
            </label>
            <textarea
              value={loanForm.note}
              onChange={(e) =>
                setLoanForm({ ...loanForm, note: e.target.value })
              }
              placeholder="Keterangan tambahan..."
              rows={3}
              className="w-full px-4 py-3 border text-black bg-white  border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors"
            >
              Ajukan Peminjaman
            </button>
          </div>
        </form>
      )}

      {activeSubTab === "pengembalian" && (
        <div className="space-y-4">
          <p className="text-sm text-white">
            Daftar aset yang sedang dipinjam. Klik tombol untuk mengembalikan.
          </p>

          <div className="overflow-x-auto bg-white rounded-xl p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border">
                    No
                  </th>
                  <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border">
                    Tgl Pinjam
                  </th>
                  <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border">
                    PIC
                  </th>
                  <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border">
                    Proyek
                  </th>
                  <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border">
                    Barang
                  </th>
                  <th className="px-3 py-3 text-right text-sm font-semibold text-gray-700 border">
                    Qty
                  </th>
                  <th className="px-3 py-3 text-center text-sm font-semibold text-gray-700 border">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {borrowedAssets.map((loan, index) => (
                  <tr key={loan.id} className="hover:bg-gray-50">
                    <td className="px-3 py-3 text-sm text-gray-900 border">
                      {index + 1}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-900 border">
                      {loan.loanDate}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-900 border">
                      {loan.picName}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-900 border">
                      {loan.projectName}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-900 border">
                      {loan.itemName}
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-900 border text-right">
                      {loan.qty} {loan.unit}
                    </td>
                    <td className="px-3 py-3 border text-center">
                      <button
                        onClick={() => handleReturn(loan.id)}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Kembalikan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {borrowedAssets.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                Tidak ada aset yang sedang dipinjam
              </p>
            </div>
          )}
        </div>
      )}

      {activeSubTab === "penyesuaian" && (
        <div className="space-y-4">
          <p className="text-sm text-white">
            Laporkan aset yang hilang/rusak dengan bukti foto. Pilih aset yang
            sudah dikembalikan.
          </p>

          <div className="overflow-x-auto bg-white rounded-xl p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border">
                    No
                  </th>
                  <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border">
                    Tgl Kembali
                  </th>
                  <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border">
                    PIC
                  </th>
                  <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border">
                    Barang
                  </th>
                  <th className="px-3 py-3 text-right text-sm font-semibold text-gray-700 border">
                    Qty Pinjam
                  </th>
                  <th className="px-3 py-3 text-center text-sm font-semibold text-gray-700 border">
                    Status
                  </th>
                  <th className="px-3 py-3 text-center text-sm font-semibold text-gray-700 border">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {returnedAssets.map((loan, index) => {
                  const isAdjusting = selectedLoanForAdjustment === loan.id;
                  const hasAdjustment = loan.missingQty && loan.missingQty > 0;

                  return (
                    <tr key={loan.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 text-sm text-gray-900 border">
                        {index + 1}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border">
                        {loan.returnDate || "-"}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border">
                        {loan.picName}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border">
                        {loan.itemName}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-900 border text-right">
                        {loan.qty} {loan.unit}
                      </td>
                      <td className="px-3 py-3 border text-center">
                        {hasAdjustment ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                            <XCircle className="w-3 h-3" />
                            Hilang: {loan.missingQty}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            Lengkap
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3 border text-center">
                        {!hasAdjustment && !isAdjusting && (
                          <button
                            onClick={() =>
                              setSelectedLoanForAdjustment(loan.id)
                            }
                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            Lapor Hilang
                          </button>
                        )}
                        {isAdjusting && (
                          <div className="space-y-2">
                            <input
                              type="number"
                              value={missingQty || ""}
                              onChange={(e) =>
                                setMissingQty(parseFloat(e.target.value) || 0)
                              }
                              placeholder="Qty hilang..."
                              className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              min="0"
                            />
                            <div className="flex gap-2 justify-center">
                              <button
                                type="button"
                                onClick={() => setShowCamera(true)}
                                className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                              >
                                <Camera className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAdjustmentSubmit(loan.id)}
                                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded"
                              >
                                Submit
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedLoanForAdjustment(null);
                                  setMissingQty(0);
                                  setMissingEvidencePhoto("");
                                }}
                                className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-xs rounded"
                              >
                                Batal
                              </button>
                            </div>
                            {missingEvidencePhoto && (
                              <span className="text-xs text-green-600">
                                ✓ Foto OK
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {returnedAssets.length === 0 && (
            <div className="text-center py-12">
              <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada aset yang dikembalikan</p>
            </div>
          )}
        </div>
      )}

      <CameraCaptureModal
        isOpen={showCamera}
        title="Foto Bukti Barang Hilang"
        onCapture={handleCameraCapture}
        onClose={() => setShowCamera(false)}
      />

      <SuccessModal
        isOpen={showSuccess}
        title="Berhasil!"
        message={
          activeSubTab === "meminjam"
            ? "Pengajuan peminjaman berhasil"
            : activeSubTab === "pengembalian"
              ? "Aset berhasil dikembalikan"
              : "Laporan penyesuaian berhasil disimpan"
        }
        onClose={() => setShowSuccess(false)}
        autoCloseDuration={2000}
      />
    </div>
  );
}
