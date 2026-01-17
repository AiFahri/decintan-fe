import { useState } from "react";
import { X, Camera, Upload, FileText } from "lucide-react";
import { CameraCaptureModal } from "./CameraCaptureModal";

interface LeaveRequestModalProps {
  isOpen: boolean;
  type: "izin" | "sakit";
  onSubmit: (documentBase64: string) => void;
  onClose: () => void;
}

export function LeaveRequestModal({
  isOpen,
  type,
  onSubmit,
  onClose,
}: LeaveRequestModalProps) {
  const [document, setDocument] = useState<string>("");
  const [documentName, setDocumentName] = useState("");
  const [cameraModal, setCameraModal] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const title = type === "sakit" ? "Pengajuan Sakit" : "Pengajuan Izin";

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Ukuran file maksimal 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setDocument(reader.result as string);
        setDocumentName(file.name);
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (imageBase64: string) => {
    setDocument(imageBase64);
    setDocumentName("foto_dokumen.jpg");
    setCameraModal(false);
    setError("");
  };

  const handleSubmit = () => {
    if (!document) {
      setError("Dokumen pendukung harus diupload");
      return;
    }

    onSubmit(document);
    handleClose();
  };

  const handleClose = () => {
    setDocument("");
    setDocumentName("");
    setError("");
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                {type === "sakit"
                  ? "Upload surat keterangan dokter atau bukti sakit"
                  : "Upload surat izin atau dokumen pendukung lainnya"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dokumen Pendukung <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-3">
                {type === "sakit"
                  ? "Upload surat keterangan dokter atau bukti sakit"
                  : "Upload surat izin atau dokumen pendukung lainnya"}
              </p>

              {document ? (
                <div className="border border-gray-300 rounded-xl p-4">
                  {document.startsWith("data:image") ? (
                    <img
                      src={document}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                  ) : (
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="w-8 h-8 text-blue-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {documentName}
                        </p>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setDocument("");
                      setDocumentName("");
                    }}
                    className="w-full py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                  >
                    Hapus Dokumen
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setCameraModal(true)}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Camera className="w-5 h-5" />
                    Ambil Foto Dokumen
                  </button>
                  <label className="w-full py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer">
                    <Upload className="w-5 h-5" />
                    Upload dari Galeri
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 p-6 border-t border-gray-200">
            <button
              onClick={handleClose}
              className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
            >
              Kirim Pengajuan
            </button>
          </div>
        </div>
      </div>

      <CameraCaptureModal
        isOpen={cameraModal}
        title="Foto Dokumen Pendukung"
        onCapture={handleCameraCapture}
        onClose={() => setCameraModal(false)}
      />
    </>
  );
}
