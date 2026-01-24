import { useState } from "react";
import {
  X,
  Box,
  Settings,
  Building2,
  Package,
  ShoppingCart,
  FileCheck,
  CheckSquare,
  Gem,
  FileText,
} from "lucide-react";
import { EmployeeDashboardLayout } from "@/ui/components/layouts/EmployeeDashboardLayout";
import { InfoBanner } from "@/ui/components/InfoBanner";
import { SatuanTab } from "@/features/purchasing-employee/tabs/SatuanTab";
import { ProyekTab } from "@/features/purchasing-employee/tabs/ProyekTab";
import { SupplierTab } from "@/features/purchasing-employee/tabs/SupplierTab";
import { StokTab } from "@/features/purchasing-employee/tabs/StokTab";
import { PemesananTab } from "@/features/purchasing-employee/tabs/PemesananTab";
import { PermintaanTab } from "@/features/purchasing-employee/tabs/PermintaanTab";
import { PersetujuanTab } from "@/features/purchasing-employee/tabs/PersetujuanTab";
import { AsetTab } from "@/features/purchasing-employee/tabs/AsetTab";
import { PengajuanTab } from "@/features/purchasing-employee/tabs/PengajuanTab";

type PurchasingTab =
  | "satuan"
  | "proyek"
  | "supplier"
  | "stok"
  | "pemesanan"
  | "permintaan"
  | "persetujuan"
  | "aset"
  | "pengajuan";

const tabs = [
  { id: "satuan" as const, label: "Satuan", icon: Box },
  { id: "proyek" as const, label: "Proyek", icon: Settings },
  { id: "supplier" as const, label: "Supplier", icon: Building2 },
  { id: "stok" as const, label: "Stok", icon: Package },
  { id: "pemesanan" as const, label: "Pemesanan", icon: ShoppingCart },
  { id: "permintaan" as const, label: "Barang Keluar", icon: FileCheck },
  { id: "persetujuan" as const, label: "Persetujuan", icon: CheckSquare },
  { id: "aset" as const, label: "Aset", icon: Gem },
  { id: "pengajuan" as const, label: "Pengajuan", icon: FileText },
];

export default function EmployeePurchasingPage() {
  const [activeTab, setActiveTab] = useState<PurchasingTab>("satuan");
  const [showBanner, setShowBanner] = useState(true);

  return (
    <EmployeeDashboardLayout breadcrumbs={["Aplikasi", "Purchasing"]}>
      <div className="space-y-6">
        {showBanner && (
          <div className="relative">
            <InfoBanner>Pengingattenggat dan tugas (Notifikasi)</InfoBanner>
            <button
              onClick={() => setShowBanner(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#2b3d9d] text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md"
                  }
                `}
              >
                <Icon className="w-8 h-8" />
                <span className="text-sm font-medium text-center">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="bg-[#2b3d9d] rounded-2xl shadow-lg p-6">
          {activeTab === "satuan" && <SatuanTab />}
          {activeTab === "proyek" && <ProyekTab />}
          {activeTab === "supplier" && <SupplierTab />}
          {activeTab === "stok" && <StokTab />}
          {activeTab === "pemesanan" && <PemesananTab />}
          {activeTab === "permintaan" && <PermintaanTab />}
          {activeTab === "persetujuan" && <PersetujuanTab />}
          {activeTab === "aset" && <AsetTab />}
          {activeTab === "pengajuan" && <PengajuanTab />}
        </div>
      </div>
    </EmployeeDashboardLayout>
  );
}
