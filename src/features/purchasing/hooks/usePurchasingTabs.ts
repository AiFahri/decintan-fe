import { useState } from 'react';

type PurchasingTab = 'pemesanan' | 'stok' | 'laporan' | 'monitor';
export type ReportType = 'supplier' | 'proyek' | 'barang';

export function usePurchasingTabs() {
  const [activeTab, setActiveTab] = useState<PurchasingTab>('pemesanan');
  const [reportType, setReportType] = useState<ReportType>('supplier');

  return {
    activeTab,
    setActiveTab,
    reportType,
    setReportType,
  };
}
