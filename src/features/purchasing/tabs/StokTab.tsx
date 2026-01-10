import { Search, FileDown } from "lucide-react";
import { useState } from "react";
import { inventoryStockMock } from "@/data/purchasing.mock";
import { exportToExcel } from "@/utils/excelExport";

export function StokTab() {
  const [search, setSearch] = useState("");

  const filteredStock = inventoryStockMock.filter(
    (item) =>
      item.itemName.toLowerCase().includes(search.toLowerCase()) ||
      item.supplier.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    const exportData = filteredStock.map((item) => ({
      "Nama Barang": item.itemName,
      Satuan: item.unit,
      Supplier: item.supplier,
      "Barang Masuk": item.itemIn,
      "Barang Keluar": item.itemOut,
      Stok: item.currentStock,
    }));
    exportToExcel(exportData, "Stok");
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
                Nama Barang
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Satuan
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Supplier
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">
                Barang Masuk
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">
                Barang Keluar
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">
                Stok
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredStock.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  Tidak ada data
                </td>
              </tr>
            ) : (
              filteredStock.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {item.itemName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {item.unit}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {item.supplier}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      {item.itemIn}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                      {item.itemOut}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                      {item.currentStock}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
