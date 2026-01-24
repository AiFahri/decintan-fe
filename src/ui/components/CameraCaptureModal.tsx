import { useState } from "react";
import { Camera, X } from "lucide-react";

interface CameraCaptureModalProps {
  isOpen: boolean;
  title: string;
  onCapture: (imageBase64: string) => void;
  onClose: () => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  title,
  onCapture,
  onClose,
}) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>("");
  const [capturedImage, setCapturedImage] = useState<string>("");

  const startCamera = async () => {
    try {
      setError("");
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }, // Force front camera (selfie)
        audio: false,
      });
      setStream(mediaStream);
      setIsCameraActive(true);

      // Attach stream to video element
      const video = document.getElementById(
        "camera-preview",
      ) as HTMLVideoElement;
      if (video) {
        video.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      setError(
        "Tidak dapat mengakses kamera. Pastikan izin kamera diaktifkan.",
      );
    }
  };

  const capturePhoto = () => {
    const video = document.getElementById("camera-preview") as HTMLVideoElement;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL("image/jpeg", 0.8);
      setCapturedImage(imageData);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      handleClose();
    }
  };

  const handleRetake = () => {
    setCapturedImage("");
    startCamera();
  };

  const handleClose = () => {
    stopCamera();
    setCapturedImage("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-4/3 mb-4">
              {!isCameraActive && !capturedImage && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <Camera className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-sm opacity-75">Kamera belum aktif</p>
                </div>
              )}

              {isCameraActive && !capturedImage && (
                <video
                  id="camera-preview"
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}

              {capturedImage && (
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex gap-3">
              {!isCameraActive && !capturedImage && (
                <button
                  onClick={startCamera}
                  className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Aktifkan Kamera
                </button>
              )}

              {isCameraActive && !capturedImage && (
                <button
                  onClick={capturePhoto}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                >
                  Ambil Foto
                </button>
              )}

              {capturedImage && (
                <>
                  <button
                    onClick={handleRetake}
                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                  >
                    Ulangi
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                  >
                    Gunakan Foto
                  </button>
                </>
              )}
            </div>

            <p className="text-xs text-gray-500 mt-3 text-center">
              Pastikan wajah Anda terlihat jelas dan pencahayaan cukup
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
