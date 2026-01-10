import { Search, FileDown, Check, X } from "lucide-react";
import { useState } from "react";
import {
  purchasingOrdersMock,
  updateOrderStatus,
} from "@/data/purchasing.mock";
import type { PurchasingOrder } from "@/types/purchasing";
import { exportToExcel } from "@/utils/excelExport";

export function PemesananTab() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<PurchasingOrder[]>(purchasingOrdersMock);

  const filteredOrders = orders.filter(
    (order) =>
      order.itemName.toLowerCase().includes(search.toLowerCase()) ||
      order.supplier.toLowerCase().includes(search.toLowerCase()) ||
      order.destination.toLowerCase().includes(search.toLowerCase())
  );

  const handleApprove = (orderId: string) => {
    if (updateOrderStatus(orderId, "approved")) {
      setOrders([...purchasingOrdersMock]);
    }
  };

  const handleReject = (orderId: string) => {
    if (updateOrderStatus(orderId, "rejected")) {
      setOrders([...purchasingOrdersMock]);
    }
  };

  const handleExport = () => {
    const exportData = filteredOrders.map((order) => ({
      "Nama Barang": order.itemName,
      Supplier: order.supplier,
      Qty: order.qty,
      "Tgl PO": order.poDate,
      "Tujuan Barang": order.destination,
      Catatan: order.note,
      "Harga Barang": order.pricePerUnit,
      Total: order.totalPrice,
      Status:
        order.status === "approved"
          ? "Disetujui"
          : order.status === "rejected"
          ? "Ditolak"
          : "Diproses",
    }));
    exportToExcel(exportData, "Pemesanan");
  };

  const getStatusBadge = (status: PurchasingOrder["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "processed":
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getStatusText = (status: PurchasingOrder["status"]) => {
    switch (status) {
      case "approved":
        return "Disetujui";
      case "rejected":
        return "Ditolak";
      case "processed":
        return "Diproses";
    }
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
                Nama barang
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Supplier
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Qty
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Tgl PO
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Tujuan Barang
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Catatan
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Harga barang
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Total
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  Tidak ada data
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {order.itemName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {order.supplier}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {order.qty}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {order.poDate}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {order.destination}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {order.note}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {order.pricePerUnit.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {order.totalPrice.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleApprove(order.id)}
                        disabled={order.status !== "processed"}
                        className="rounded-lg p-2 text-green-600 transition-colors hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-40"
                        title="Terima"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleReject(order.id)}
                        disabled={order.status !== "processed"}
                        className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                        title="Tolak"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
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
