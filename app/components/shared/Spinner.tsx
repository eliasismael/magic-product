export function Spinner({ size = 24, color = "border-blue-600" }) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-4 border-solid border-gray-200 border-t-transparent ${color}`}
      style={{ width: size, height: size }}
      role="status"
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
}
