import { Package, Box, FileText, Monitor } from "lucide-react";
import { DashboardLayout } from "@/ui/components/layouts/DashboardLayout";
import { usePurchasingTabs } from "@/features/purchasing/hooks/usePurchasingTabs";
import { PemesananTab } from "@/features/purchasing/tabs/PemesananTab";
import { StokTab } from "@/features/purchasing/tabs/StokTab";
import { LaporanTab } from "@/features/purchasing/tabs/LaporanTab";
import { MonitorTab } from "@/features/purchasing/tabs/MonitorTab";
import { InfoBanner } from "@/ui/components/InfoBanner";

export function PurchasingPage() {
  const { activeTab, setActiveTab, reportType, setReportType } =
    usePurchasingTabs();

  const tabs = [
    { id: "pemesanan" as const, label: "Pemesanan", icon: Package },
    { id: "stok" as const, label: "Stok", icon: Box },
    { id: "laporan" as const, label: "Laporan", icon: FileText },
    { id: "monitor" as const, label: "Monitor", icon: Monitor },
  ];

  const getBreadcrumbTitle = () => {
    const tab = tabs.find((t) => t.id === activeTab);
    return tab?.label || "Purchasing";
  };

  return (
    <DashboardLayout
      breadcrumbs={["Aplikasi", "Purchasing", getBreadcrumbTitle()]}
    >
      <div className="space-y-6">
        <InfoBanner>
          <strong>Info Terbaru Dari Perusahaan</strong>
        </InfoBanner>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-6 transition-all ${
                  isActive
                    ? "border-primary-600 bg-[#2b3d9d] text-white shadow-lg"
                    : "border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50"
                }`}
              >
                <Icon className="h-8 w-8" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          {activeTab === "pemesanan" && <PemesananTab />}
          {activeTab === "stok" && <StokTab />}
          {activeTab === "laporan" && (
            <LaporanTab reportType={reportType} setReportType={setReportType} />
          )}
          {activeTab === "monitor" && <MonitorTab />}
        </div>
      </div>
    </DashboardLayout>
  );
}
