"use client";
import { useProducts } from "@/app/context/ProductsContext";

export function AddProduct() {
  const { setIsFormOpen } = useProducts();
  return (
    <button
      className="w-fit text-md mx-auto bg-linear-to-br from-slate-100  to-slate-300 text-slate-900 font- rounded-3xl cursor-pointer px-6 py-2 shadow-sm shadow-slate-700 border border-transparent
  transition-all duration-300
  hover:shadow-md hover:shadow-slate-600 "
      onClick={() => setIsFormOpen(true)}
    >
      Añadir producto
    </button>
  );
}
