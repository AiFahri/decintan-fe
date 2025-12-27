import { MapPin } from "lucide-react";
import type { AttendanceMapPin } from "@/types/attendance";

interface MapPlaceholderProps {
  pins: AttendanceMapPin[];
}

export const MapPlaceholder = ({ pins }: MapPlaceholderProps) => {
  return (
    <div className="relative w-full h-96 lg:h-[500px] bg-gray-100 rounded-xl overflow-hidden shadow-sm">
      <img
        src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/106.8456,-6.2088,13,0/800x600@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
        alt="Map"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0">
        {pins.map((pin, index) => (
          <div
            key={pin.id}
            className="absolute animate-bounce"
            style={{
              top: `${25 + index * 18}%`,
              left: `${30 + index * 12}%`,
              animationDelay: `${index * 150}ms`,
            }}
            title={`${pin.employeeName} - ${
              pin.type === "checkIn" ? "Masuk" : "Pulang"
            } ${pin.time}`}
          >
            <div className="relative">
              <MapPin
                className={`w-10 h-10 drop-shadow-lg ${
                  pin.type === "checkIn" ? "text-red-600" : "text-blue-600"
                }`}
                fill={pin.type === "checkIn" ? "#dc2626" : "#2563eb"}
              />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap shadow-md">
                {String.fromCharCode(65 + index)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-xs text-gray-600">
        Google Maps
      </div>
    </div>
  );
};
