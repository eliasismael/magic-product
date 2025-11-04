"use client";

type InputFieldProps = {
  id: string;
  label: string;
  value?: string | number;
  onChange?: (value: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  accept?: string;
  min?: string | number;
  step?: string | number;
  onFileChange?: any;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
};

export function InputField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  accept,
  min,
  step,
  onFileChange,
  className = "",
  disabled = false,
  children,
}: InputFieldProps) {
  const baseClass =
    "bg-white rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-700 border-slate-200";

  const isFile = type === "file";

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-slate-800">
        {label}
      </label>

      {isFile ? (
        <input
          id={id}
          type="file"
          accept={accept}
          disabled={disabled}
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            onFileChange?.(file);
          }}
          className={`${baseClass} cursor-pointer`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          min={min}
          step={step}
          disabled={disabled}
          className={baseClass}
        />
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      {children}
    </div>
  );
}
