interface StatusBadgeProps {
  status: "active" | "inactive";
  className?: string;
  size?: "sm" | "md";
}

export function StatusBadge({
  status,
  className = "",
  size = "sm",
}: StatusBadgeProps) {
  const isActive = status === "active";

  const baseClasses =
    "rounded-full font-medium inline-flex items-center justify-center transition-colors";

  const sizeClasses =
    size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm";

  const colorClasses = isActive
    ? "bg-blue-100 text-blue-700"
    : "bg-gray-100 text-gray-600";

  const label = isActive ? "Activo" : "Inactivo";

  return (
    <span
      className={`${baseClasses} ${sizeClasses} ${colorClasses} ${className}`}
    >
      {label}
    </span>
  );
}
