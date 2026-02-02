import { useState } from "react";
import { Plus, Trash2, Camera, CheckCircle, XCircle } from "lucide-react";
import { SuccessModal } from "@/ui/components/SuccessModal";
import {
  projectsMock,
  suppliersMock,
  unitsMock,
  fieldRequestsMock,
} from "@/data/purchasing.mock";

type SubTab = "form" | "daftar";

interface OrderItem {
  itemName: string;
  qty: number;
  pricePerUnit: number;
  totalPrice: number;
  note: string;
}

interface OrderFormData {
  tanggal: string;
  satuan: string;
  supplierId: string;
  projectId: string;
}

export function PermintaanTab() {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("form");

  const [formData, setFormData] = useState<OrderFormData>({
    tanggal: new Date().toISOString().split("T")[0],
    satuan: "",
    supplierId: "",
    projectId: "",
  });

  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      itemName: "",
      qty: 0,
      pricePerUnit: 0,
      totalPrice: 0,
      note: "",
    },
  ]);

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  // Auto-calculate total price when qty or price changes
  const updateOrderItem = (
    index: number,
    field: keyof OrderItem,
    value: string | number,
  ) => {
    const newItems = [...orderItems];
    newItems[index] = { ...newItems[index], [field]: value };

    // Auto-calculate totalPrice
    if (field === "qty" || field === "pricePerUnit") {
      newItems[index].totalPrice =
        newItems[index].qty * newItems[index].pricePerUnit;
    }

    setOrderItems(newItems);
  };

  const addOrderItem = () => {
    setOrderItems([
      ...orderItems,
      {
        itemName: "",
        qty: 0,
        pricePerUnit: 0,
        totalPrice: 0,
        note: "",
      },
    ]);
  };

  const removeOrderItem = (index: number) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((_, i) => i !== index));
    }
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
    if (!formData.supplierId) {
      setError("Pilih supplier terlebih dahulu");
      return;
    }
    if (!formData.projectId) {
      setError("Pilih proyek terlebih dahulu");
      return;
    }

    for (let i = 0; i < orderItems.length; i++) {
      const item = orderItems[i];
      if (!item.itemName) {
        setError(`Baris ${i + 1}: Nama barang harus diisi`);
        return;
      }
      if (item.qty <= 0) {
        setError(`Baris ${i + 1}: Qty harus lebih dari 0`);
        return;
      }
      if (item.pricePerUnit <= 0) {
        setError(`Baris ${i + 1}: Harga satuan harus lebih dari 0`);
        return;
      }
    }

    // TODO: Submit logic here
    console.log("Barang Keluar Submitted:", { formData, orderItems });

    setShowSuccess(true);

    setFormData({
      tanggal: new Date().toISOString().split("T")[0],
      satuan: "",
      supplierId: "",
      projectId: "",
    });
    setOrderItems([
      {
        itemName: "",
        qty: 0,
        pricePerUnit: 0,
        totalPrice: 0,
        note: "",
      },
    ]);
  };

  const grandTotal = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Barang Keluar</h2>

      <div className="flex gap-2 border-b border-gray-300">
        <button
          onClick={() => setActiveSubTab("form")}
          className={`px-6 py-3 font-medium transition-colors ${
            activeSubTab === "form"
              ? "text-white border-b-2 border-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Form Pengajuan
        </button>
        <button
          onClick={() => setActiveSubTab("daftar")}
          className={`px-6 py-3 font-medium transition-colors ${
            activeSubTab === "daftar"
              ? "text-white border-b-2 border-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Daftar Pengajuan
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {activeSubTab === "form" && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal
              </label>
              <input
                type="date"
                value={formData.tanggal}
                onChange={(e) =>
                  setFormData({ ...formData, tanggal: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Satuan
              </label>
              <select
                value={formData.satuan}
                onChange={(e) =>
                  setFormData({ ...formData, satuan: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              >
                <option value="">Pilih Satuan</option>
                {unitsMock.map((unit) => (
                  <option key={unit.id} value={unit.name}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Supplier
              </label>
              <select
                value={formData.supplierId}
                onChange={(e) =>
                  setFormData({ ...formData, supplierId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              >
                <option value="">Pilih Supplier</option>
                {suppliersMock.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Proyek
              </label>
              <select
                value={formData.projectId}
                onChange={(e) =>
                  setFormData({ ...formData, projectId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              >
                <option value="">Pilih Proyek</option>
                {projectsMock.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700 border">
                    No
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700 border">
                    Nama Barang
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700 border">
                    Qty (Jumlah)
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700 border">
                    Harga Satuan
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700 border">
                    Catatan
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700 border">
                    Total Harga
                  </th>
                  <th className="px-3 py-2 text-center text-sm font-semibold text-gray-700 border">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-sm text-gray-900 border">
                      {index + 1}
                    </td>
                    <td className="px-3 py-2 border">
                      <input
                        type="text"
                        value={item.itemName}
                        onChange={(e) =>
                          updateOrderItem(index, "itemName", e.target.value)
                        }
                        placeholder="Nama barang..."
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-900"
                      />
                    </td>
                    <td className="px-3 py-2 border">
                      <input
                        type="number"
                        value={item.qty || ""}
                        onChange={(e) =>
                          updateOrderItem(
                            index,
                            "qty",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-900"
                        min="0"
                        step="1"
                      />
                    </td>
                    <td className="px-3 py-2 border">
                      <input
                        type="number"
                        value={item.pricePerUnit || ""}
                        onChange={(e) =>
                          updateOrderItem(
                            index,
                            "pricePerUnit",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="w-32 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-900"
                        min="0"
                        step="1000"
                      />
                    </td>
                    <td className="px-3 py-2 border">
                      <input
                        type="text"
                        value={item.note || ""}
                        onChange={(e) =>
                          updateOrderItem(index, "note", e.target.value)
                        }
                        placeholder="Opsional..."
                        className="w-40 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-900"
                      />
                    </td>
                    <td className="px-3 py-2 border">
                      <div className="font-semibold text-gray-900">
                        Rp {item.totalPrice.toLocaleString("id-ID")}
                      </div>
                    </td>
                    <td className="px-3 py-2 border text-center">
                      <button
                        type="button"
                        onClick={() => removeOrderItem(index)}
                        disabled={orderItems.length === 1}
                        className="p-1 text-red-500 hover:bg-red-50 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              type="button"
              onClick={addOrderItem}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Tambah Baris
            </button>

            {grandTotal > 0 && (
              <div className="mt-6 flex justify-end">
                <div className="bg-gray-100 px-6 py-4 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Grand Total:</div>
                  <div className="text-2xl font-bold text-gray-900">
                    Rp {grandTotal.toLocaleString("id-ID")}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors"
            >
              Kirim Pengajuan
            </button>
          </div>
        </form>
      )}

      {activeSubTab === "daftar" && (
        <div className="space-y-4">
          <p className="text-sm text-white">
            Daftar pengajuan barang keluar dan statusnya.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                    Nama Barang
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                    Nama Pengaju
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">
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
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">
                    Bukti Kebutuhan
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {fieldRequestsMock.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-8 text-center text-sm text-gray-500"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  fieldRequestsMock.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {request.itemName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {request.employeeName}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                          {request.qty || "-"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {request.date}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {request.destination || request.projectName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {request.note || "-"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {request.photoUrl ? (
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Camera className="w-5 h-5" />
                          </button>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                            request.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : request.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {request.status === "approved"
                            ? "Disetujui"
                            : request.status === "rejected"
                              ? "Ditolak"
                              : "Pending"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Terima"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Tolak"
                          >
                            <XCircle className="w-5 h-5" />
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
      )}

      <SuccessModal
        isOpen={showSuccess}
        title="Berhasil!"
        message="Pengajuan barang keluar berhasil dikirim"
        onClose={() => setShowSuccess(false)}
        autoCloseDuration={2000}
      />
    </div>
  );
}
