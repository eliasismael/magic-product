import Image from "next/image";
import { useProducts } from "../context/ProductsContext";
import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onDetails?: () => void;
}

export function ProductCard({ product }: ProductCardProps) {
  const { setSelectedProduct } = useProducts();
  const handleViewDetails = () => {
    setSelectedProduct(product);
  };

  const isActive = product.status === "active";

  return (
    <div
      className="min-w-84 max-w-sm rounded-2xl from-white bg-linear-to-br to-slate-300 p-5  
      shadow-sm shadow-black/30 duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-[1.1rem] font-semibold text-slate-900 tracking-tight">
            {product.name}
          </h2>
          <p className="text-sm text-slate-500">SKU: {product.sku}</p>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            isActive
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-gray-50 text-gray-500 border border-gray-200"
          }`}
        >
          {isActive ? "Activo" : "Inactivo"}
        </span>
      </div>

      {product.imgUrl && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden my-2">
          <Image
            src={product.imgUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Body */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Precio</span>
          <span className="text-lg font-semibold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Stock</span>
          <span
            className={`text-base font-medium ${
              product.stock === 0
                ? "text-red-600"
                : product.stock < 10
                ? "text-amber-600"
                : "text-slate-900"
            }`}
          >
            {product.stock} unidades
          </span>
        </div>
      </div>
    </div>
  );
}
