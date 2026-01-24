import { useState } from "react";
import { SuccessModal } from "@/ui/components/SuccessModal";
import { projectsMock } from "@/data/purchasing.mock";

export function ProyekTab() {
  const [projectName, setProjectName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!projectName.trim()) {
      setError("Nama proyek harus diisi");
      return;
    }

    // Check duplicate
    const exists = projectsMock.some(
      (p) => p.name.toLowerCase() === projectName.trim().toLowerCase(),
    );
    if (exists) {
      setError("Proyek sudah ada");
      return;
    }

    // Add to mock
    projectsMock.push({
      id: `project-${Date.now()}`,
      name: projectName.trim(),
      createdAt: new Date().toISOString(),
    });

    setShowSuccess(true);
    setProjectName("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Menambah Proyek</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Nama Proyek
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Contoh: Proyek Gedung A..."
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
        message="Proyek berhasil ditambahkan"
        onClose={() => setShowSuccess(false)}
        autoCloseDuration={2000}
      />
    </div>
  );
}
