import { Check, X } from "lucide-react";

interface OvertimeActionButtonsProps {
  onApprove: () => void;
  onReject: () => void;
  disabled?: boolean;
}

export function OvertimeActionButtons({
  onApprove,
  onReject,
  disabled = false,
}: OvertimeActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onApprove}
        disabled={disabled}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-white shadow-sm transition-all hover:bg-green-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Terima lembur"
        title="Terima"
      >
        <Check className="h-5 w-5" />
      </button>

      <button
        onClick={onReject}
        disabled={disabled}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition-all hover:bg-red-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Tolak lembur"
        title="Tolak"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
