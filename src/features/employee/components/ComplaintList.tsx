import type { ComplaintEntry } from "@/types/progres";

interface ComplaintListProps {
  complaints: ComplaintEntry[];
}

export const ComplaintList: React.FC<ComplaintListProps> = ({ complaints }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Keterangan</h3>

      {complaints.length === 0 ? (
        <p className="text-gray-500 text-sm">Tidak ada keterangan komplain</p>
      ) : (
        <div className="space-y-3">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <span className="text-sm font-semibold text-primary-600 min-w-20">
                {complaint.date}:
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {complaint.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {complaint.projectName}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
