interface DailySummaryCardProps {
  present: number;
  absent: number;
  date: string;
}

export const DailySummaryCard = ({
  present,
  absent,
  date,
}: DailySummaryCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Masuk/Keluar</h3>
      <div className="flex items-center gap-6">
        <div>
          <p className="text-sm text-gray-600 mb-1">Masuk</p>
          <p className="text-2xl font-bold text-green-600">{present} org</p>
        </div>
        <div className="h-12 w-px bg-gray-200" />
        <div>
          <p className="text-sm text-gray-600 mb-1">Keluar</p>
          <p className="text-2xl font-bold text-red-600">{absent} org</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-3">Tanggal: {date}</p>
    </div>
  );
};
