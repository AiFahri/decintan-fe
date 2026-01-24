import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { SuccessModal } from "@/ui/components/SuccessModal";
import {
  projectsMock,
  suppliersMock,
  unitsMock,
  purchasingOrdersMock,
} from "@/data/purchasing.mock";
import type { OrderItem } from "@/types/purchasing";

interface OrderFormData {
  projectId: string;
  supplierId: string;
  tglPesanan: string;
}

export function PemesananTab() {
  const [formData, setFormData] = useState<OrderFormData>({
    projectId: "",
    supplierId: "",
    tglPesanan: new Date().toISOString().split("T")[0],
  });

  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      itemName: "",
      qty: 0,
      unit: "",
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
        unit: "",
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

    if (!formData.projectId) {
      setError("Pilih proyek terlebih dahulu");
      return;
    }
    if (!formData.supplierId) {
      setError("Pilih supplier terlebih dahulu");
      return;
    }

    // Validate order items
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
      if (!item.unit) {
        setError(`Baris ${i + 1}: Satuan harus dipilih`);
        return;
      }
      if (item.pricePerUnit <= 0) {
        setError(`Baris ${i + 1}: Harga satuan harus lebih dari 0`);
        return;
      }
    }

    // Get names from IDs
    const projectName =
      projectsMock.find((p) => p.id === formData.projectId)?.name || "";
    const supplierName =
      suppliersMock.find((s) => s.id === formData.supplierId)?.name || "";

    // Submit each item as separate order
    orderItems.forEach((item) => {
      purchasingOrdersMock.push({
        id: `order-${Date.now()}-${Math.random()}`,
        itemName: item.itemName,
        supplier: supplierName,
        qty: item.qty,
        poDate: formData.tglPesanan,
        destination: projectName,
        note: item.note || "",
        pricePerUnit: item.pricePerUnit,
        totalPrice: item.totalPrice,
        status: "processed",
      });
    });

    setShowSuccess(true);

    setFormData({
      projectId: "",
      supplierId: "",
      tglPesanan: new Date().toISOString().split("T")[0],
    });
    setOrderItems([
      {
        itemName: "",
        qty: 0,
        unit: "",
        pricePerUnit: 0,
        totalPrice: 0,
        note: "",
      },
    ]);
  };

  const grandTotal = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Pemesanan Barang</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proyek
            </label>
            <select
              value={formData.projectId}
              onChange={(e) =>
                setFormData({ ...formData, projectId: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supplier
            </label>
            <select
              value={formData.supplierId}
              onChange={(e) =>
                setFormData({ ...formData, supplierId: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              Tgl Pesanan
            </label>
            <input
              type="date"
              value={formData.tglPesanan}
              onChange={(e) =>
                setFormData({ ...formData, tglPesanan: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
                  Qty
                </th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700 border">
                  Satuan
                </th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700 border">
                  Harga Satuan
                </th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700 border">
                  Total Harga
                </th>
                <th className="px-3 py-2 text-left text-sm font-semibold text-gray-700 border">
                  Catatan
                </th>
                <th className="px-3 py-2 text-center text-sm font-semibold text-gray-700 border">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 text-black bg-white"
                >
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
                      className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="px-3 py-2 border">
                    <select
                      value={item.unit}
                      onChange={(e) =>
                        updateOrderItem(index, "unit", e.target.value)
                      }
                      className="w-24 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Pilih</option>
                      {unitsMock.map((unit) => (
                        <option key={unit.id} value={unit.name}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
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
                      className="w-32 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      min="0"
                      step="1000"
                    />
                  </td>
                  <td className="px-3 py-2 border">
                    <div className="font-semibold text-gray-900">
                      Rp {item.totalPrice.toLocaleString("id-ID")}
                    </div>
                  </td>
                  <td className="px-3 py-2 border">
                    <input
                      type="text"
                      value={item.note || ""}
                      onChange={(e) =>
                        updateOrderItem(index, "note", e.target.value)
                      }
                      placeholder="Opsional..."
                      className="w-40 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
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
        </div>

        <button
          type="button"
          onClick={addOrderItem}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Baris
        </button>

        <div className="flex justify-end">
          <div className="bg-gray-100 px-6 py-4 rounded-xl">
            <div className="text-sm text-gray-600 mb-1">Total Keseluruhan:</div>
            <div className="text-2xl font-bold text-gray-900">
              Rp {grandTotal.toLocaleString("id-ID")}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors"
          >
            Pesan Sekarang
          </button>
        </div>
      </form>

      <SuccessModal
        isOpen={showSuccess}
        title="Berhasil!"
        message="Pesanan berhasil dibuat dan sedang diproses"
        onClose={() => setShowSuccess(false)}
        autoCloseDuration={2000}
      />
    </div>
  );
}
