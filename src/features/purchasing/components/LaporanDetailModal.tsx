import { X, FileDown } from "lucide-react";
import type { ReportDetail, ReportFilter } from "@/types/purchasing";
import { exportToExcel } from "@/utils/excelExport";
import logoDecintan from "@/assets/logo_decintan.jpg";

interface LaporanDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  filter: ReportFilter;
  data: ReportDetail[];
}

export function LaporanDetailModal({
  isOpen,
  onClose,
  filter,
  data,
}: LaporanDetailModalProps) {
  if (!isOpen) return null;

  const handleExport = () => {
    const exportData = data.map((item) => ({
      No: item.no,
      "Nama Barang": item.itemName,
      "Tanggal PO": item.poDate,
      Qty: item.qty,
      "Nama supplier": item.destination,
      "Harga Perbarang": item.pricePerUnit,
      "Total Harga": item.totalPrice,
      "Tanggal Barang Tiba": item.arrivalDate,
      "Bukti Barang": item.proofOfGoods,
      "Bukti tf": item.proofOfTransfer,
      "Surat Jalan": item.deliveryNote,
    }));
    exportToExcel(exportData, `Laporan_${filter.type}_${filter.entityName}`);
  };

  const getReportTitle = () => {
    switch (filter.type) {
      case "supplier":
        return `Laporan Supplier`;
      case "proyek":
        return `Laporan Proyek`;
      case "barang":
        return `Laporan Barang`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-7xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col">
        <div className="shrink-0 border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={logoDecintan}
                alt="DECINTAN"
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {getReportTitle()}
                </h3>
                <p className="text-sm text-gray-600">
                  {filter.entityName} • {filter.dateFrom} - {filter.dateTo}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Tutup modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-6 py-6">
          <div className="min-w-[1200px]">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                    No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                    Nama Barang
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                    Tanggal Po
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                    Tujuan Barang
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                    Harga Perbarang
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                    Total Harga
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                    Tanggal Barang Tiba
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                    Bukti Barang
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                    Bukti TF
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                    Surat Jalan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={11}
                      className="px-4 py-8 text-center text-sm text-gray-500"
                    >
                      Tidak ada data untuk periode ini
                    </td>
                  </tr>
                ) : (
                  data.map((item) => (
                    <tr key={item.no} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {item.no}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {item.itemName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {item.poDate}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {item.qty}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {item.destination}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {item.pricePerUnit.toLocaleString("id-ID")}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {item.totalPrice.toLocaleString("id-ID")}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {item.arrivalDate}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {item.proofOfGoods}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {item.proofOfTransfer}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {item.deliveryNote}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="shrink-0 border-t border-gray-200 bg-white px-6 py-4">
          <div className="flex justify-end">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 rounded-xl bg-[#2b3d9d] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              <FileDown className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
