import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Clock, Upload } from "lucide-react";
import { EmployeeDashboardLayout } from "@/ui/components/layouts/EmployeeDashboardLayout";
import { CameraCaptureModal } from "@/ui/components/CameraCaptureModal";
import { SuccessModal } from "@/ui/components/SuccessModal";
import { getCurrentUser } from "@/data/auth.mock";
import { workSchedulesMock } from "@/data/attendance.mock";
import { submitOvertimeRequest } from "@/utils/attendanceHelpers";

export default function OvertimeFormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    reason: "",
    startTime: "",
    endTime: "",
  });
  const [resultImage, setResultImage] = useState<string>("");
  const [faceImage, setFaceImage] = useState<string>("");
  const [cameraModal, setCameraModal] = useState<{
    isOpen: boolean;
    type: "result" | "face" | null;
  }>({ isOpen: false, type: null });
  const [successModal, setSuccessModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const currentUser = getCurrentUser();
  const employeeId = currentUser?.id || "user-002";

  // Get default start time from work schedule end time
  const dayOfWeek = new Date().getDay() === 0 ? 7 : new Date().getDay();
  const schedule = workSchedulesMock.base.days.find(
    (d) => d.dayOfWeek === dayOfWeek,
  );
  const workEndTime = schedule?.endTime || "17:00";

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "result" | "face",
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (type === "result") {
          setResultImage(base64);
        } else {
          setFaceImage(base64);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (imageBase64: string) => {
    if (cameraModal.type === "result") {
      setResultImage(imageBase64);
    } else if (cameraModal.type === "face") {
      setFaceImage(imageBase64);
    }
    setCameraModal({ isOpen: false, type: null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.reason.trim()) {
      setError("Alasan lembur harus diisi");
      return;
    }
    if (!formData.startTime || !formData.endTime) {
      setError("Jam mulai dan jam selesai harus diisi");
      return;
    }
    if (!resultImage) {
      setError("Foto hasil lembur harus diupload");
      return;
    }
    if (!faceImage) {
      setError("Foto selfie verifikasi harus diupload");
      return;
    }

    // Check if end time is after start time
    if (formData.endTime <= formData.startTime) {
      setError("Jam selesai harus lebih besar dari jam mulai");
      return;
    }

    setIsProcessing(true);

    try {
      await submitOvertimeRequest(
        employeeId,
        formData.reason,
        resultImage,
        faceImage,
        formData.startTime,
        formData.endTime,
      );

      setSuccessModal(true);
      setTimeout(() => {
        navigate("/absensi");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <EmployeeDashboardLayout
      breadcrumbs={["Aplikasi", "Absensi", "Pengajuan Lembur"]}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Pengajuan Lembur
          </h1>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alasan Lembur <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
                rows={4}
                placeholder="Jelaskan alasan dan aktivitas lembur..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jam Mulai <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Default: {workEndTime}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jam Selesai <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto Hasil Lembur <span className="text-red-500">*</span>
              </label>
              {resultImage ? (
                <div className="relative">
                  <img
                    src={resultImage}
                    alt="Hasil Lembur"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setResultImage("")}
                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setCameraModal({ isOpen: true, type: "result" })
                    }
                    className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Camera className="w-5 h-5" />
                    Ambil Foto
                  </button>
                  <label className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer">
                    <Upload className="w-5 h-5" />
                    Upload dari Galeri
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "result")}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto Selfie Verifikasi <span className="text-red-500">*</span>
              </label>
              {faceImage ? (
                <div className="relative">
                  <img
                    src={faceImage}
                    alt="Selfie Verifikasi"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setFaceImage("")}
                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setCameraModal({ isOpen: true, type: "face" })
                    }
                    className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Camera className="w-5 h-5" />
                    Ambil Selfie
                  </button>
                  <label className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer">
                    <Camera className="w-5 h-5" />
                    Upload dari Galeri
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "face")}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/absensi")}
                disabled={isProcessing}
                className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Mengirim..." : "Kirim Pengajuan"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <CameraCaptureModal
        isOpen={cameraModal.isOpen}
        title={
          cameraModal.type === "result"
            ? "Foto Hasil Lembur"
            : "Foto Selfie Verifikasi"
        }
        onCapture={handleCameraCapture}
        onClose={() => setCameraModal({ isOpen: false, type: null })}
      />

      <SuccessModal
        isOpen={successModal}
        title="Berhasil!"
        message="Pengajuan lembur berhasil dikirim"
        onClose={() => setSuccessModal(false)}
      />
    </EmployeeDashboardLayout>
  );
}
