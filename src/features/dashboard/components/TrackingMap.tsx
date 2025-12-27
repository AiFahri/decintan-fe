import { MapPin } from "lucide-react";
import type { TrackingPin } from "@/types/dashboard";

interface TrackingMapProps {
  pins: TrackingPin[];
}

export const TrackingMap = ({ pins }: TrackingMapProps) => {
  return (
    <div className="relative w-full h-64 lg:h-80 bg-gray-100 rounded-lg overflow-hidden">
      <img
        src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/106.8456,-6.2088,13,0/600x400@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
        alt="Map placeholder"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        {pins.map((pin, index) => (
          <div
            key={pin.id}
            className="absolute animate-bounce"
            style={{
              top: `${30 + index * 15}%`,
              left: `${35 + index * 10}%`,
              animationDelay: `${index * 200}ms`,
            }}
            title={pin.label}
          >
            <MapPin
              className="w-8 h-8 text-red-600 drop-shadow-lg"
              fill="#dc2626"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
        <p className="text-xs font-medium text-gray-900">
          {pins.length} Karyawan Terdeteksi
        </p>
      </div>
    </div>
  );
};
