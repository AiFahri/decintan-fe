import { useState } from 'react';
import { suppliersMock, projectsMock, itemsMock, getReportDetails } from '@/data/purchasing.mock';
import { LaporanDetailModal } from '../components/LaporanDetailModal';
import type { ReportFilter, ReportDetail } from '@/types/purchasing';
import type { ReportType } from '../hooks/usePurchasingTabs';

interface LaporanTabProps {
  reportType: ReportType;
  setReportType: (type: ReportType) => void;
}

export function LaporanTab({ reportType, setReportType }: LaporanTabProps) {
  const [selectedEntity, setSelectedEntity] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [reportData, setReportData] = useState<ReportDetail[]>([]);
  const [currentFilter, setCurrentFilter] = useState<ReportFilter | null>(null);

  const getDropdownOptions = () => {
    switch (reportType) {
      case 'supplier':
        return suppliersMock;
      case 'proyek':
        return projectsMock;
      case 'barang':
        return itemsMock;
    }
  };

  const getDropdownLabel = () => {
    switch (reportType) {
      case 'supplier':
        return 'Nama Supplier';
      case 'proyek':
        return 'Nama Proyek';
      case 'barang':
        return 'Nama Barang';
    }
  };

  const handleSearch = () => {
    if (!selectedEntity || !dateFrom || !dateTo) {
      alert('Mohon lengkapi semua filter');
      return;
    }

    const options = getDropdownOptions();
    const selectedOption = options.find((opt) => opt.id === selectedEntity);
    if (!selectedOption) return;

    const data = getReportDetails(reportType, selectedEntity, dateFrom, dateTo);
    setReportData(data);

    setCurrentFilter({
      type: reportType,
      entityId: selectedEntity,
      entityName: selectedOption.name,
      dateFrom,
      dateTo,
    });

    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="reportType"
            value="supplier"
            checked={reportType === 'supplier'}
            onChange={(e) => setReportType(e.target.value as ReportType)}
            className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-500"
          />
          <span className="text-sm font-medium text-gray-700">Supplier</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="reportType"
            value="proyek"
            checked={reportType === 'proyek'}
            onChange={(e) => setReportType(e.target.value as ReportType)}
            className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-500"
          />
          <span className="text-sm font-medium text-gray-700">Proyek</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="reportType"
            value="barang"
            checked={reportType === 'barang'}
            onChange={(e) => setReportType(e.target.value as ReportType)}
            className="h-4 w-4 text-primary-600 focus:ring-2 focus:ring-primary-500"
          />
          <span className="text-sm font-medium text-gray-700">Barang</span>
        </label>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {getDropdownLabel()}
            </label>
            <select
              value={selectedEntity}
              onChange={(e) => setSelectedEntity(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              <option value="">Pilih {getDropdownLabel()}</option>
              {getDropdownOptions().map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Dari Hari
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Sampai Hari
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full rounded-xl bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              Cari
            </button>
          </div>
        </div>
      </div>

      {currentFilter && (
        <LaporanDetailModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          filter={currentFilter}
          data={reportData}
        />
      )}
    </div>
  );
}
