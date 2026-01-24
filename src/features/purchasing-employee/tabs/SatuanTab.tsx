import { useState } from "react";
import { SuccessModal } from "@/ui/components/SuccessModal";
import { unitsMock } from "@/data/purchasing.mock";

export function SatuanTab() {
  const [unitName, setUnitName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!unitName.trim()) {
      setError("Nama unit harus diisi");
      return;
    }

    // Check duplicate
    const exists = unitsMock.some(
      (u) => u.name.toLowerCase() === unitName.trim().toLowerCase(),
    );
    if (exists) {
      setError("Unit sudah ada");
      return;
    }

    // Add to mock
    unitsMock.push({
      id: `unit-${Date.now()}`,
      name: unitName.trim(),
      createdAt: new Date().toISOString(),
    });

    // Show success
    setShowSuccess(true);
    setUnitName("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Menambah Unit</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Nama Unit
          </label>
          <input
            type="text"
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
            placeholder="Contoh: Pcs, Kg, Sak..."
            className="w-full px-4 py-3 text-black bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        message="Unit berhasil ditambahkan"
        onClose={() => setShowSuccess(false)}
        autoCloseDuration={2000}
      />
    </div>
  );
}
