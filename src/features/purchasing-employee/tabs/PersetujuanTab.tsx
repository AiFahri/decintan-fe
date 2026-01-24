import { useState } from "react";
import { Camera, CheckCircle, XCircle } from "lucide-react";
import { CameraCaptureModal } from "@/ui/components/CameraCaptureModal";
import { SuccessModal } from "@/ui/components/SuccessModal";
import {
  purchasingOrdersMock,
  inventoryStockMock,
} from "@/data/purchasing.mock";

type ProofType = "bukti_barang" | "bukti_transfer" | "surat_jalan";

interface ProofData {
  orderId: string;
  buktiBarang?: string;
  buktiTransfer?: string;
  suratJalan?: string;
}

export function PersetujuanTab() {
  const [proofData, setProofData] = useState<Record<string, ProofData>>({});
  const [activeModal, setActiveModal] = useState<{
    orderId: string;
    type: ProofType;
  } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Filter only approved orders
  const approvedOrders = purchasingOrdersMock.filter(
    (order) => order.status === "approved",
  );

  const handleCameraCapture = (imageBase64: string) => {
    if (!activeModal) return;

    const { orderId, type } = activeModal;

    setProofData((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        orderId,
        [type === "bukti_barang"
          ? "buktiBarang"
          : type === "bukti_transfer"
            ? "buktiTransfer"
            : "suratJalan"]: imageBase64,
      },
    }));

    setActiveModal(null);
  };

  const getProofStatus = (orderId: string, type: ProofType) => {
    const data = proofData[orderId];
    if (!data) return false;

    switch (type) {
      case "bukti_barang":
        return !!data.buktiBarang;
      case "bukti_transfer":
        return !!data.buktiTransfer;
      case "surat_jalan":
        return !!data.suratJalan;
      default:
        return false;
    }
  };

  const isOrderComplete = (orderId: string) => {
    return (
      getProofStatus(orderId, "bukti_barang") &&
      getProofStatus(orderId, "bukti_transfer") &&
      getProofStatus(orderId, "surat_jalan")
    );
  };

  const handleSubmitProof = (orderId: string) => {
    const data = proofData[orderId];
    if (!data || !isOrderComplete(orderId)) {
      alert("Harap lengkapi semua bukti terlebih dahulu!");
      return;
    }

    // Find the order
    const order = purchasingOrdersMock.find((o) => o.id === orderId);
    if (!order) return;

    // Update inventory stock (increase currentStock)
    const stockItem = inventoryStockMock.find(
      (item) => item.itemName.toLowerCase() === order.itemName.toLowerCase(),
    );
    if (stockItem) {
      stockItem.itemIn += order.qty;
      stockItem.currentStock += order.qty;
    }

    // Update order status to completed
    order.status = "completed";

    // Clear proof data for this order
    setProofData((prev) => {
      const newData = { ...prev };
      delete newData[orderId];
      return newData;
    });
    setShowSuccess(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">
        Persetujuan Barang Datang
      </h2>

      <p className="text-sm text-white">
        Upload bukti untuk pesanan yang sudah disetujui. Semua bukti harus
        lengkap sebelum submit.
      </p>

      <div className="overflow-x-auto bg-white rounded-xl p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border">
                No
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border">
                Nama Barang
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border">
                Supplier
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border">
                Proyek
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border">
                Tgl PO
              </th>
              <th className="px-3 py-3 text-right text-sm font-semibold text-gray-700 border">
                Qty
              </th>
              <th className="px-3 py-3 text-right text-sm font-semibold text-gray-700 border">
                Total Harga
              </th>
              <th className="px-3 py-3 text-center text-sm font-semibold text-gray-700 border">
                Status
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border">
                Tgl Tiba
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700 border">
                Catatan
              </th>
              <th className="px-3 py-3 text-center text-sm font-semibold text-gray-700 border">
                Bukti Barang
              </th>
              <th className="px-3 py-3 text-center text-sm font-semibold text-gray-700 border">
                Bukti Transfer
              </th>
              <th className="px-3 py-3 text-center text-sm font-semibold text-gray-700 border">
                Surat Jalan
              </th>
              <th className="px-3 py-3 text-center text-sm font-semibold text-gray-700 border">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {approvedOrders.map((order, index) => {
              const isComplete = isOrderComplete(order.id);
              const buktiBarangDone = getProofStatus(order.id, "bukti_barang");
              const buktiTransferDone = getProofStatus(
                order.id,
                "bukti_transfer",
              );
              const suratJalanDone = getProofStatus(order.id, "surat_jalan");

              return (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-3 py-3 text-sm text-gray-900 border">
                    {index + 1}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-900 border">
                    {order.itemName}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-900 border">
                    {order.supplier}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-900 border">
                    {order.destination}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-900 border">
                    {order.poDate}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-900 border text-right">
                    {order.qty}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-900 border text-right">
                    Rp {order.totalPrice.toLocaleString("id-ID")}
                  </td>
                  <td className="px-3 py-3 border text-center">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : order.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status === "approved"
                        ? "Disetujui"
                        : order.status === "rejected"
                          ? "Ditolak"
                          : "Pending"}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-900 border">
                    {order.poDate
                      ? new Date(
                          new Date(order.poDate).getTime() +
                            7 * 24 * 60 * 60 * 1000,
                        )
                          .toISOString()
                          .split("T")[0]
                      : "-"}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-900 border">
                    {order.note || "-"}
                  </td>

                  <td className="px-3 py-3 border text-center">
                    <button
                      onClick={() =>
                        setActiveModal({
                          orderId: order.id,
                          type: "bukti_barang",
                        })
                      }
                      className={`p-2 rounded-lg transition-colors ${
                        buktiBarangDone
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                      }`}
                    >
                      {buktiBarangDone ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Camera className="w-5 h-5" />
                      )}
                    </button>
                  </td>

                  <td className="px-3 py-3 border text-center">
                    <button
                      onClick={() =>
                        setActiveModal({
                          orderId: order.id,
                          type: "bukti_transfer",
                        })
                      }
                      className={`p-2 rounded-lg transition-colors ${
                        buktiTransferDone
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                      }`}
                    >
                      {buktiTransferDone ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Camera className="w-5 h-5" />
                      )}
                    </button>
                  </td>

                  <td className="px-3 py-3 border text-center">
                    <button
                      onClick={() =>
                        setActiveModal({
                          orderId: order.id,
                          type: "surat_jalan",
                        })
                      }
                      className={`p-2 rounded-lg transition-colors ${
                        suratJalanDone
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                      }`}
                    >
                      {suratJalanDone ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Camera className="w-5 h-5" />
                      )}
                    </button>
                  </td>

                  <td className="px-3 py-3 border text-center">
                    {isComplete ? (
                      <button
                        onClick={() => handleSubmitProof(order.id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-4 py-2 bg-gray-300 text-gray-500 text-sm font-medium rounded-lg cursor-not-allowed"
                      >
                        Submit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {approvedOrders.length === 0 && (
        <div className="text-center py-12">
          <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            Belum ada pesanan yang disetujui untuk dikonfirmasi
          </p>
        </div>
      )}

      <CameraCaptureModal
        isOpen={activeModal !== null}
        title={
          activeModal?.type === "bukti_barang"
            ? "Foto Bukti Barang"
            : activeModal?.type === "bukti_transfer"
              ? "Foto Bukti Transfer"
              : "Foto Surat Jalan"
        }
        onCapture={handleCameraCapture}
        onClose={() => setActiveModal(null)}
      />

      <SuccessModal
        isOpen={showSuccess}
        title="Berhasil!"
        message="Bukti berhasil disubmit. Stok sudah diperbarui."
        onClose={() => setShowSuccess(false)}
        autoCloseDuration={2000}
      />
    </div>
  );
}
