import { useState, useMemo } from 'react';
import { Search, Calendar } from 'lucide-react';
import { attendanceDailyMock, employeesMock } from '@/data/attendance.mock';
import { Avatar } from '@/ui/components/Avatar';
import { IndividualReportModal } from '../components/IndividualReportModal';
import type { Employee } from '@/types/attendance';

export function IndividualReportTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('2026-01-01');
  const [dateTo, setDateTo] = useState('2026-01-31');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filteredEmployees = useMemo(() => {
    return employeesMock.filter((emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const employeeAttendance = useMemo(() => {
    if (!selectedEmployee) return [];

    return attendanceDailyMock
      .filter(
        (record) =>
          record.employeeId === selectedEmployee.id &&
          record.date >= dateFrom &&
          record.date <= dateTo
      )
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [selectedEmployee, dateFrom, dateTo]);

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Nama Anggota
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="cari anggota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 text-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Dari Hari
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 text-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Sampai Hari
          </label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 text-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredEmployees.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <p className="text-gray-500">Tidak ada anggota ditemukan</p>
          </div>
        ) : (
          filteredEmployees.map((employee) => (
            <button
              key={employee.id}
              onClick={() => handleEmployeeClick(employee)}
              className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-sm transition-all hover:border-primary-500 hover:shadow-md"
            >
              <Avatar
                src={employee.avatarUrl}
                alt={employee.name}
                size="lg"
              />
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium text-gray-900 group-hover:text-primary-600">
                  {employee.name}
                </p>
                <p className="truncate text-sm text-gray-500">
                  {employee.title}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Klik untuk detail
                </p>
              </div>
            </button>
          ))
        )}
      </div>

      <IndividualReportModal
        isOpen={selectedEmployee !== null}
        employee={selectedEmployee}
        attendance={employeeAttendance}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  );
}
