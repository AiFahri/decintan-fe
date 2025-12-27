import { MapPin, Clock, Settings } from "lucide-react";
import { DashboardLayout } from "@/ui/components/layouts/DashboardLayout";
import { InfoBanner } from "@/ui/components/InfoBanner";
import { TabSwitcher } from "@/ui/components/TabSwitcher";
import { useAbsensiTabs } from "@/features/absensi/hooks/useAbsensiTabs";
import { LokasiTab } from "@/features/absensi/tabs/LokasiTab";
import { LaporanTab } from "@/features/absensi/tabs/LaporanTab";
import { PengaturanTab } from "@/features/absensi/tabs/PengaturanTab";
import type { AbsensiTab } from "@/features/absensi/hooks/useAbsensiTabs";

const tabs = [
  {
    id: "lokasi" as AbsensiTab,
    label: "Lokasi",
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    id: "laporan" as AbsensiTab,
    label: "Laporan",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    id: "pengaturan" as AbsensiTab,
    label: "Pengaturan",
    icon: <Settings className="w-6 h-6" />,
  },
];

const breadcrumbsMap: Record<AbsensiTab, string[]> = {
  lokasi: ["Aplikasi", "Absensi", "Lokasi"],
  laporan: ["Aplikasi", "Absensi", "Laporan"],
  pengaturan: ["Aplikasi", "Absensi", "Pengaturan"],
};

export default function AbsensiPage() {
  const { activeTab, setActiveTab } = useAbsensiTabs();

  return (
    <DashboardLayout breadcrumbs={breadcrumbsMap[activeTab]}>
      <InfoBanner>
        <strong>Info Terbaru</strong> Dari perusahaan
      </InfoBanner>

      <TabSwitcher
        tabs={tabs}
        activeTab={activeTab}
        onChange={(tabId) => setActiveTab(tabId as AbsensiTab)}
      />
      {activeTab === "lokasi" && <LokasiTab />}
      {activeTab === "laporan" && <LaporanTab />}
      {activeTab === "pengaturan" && <PengaturanTab />}
    </DashboardLayout>
  );
}
