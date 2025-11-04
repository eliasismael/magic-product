function MetricCard({
  label,
  value,
  sub,
  tone = "default",
}: {
  label: string;
  value: number | string;
  sub?: string;
  tone?: "default" | "blue" | "muted" | "dark";
}) {
  const toneClasses: Record<string, string> = {
    default: "border-white/60 shadow-md bg-white/70",
    blue: "bg-gradient-to-br from-[#e8f0ff] to-white border border-white/60 shadow-lg",
    muted:
      "bg-slate-50/70 border-slate-100 shadow-[0_16px_40px_rgba(15,23,42,0.02)]",
    dark: "bg-slate-900 text-white border border-slate-900 shadow-md",
  };

  return (
    <div
      className={`rounded-3xl p-5 ${toneClasses[tone]} backdrop-blur-[2px] h-full`}
    >
      <p
        className={`text-xs mb-2 ${
          tone === "dark" ? "text-slate-200/80" : "text-slate-400"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-3xl font-semibold tracking-tight ${
          tone === "dark" ? "text-white" : "text-slate-900"
        }`}
      >
        {value}
      </p>
      {sub ? (
        <p
          className={`text-xs mt-3 ${
            tone === "dark" ? "text-slate-200/50" : "text-slate-400"
          }`}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}
export default MetricCard;
