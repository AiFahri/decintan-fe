import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Clock, MapPin } from "lucide-react";
import { EmployeeDashboardLayout } from "@/ui/components/layouts/EmployeeDashboardLayout";
import { InfoBanner } from "@/ui/components/InfoBanner";
import { CameraCaptureModal } from "@/ui/components/CameraCaptureModal";
import { LeaveRequestModal } from "@/ui/components/LeaveRequestModal";
import { SuccessModal } from "@/ui/components/SuccessModal";
import { getCurrentUser } from "@/data/auth.mock";
import { workSchedulesMock } from "@/data/attendance.mock";
import { hasCheckedOutToday } from "@/utils/attendanceStatus";
import {
  getGreeting,
  formatDate,
  formatTime,
  hasCheckedInToday,
  canCheckOut,
  getCurrentLocation,
  submitCheckIn,
  submitCheckOut,
  submitLeaveRequest,
} from "@/utils/attendanceHelpers";

type AttendanceAction = "checkIn" | "checkOut";

export default function EmployeeAttendancePage() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState(getGreeting());
  const [cameraModal, setCameraModal] = useState<{
    isOpen: boolean;
    action: AttendanceAction | null;
  }>({ isOpen: false, action: null });
  const [leaveModal, setLeaveModal] = useState<{
    isOpen: boolean;
    type: "izin" | "sakit" | null;
  }>({ isOpen: false, type: null });
  const [successModal, setSuccessModal] = useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");

  const currentUser = getCurrentUser();
  const employeeId = currentUser?.id || "user-002";
  const today = currentTime.toISOString().split("T")[0];
  const timeString = formatTime(currentTime);

  // Get work schedule for today
  const dayOfWeek = currentTime.getDay() === 0 ? 7 : currentTime.getDay();
  const schedule = workSchedulesMock.base.days.find(
    (d) => d.dayOfWeek === dayOfWeek,
  );
  const workStartTime = schedule?.startTime || "08:00";
  const workEndTime = schedule?.endTime || "17:00";

  // Check attendance status
  const hasCheckedIn = hasCheckedInToday(employeeId, today);
  const canCheckOutNow = canCheckOut(
    employeeId,
    today,
    timeString,
    workEndTime,
  );
  const hasCheckedOut = hasCheckedOutToday(employeeId, today);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setGreeting(getGreeting());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    setCameraModal({ isOpen: true, action: "checkIn" });
  };

  const handleCheckOut = () => {
    setCameraModal({ isOpen: true, action: "checkOut" });
  };

  const handleLeaveRequest = (type: "izin" | "sakit") => {
    setLeaveModal({ isOpen: true, type });
  };

  const handleLeaveSubmit = async (documentBase64: string) => {
    setIsProcessing(true);
    setError("");

    try {
      await submitLeaveRequest(employeeId, leaveModal.type!, documentBase64);
      setSuccessModal({
        isOpen: true,
        message: `Pengajuan ${leaveModal.type} berhasil dikirim`,
      });
      setLeaveModal({ isOpen: false, type: null });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLembur = () => {
    navigate("/absensi/lembur");
  };

  const handleCameraCapture = async (imageBase64: string) => {
    setIsProcessing(true);
    setError("");

    try {
      const action = cameraModal.action;

      if (action === "checkIn" || action === "checkOut") {
        // Get GPS location
        const location = await getCurrentLocation();

        if (action === "checkIn") {
          await submitCheckIn(
            employeeId,
            imageBase64,
            location.lat,
            location.lng,
            location.locationText,
          );
          setSuccessModal({
            isOpen: true,
            message: "Anda Berhasil Melakukan Absensi",
          });
        } else {
          await submitCheckOut(
            employeeId,
            imageBase64,
            location.lat,
            location.lng,
            location.locationText,
          );
          setSuccessModal({
            isOpen: true,
            message: "Selamat Beristirahat !!!",
          });
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsProcessing(false);
      setCameraModal({ isOpen: false, action: null });
    }
  };

  return (
    <EmployeeDashboardLayout breadcrumbs={["Aplikasi", "Absensi"]}>
      <div className="max-w-7xl mx-auto space-y-6">
        <InfoBanner>Pengingattenggat dan tugas (Notifikasi)</InfoBanner>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="bg-linear-to-br from-blue-900 to-blue-700 rounded-2xl shadow-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Absensi</h1>
            <p className="text-2xl font-semibold mb-4">{greeting}</p>
            <p className="text-xl font-medium mb-1">
              {formatDate(currentTime)}
            </p>
            <p className="text-4xl font-bold">{timeString}</p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm opacity-90">
              <MapPin className="w-4 h-4" />
              <span>lokasi : kantor</span>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <div className="w-48 h-48 bg-gray-300 rounded-xl border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-gray-500 text-6xl">👤</span>
            </div>
          </div>

          <div className="space-y-4">
            {!hasCheckedIn && (
              <button
                onClick={handleCheckIn}
                disabled={isProcessing}
                className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg disabled:cursor-not-allowed"
              >
                <Camera className="w-6 h-6" />
                Absen Masuk
              </button>
            )}

            {hasCheckedIn && canCheckOutNow && (
              <button
                onClick={handleCheckOut}
                disabled={isProcessing}
                className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg disabled:cursor-not-allowed"
              >
                <Camera className="w-6 h-6" />
                Absen Pulang
              </button>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleLeaveRequest("sakit")}
                disabled={isProcessing || hasCheckedIn}
                className="py-4 bg-white text-red-600 hover:bg-red-50 disabled:bg-gray-200 disabled:text-gray-500 rounded-xl font-bold text-lg transition-colors shadow-lg disabled:cursor-not-allowed"
              >
                SAKIT
              </button>
              <button
                onClick={() => handleLeaveRequest("izin")}
                disabled={isProcessing || hasCheckedIn}
                className="py-4 bg-yellow-400 text-gray-900 hover:bg-yellow-500 disabled:bg-gray-300 disabled:text-gray-500 rounded-xl font-bold text-lg transition-colors shadow-lg disabled:cursor-not-allowed"
              >
                IZIN
              </button>
            </div>

            {hasCheckedIn && canCheckOutNow && (
              <button
                onClick={handleLembur}
                disabled={isProcessing}
                className="w-full py-4 bg-yellow-400 text-gray-900 hover:bg-yellow-500 disabled:bg-gray-300 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-colors shadow-lg disabled:cursor-not-allowed"
              >
                <Clock className="w-6 h-6" />
                Lembur
              </button>
            )}
          </div>

          {hasCheckedIn && !canCheckOutNow && !hasCheckedOut && (
            <div className="mt-6 p-4 bg-blue-800/50 rounded-xl text-center text-sm">
              <p className="font-medium">
                Anda sudah absen masuk. Tombol pulang akan aktif setelah jam{" "}
                {workEndTime}
              </p>
            </div>
          )}

          {hasCheckedOut && (
            <div className="mt-6 p-4 bg-blue-800/50 rounded-xl text-center text-sm">
              <p className="font-medium">
                Anda sudah absen pulang. Tombol absen masuk akan muncul kembali
                besok pukul {workStartTime}
              </p>
            </div>
          )}
        </div>
      </div>

      <CameraCaptureModal
        isOpen={cameraModal.isOpen}
        title={
          cameraModal.action === "checkIn"
            ? "Foto Selfie - Absen Masuk"
            : "Foto Selfie - Absen Pulang"
        }
        onCapture={handleCameraCapture}
        onClose={() => setCameraModal({ isOpen: false, action: null })}
      />

      <LeaveRequestModal
        isOpen={leaveModal.isOpen}
        type={leaveModal.type!}
        onSubmit={handleLeaveSubmit}
        onClose={() => setLeaveModal({ isOpen: false, type: null })}
      />

      <SuccessModal
        isOpen={successModal.isOpen}
        message={successModal.message}
        onClose={() => setSuccessModal({ isOpen: false, message: "" })}
        autoCloseDuration={3000}
      />
    </EmployeeDashboardLayout>
  );
}
