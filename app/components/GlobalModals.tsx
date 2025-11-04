"use client";

import { useProducts } from "../context/ProductsContext";
import { ProductDetails } from "./ProductDetails";
import { ProductForm } from "./ProductForm";

export default function GlobalModals() {
  const {
    selectedProduct,
    setSelectedProduct,
    isFormOpen,
    setIsFormOpen,
    handleAddProduct,
    toggleFavProduct,
    handleDeleteProduct,
    handleEditProduct,
  } = useProducts();

  if (!selectedProduct && !isFormOpen) return null;

  return (
    <>
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onDelete={handleDeleteProduct}
          onEdit={handleEditProduct}
          onFav={toggleFavProduct}
        />
      )}

      {isFormOpen && (
        <ProductForm
          onSubmit={handleAddProduct}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </>
  );
}
