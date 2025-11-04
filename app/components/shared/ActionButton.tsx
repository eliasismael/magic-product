"use client";

interface ActionButtonProps {
  onClick: () => void;
  active?: boolean;
  color?: "red" | "blue" | "green" | "yellow" | "slate";
  icon?: React.ReactNode;
  label: string;
  disabled?: boolean;
  className?: string;
}

export function ActionButton({
  onClick,
  active = false,
  color = "slate",
  icon,
  label,
  disabled = false,
  className,
}: ActionButtonProps) {
  const colorStyles: Record<string, string> = {
    red: "hover:border-red-200 bg-white text-red-500 hover:bg-red-50",
    blue: "border-blue-200 bg-blue-100 text-blue-600 hover:bg-blue-200",
    green: "border-green-200 bg-green-50 text-green-600 hover:bg-green-100",
    yellow: "border-yellow-200 bg-white text-slate-800 hover:bg-yellow-50",
    slate: "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100",
  };

  return (
    <button
      onClick={onClick}
      className={
        className ||
        `mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-2 text-sm font-medium transition cursor-pointer ${colorStyles[color]}`
      }
      disabled={disabled}
    >
      {icon && (
        <span
          className={`h-4 w-4 ${
            active ? "text-current" : "text-slate-500"
          } flex items-center justify-center`}
        >
          {icon}
        </span>
      )}
      {label}
    </button>
  );
}
