import { useState } from "react";
import { SuccessModal } from "@/ui/components/SuccessModal";
import { suppliersMock } from "@/data/purchasing.mock";

export function SupplierTab() {
  const [supplierName, setSupplierName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!supplierName.trim()) {
      setError("Nama supplier harus diisi");
      return;
    }
    if (!phone.trim()) {
      setError("Nomor telepon harus diisi");
      return;
    }
    if (!address.trim()) {
      setError("Alamat harus diisi");
      return;
    }

    // Check duplicate
    const exists = suppliersMock.some(
      (s) => s.name.toLowerCase() === supplierName.trim().toLowerCase(),
    );
    if (exists) {
      setError("Supplier sudah ada");
      return;
    }

    // Add to mock
    suppliersMock.push({
      id: `supplier-${Date.now()}`,
      name: supplierName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      createdAt: new Date().toISOString(),
    });

    setShowSuccess(true);
    setSupplierName("");
    setPhone("");
    setAddress("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Menambah Supplier</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Nama Supplier
          </label>
          <input
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            placeholder="Nama supplier..."
            className="w-full px-4 py-3 text-black bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Nomor Telepon
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08XXXXXXXXXX..."
            className="w-full px-4 py-3 text-black bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Alamat
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Alamat lengkap supplier..."
            rows={3}
            className="w-full px-4 py-3 text-black bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors"
          >
            Tambah
          </button>
        </div>
      </form>

      <SuccessModal
        isOpen={showSuccess}
        title="Berhasil!"
        message="Supplier berhasil ditambahkan"
        onClose={() => setShowSuccess(false)}
        autoCloseDuration={2000}
      />
    </div>
  );
}
