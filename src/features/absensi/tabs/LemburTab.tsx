import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import type { OvertimeStatus } from '@/types/overtime';
import { overtimeRequestsMock } from '@/data/overtime.mock';
import { employeesMock } from '@/data/attendance.mock';
import { OvertimeTable } from '../components/OvertimeTable';
import { ConfirmationModal } from '@/ui/components/ConfirmationModal';

export function LemburTab() {
  const [requests, setRequests] = useState(overtimeRequestsMock);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OvertimeStatus | 'all'>(
    'pending'
  );
  
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'approve' | 'reject' | null;
    requestId: string | null;
  }>({ isOpen: false, type: null, requestId: null });

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      if (statusFilter !== 'all' && req.status !== statusFilter) {
        return false;
      }
      if (searchQuery) {
        const employee = employeesMock.find(
          (emp) => emp.id === req.employeeId
        );
        const nameMatch = employee?.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return nameMatch;
      }

      return true;
    });
  }, [requests, searchQuery, statusFilter]);

  const handleApprove = (id: string) => {
    setConfirmModal({ isOpen: true, type: 'approve', requestId: id });
  };

  const handleReject = (id: string) => {
    setConfirmModal({ isOpen: true, type: 'reject', requestId: id });
  };

  const handleConfirm = () => {
    if (!confirmModal.requestId) return;

    if (confirmModal.type === 'approve') {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === confirmModal.requestId
            ? {
                ...req,
                status: 'approved' as OvertimeStatus,
                approvedAt: new Date().toISOString(),
              }
            : req
        )
      );
      alert('✅ Pengajuan lembur disetujui');
    } else if (confirmModal.type === 'reject') {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === confirmModal.requestId
            ? {
                ...req,
                status: 'rejected' as OvertimeStatus,
                rejectedAt: new Date().toISOString(),
              }
            : req
        )
      );
      alert('❌ Pengajuan lembur ditolak');
    }

    setConfirmModal({ isOpen: false, type: null, requestId: null });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Pencarian..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 text-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as OvertimeStatus | 'all')
          }
          className="h-11 rounded-xl border border-gray-300 bg-white px-4 text-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        >
          <option value="pending">Pending</option>
          <option value="approved">Disetujui</option>
          <option value="rejected">Ditolak</option>
          <option value="all">Semua Status</option>
        </select>
      </div>

      <OvertimeTable
        requests={filteredRequests}
        employees={employeesMock}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.type === 'approve' ? 'Setujui Lembur?' : 'Tolak Lembur?'}
        message={
          confirmModal.type === 'approve'
            ? 'Apakah Anda yakin ingin menyetujui pengajuan lembur ini?'
            : 'Apakah Anda yakin ingin menolak pengajuan lembur ini?'
        }
        confirmText={confirmModal.type === 'approve' ? 'Ya, Setujui' : 'Ya, Tolak'}
        cancelText="Batal"
        confirmVariant={confirmModal.type === 'approve' ? 'success' : 'danger'}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmModal({ isOpen: false, type: null, requestId: null })}
      />
    </div>
  );
}
