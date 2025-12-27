import { useState } from "react";

export type AbsensiTab = "lokasi" | "laporan" | "pengaturan";
export type LaporanPeriod = "daily" | "weekly" | "monthly";

interface UseAbsensiTabsReturn {
  activeTab: AbsensiTab;
  setActiveTab: (tab: AbsensiTab) => void;
  laporanPeriod: LaporanPeriod;
  setLaporanPeriod: (period: LaporanPeriod) => void;
}

export const useAbsensiTabs = (): UseAbsensiTabsReturn => {
  const [activeTab, setActiveTab] = useState<AbsensiTab>("lokasi");
  const [laporanPeriod, setLaporanPeriod] = useState<LaporanPeriod>("daily");

  return {
    activeTab,
    setActiveTab,
    laporanPeriod,
    setLaporanPeriod,
  };
};
