import { useState } from "react";
import { Camera } from "lucide-react";
import { CameraCaptureModal } from "@/ui/components/CameraCaptureModal";
import { SuccessModal } from "@/ui/components/SuccessModal";
import { projectsMock, fieldRequestsMock } from "@/data/purchasing.mock";

interface ItemProposal {
  tanggal: string;
  satuan: string;
  namaProyek: string;
  namaBarang: string;
  foto?: string;
  // estimatedQty: number;
  // estimatedPrice: number;
  // purpose: string;
  // justification: string;
}

export function PengajuanTab() {
  const [formData, setFormData] = useState<ItemProposal>({
    tanggal: new Date().toISOString().split("T")[0],
    satuan: "",
    namaProyek: "",
    namaBarang: "",
  });

  const [showCamera, setShowCamera] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleCameraCapture = (imageBase64: string) => {
    setFormData({ ...formData, foto: imageBase64 });
    setShowCamera(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.tanggal) {
      setError("Tanggal harus diisi");
      return;
    }
    if (!formData.satuan.trim()) {
      setError("Satuan harus diisi");
      return;
    }
    if (!formData.namaProyek) {
      setError("Nama proyek harus dipilih");
      return;
    }
    if (!formData.namaBarang.trim()) {
      setError("Nama barang harus diisi");
      return;
    }
    if (!formData.foto) {
      setError("Foto harus diambil");
      return;
    }

    const newRequest = {
      id: `freq-${Date.now()}`,
      employeeId: "user-current", // TODO: get from auth context
      employeeName: "Current User", // TODO: get from auth context
      date: formData.tanggal,
      unit: formData.satuan,
      projectName: formData.namaProyek,
      itemName: formData.namaBarang,
      photoUrl: formData.foto,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };

    // Push to shared mock data (visible in Barang Keluar > Daftar Pengajuan)
    fieldRequestsMock.push(newRequest);
    console.log("Field Request Submitted:", newRequest);

    setShowSuccess(true);

    setFormData({
      tanggal: new Date().toISOString().split("T")[0],
      satuan: "",
      namaProyek: "",
      namaBarang: "",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">
        Pengajuan Pembelian Barang Baru
      </h2>

      <p className="text-sm text-white">
        Form pengajuan untuk pembelian barang baru yang belum ada dalam stok.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Tanggal <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.tanggal}
            onChange={(e) =>
              setFormData({ ...formData, tanggal: e.target.value })
            }
            className="w-full px-4 py-3 text-black bg-white  border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Satuan <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.satuan}
            onChange={(e) =>
              setFormData({ ...formData, satuan: e.target.value })
            }
            placeholder="Pcs, Kg, Unit, dll..."
            className="w-full px-4 py-3 text-black bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Nama Proyek <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.namaProyek}
            onChange={(e) =>
              setFormData({ ...formData, namaProyek: e.target.value })
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
            Nama Barang <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.namaBarang}
            onChange={(e) =>
              setFormData({ ...formData, namaBarang: e.target.value })
            }
            placeholder="Nama barang yang diajukan..."
            className="w-full px-4 py-3 text-black bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Foto <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowCamera(true)}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
            >
              <Camera className="w-5 h-5" />
              {formData.foto ? "Ganti Foto" : "Ambil Foto"}
            </button>
            {formData.foto && (
              <span className="text-sm text-green-400 font-medium">
                ✓ Foto sudah diambil
              </span>
            )}
          </div>
          {formData.foto && (
            <div className="mt-4">
              <img
                src={formData.foto}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-xl border-2 border-gray-200"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors"
          >
            Kirim Pengajuan
          </button>
        </div>
      </form>

      <CameraCaptureModal
        isOpen={showCamera}
        title="Foto Referensi Barang"
        onCapture={handleCameraCapture}
        onClose={() => setShowCamera(false)}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        title="Berhasil!"
        message="Pengajuan pembelian barang berhasil dikirim dan menunggu persetujuan"
        onClose={() => setShowSuccess(false)}
        autoCloseDuration={2500}
      />
    </div>
  );
}
