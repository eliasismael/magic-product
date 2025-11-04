"use client";

interface EditableInfoCardProps {
  label: string;
  icon?: string;
  value: string | number;
  type?: string;
  isEditing: boolean;
  onChange?: (value: string) => void;
  error?: string;
  min?: number;
  step?: number;
  className?: string;
  textColor?: string;
}

export function EditableInfoCard({
  label,
  icon,
  value,
  type = "text",
  isEditing,
  onChange,
  error,
  min,
  step,
  className = "",
  textColor = "text-slate-800",
}: EditableInfoCardProps) {
  return (
    <div
      className={`flex flex-col gap-1 rounded-xl border border-gray-200 bg-white p-4 shadow-md shadow-slate-400 ${className}`}
    >
      <label className="text-sm font-medium text-slate-600 flex gap-2 items-center">
        {icon && <span className="text-lg text-slate-600">{icon}</span>}
        {label}
      </label>

      {isEditing ? (
        <>
          <input
            type={type}
            min={min}
            step={step}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={`rounded-lg border bg-white px-2 py-1 text-sm ${
              error ? "border-red-400" : "border-slate-200"
            }`}
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </>
      ) : (
        <span className={`text-base font-semibold ${textColor}`}>{value}</span>
      )}
    </div>
  );
}
