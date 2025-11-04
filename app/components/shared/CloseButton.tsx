"use client";

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function CloseButton({
  onClick,
  className = "",
  size = "md",
}: CloseButtonProps) {
  const sizeClasses =
    size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg";

  return (
    <button
      onClick={onClick}
      aria-label="Cerrar"
      className={`text-black hover:text-slate-700 transition cursor-pointer ${sizeClasses} ${className}`}
    >
      ✕
    </button>
  );
}
