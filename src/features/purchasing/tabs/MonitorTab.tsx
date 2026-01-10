import { Search, FileDown } from "lucide-react";
import { useState } from "react";
import { monitorLoansMock } from "@/data/purchasing.mock";
import { exportToExcel } from "@/utils/excelExport";
import { ImagePreviewModal } from "@/ui/components/ImagePreviewModal";

export function MonitorTab() {
  const [search, setSearch] = useState("");
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    imageUrl: string;
    name: string;
  }>({
    isOpen: false,
    imageUrl: "",
    name: "",
  });

  const filteredLoans = monitorLoansMock.filter(
    (loan) =>
      loan.itemName.toLowerCase().includes(search.toLowerCase()) ||
      loan.picName.toLowerCase().includes(search.toLowerCase()) ||
      loan.projectName.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    const exportData = filteredLoans.map((loan) => ({
      "Tgl Peminjaman": loan.loanDate,
      "Nama Barang": loan.itemName,
      "Nama Penanggung jawab": loan.picName,
      "Jumlah barang pinjam": loan.qtyBorrowed,
      "Nama Proyek": loan.projectName,
      "Jumlah (pcs)": loan.qtyReturn,
      "barang hilang": loan.missingQty,
    }));
    exportToExcel(exportData, "Monitor_Peminjaman");
  };

  const handleImageClick = (imageUrl: string, itemName: string) => {
    setPreviewModal({
      isOpen: true,
      imageUrl,
      name: itemName,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari barang..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-xl bg-[#2b3d9d] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          <FileDown className="h-4 w-4" />
          Download
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                tgl Peminjaman
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Nama Barang
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Nama Penanggung jawab
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">
                Jumlah barang pinjam
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Nama Proyek
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">
                Jumlah (pcs)
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">
                barang hilang
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">
                Bukti Foto
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredLoans.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  Tidak ada data
                </td>
              </tr>
            ) : (
              filteredLoans.map((loan) => (
                <tr key={loan.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {loan.loanDate}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {loan.itemName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {loan.picName}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-700">
                    {loan.qtyBorrowed} pcs
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {loan.projectName}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-700">
                    {loan.qtyReturn} pcs
                  </td>
                  <td className="px-4 py-3 text-center">
                    {loan.missingQty > 0 ? (
                      <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                        {loan.missingQty}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          handleImageClick(loan.photoEvidenceUrl, loan.itemName)
                        }
                        className="group relative h-12 w-12 overflow-hidden rounded-lg border border-gray-200 transition-all hover:border-primary-500"
                      >
                        <img
                          src={loan.photoEvidenceUrl}
                          alt={`Bukti ${loan.itemName}`}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/20">
                          <span className="text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                            Lihat
                          </span>
                        </div>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ImagePreviewModal
        isOpen={previewModal.isOpen}
        imageUrl={previewModal.imageUrl}
        title={`Bukti Foto - ${previewModal.name}`}
        onClose={() =>
          setPreviewModal({ isOpen: false, imageUrl: "", name: "" })
        }
      />
    </div>
  );
}
