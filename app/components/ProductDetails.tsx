"use client";

import Image from "next/image";
import { useProducts } from "../context/ProductsContext";
import { Product } from "../types/product";
import { ActionButton } from "./shared/ActionButton";
import { useState, useEffect } from "react";
import { ConfirmModal } from "./ConfirmModal";
import { validateProduct } from "../functions/validateForm";
import { EditableInfoCard } from "./shared/EditableInfoCards";
import { CloseButton } from "./shared/CloseButton";
import { StatusBadge } from "./shared/StatusBadge";

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onDelete: (id: string) => void;
  onEdit: (productId: string, editData: Product) => void;
  onFav: (productId: string) => void;
}

type FormErrors = {
  name?: string;
  sku?: string;
  price?: string;
  stock?: string;
};

export function ProductDetails({
  product,
  onClose,
  onDelete,
  onEdit,
  onFav,
}: ProductDetailModalProps) {
  const { products } = useProducts();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [ediatbleProductData, setEditbleProductData] =
    useState<Product>(product);
  const [errors, setErrors] = useState<FormErrors>({});

  const isFavProduct =
    products.find((p) => p.id === product.id)?.isFavorite ?? false;

  const stockValue = (
    ediatbleProductData.price * ediatbleProductData.stock
  ).toFixed(2);
  const stockStatus =
    ediatbleProductData.stock > 0 ? "Stock Disponible" : "Sin stock disponible";

  useEffect(() => {
    setEditbleProductData(product);
    setIsEditing(false);
    setErrors({});
  }, [product]);

  useEffect(() => {
    if (isEditing) {
      const newErrors = validateProduct(
        ediatbleProductData,
        products,
        ediatbleProductData.id as string
      );
      setErrors(newErrors);
    }
  }, [ediatbleProductData, products, isEditing]);

  const isFormValid = Object.keys(errors).length === 0;

  const handleFavorite = () => {
    onFav(product.id as string);
  };

  const handleDelete = () => {
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    onDelete(product.id as string);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditChange = (field: keyof Product, value: string) => {
    if (field === "price") {
      const num = Number.parseFloat(value);
      setEditbleProductData((prev) => ({
        ...prev,
        price: Number.isNaN(num) ? 0 : num,
      }));
      return;
    }
    if (field === "stock") {
      const num = Number.parseInt(value);
      setEditbleProductData((prev) => ({
        ...prev,
        stock: Number.isNaN(num) ? 0 : num,
      }));
      return;
    }
    if (field === "status") {
      setEditbleProductData((prev) => ({
        ...prev,
        status: value as "active" | "inactive",
      }));
      return;
    }
    setEditbleProductData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancelEdit = () => {
    setEditbleProductData(product);
    setErrors({});
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    const newErrors = validateProduct(
      ediatbleProductData,
      products,
      product.id as string
    );

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onEdit(product.id as string, ediatbleProductData);
    setIsEditing(false);
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 py-6">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Cerrar"
      />

      {/* Modal */}
      <div
        className="relative z-10 max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl from-slate-100 bg-linear-to-br to-slate-400 p-5 sm:p-6 shadow-2xl shadow-black/60
        w-[92vw]"
      >
        {/* Header */}
        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          {isEditing ? (
            <div className="w-full">
              <input
                value={ediatbleProductData.name}
                onChange={(e) => handleEditChange("name", e.target.value)}
                className={`text-2xl sm:text-3xl font-semibold text-slate-900 inline bg-white/70 rounded-lg px-3 py-1 border w-full ${
                  errors.name ? "border-red-400" : "border-slate-200"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
          ) : (
            <h2 className="inline text-2xl sm:text-3xl font-semibold text-slate-900 wrap-break-words">
              {ediatbleProductData.name}
            </h2>
          )}

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {isEditing ? (
              <select
                value={ediatbleProductData.status}
                onChange={(e) => handleEditChange("status", e.target.value)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            ) : (
              <StatusBadge status={ediatbleProductData.status} size="sm" />
            )}
            <CloseButton onClick={onClose} />
          </div>
        </header>

        <main className="relative mb-6 flex flex-col gap-6 sm:flex-row sm:items-start">
          {product.imgUrl && (
            <div className="flex justify-center sm:justify-start">
              <Image
                src={product.imgUrl}
                alt={product.name}
                width={180}
                height={180}
                className="h-40 w-40 sm:h-48 sm:w-48 rounded-full border-2 border-slate-300 object-cover shadow-md shadow-slate-800/50"
              />
            </div>
          )}

          <section className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
            <EditableInfoCard
              label="SKU"
              icon="#"
              value={ediatbleProductData.sku}
              isEditing={isEditing}
              onChange={(v) => handleEditChange("sku", v)}
              error={errors.sku}
            />

            <EditableInfoCard
              label="Precio"
              icon="$"
              type="number"
              min={0}
              step={0.01}
              value={ediatbleProductData.price}
              isEditing={isEditing}
              onChange={(v) => handleEditChange("price", v)}
              error={errors.price}
            />

            <EditableInfoCard
              label="Stock Disponible"
              icon="📦"
              type="number"
              min={0}
              value={ediatbleProductData.stock}
              isEditing={isEditing}
              onChange={(v) => handleEditChange("stock", v)}
              error={errors.stock}
              textColor="text-green-600"
            />

            <EditableInfoCard
              label="Estado del Stock"
              icon="📊"
              value={stockStatus}
              isEditing={false}
              textColor={
                ediatbleProductData.stock > 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            />
          </section>
        </main>

        <section className="mb-4">
          <h3 className="mb-2 text-md font-semibold text-slate-800">
            Información Adicional
          </h3>
          <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-slate-700 space-y-2">
            <div className="flex justify-between gap-4">
              <span>ID</span>
              <span className="break-all text-right">{product.id}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Estado</span>
              <span className="text-right">
                {ediatbleProductData.status === "active"
                  ? "Producto Activo"
                  : "Producto Inactivo"}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Valor Total en Stock</span>
              <span className="text-right">${stockValue}</span>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-2">
          <ActionButton
            onClick={handleFavorite}
            label={isFavProduct ? "Quitar de Favoritos" : "Agregar a Favoritos"}
            disabled={isEditing}
            color="yellow"
          />

          {isEditing ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <ActionButton
                onClick={handleSaveEdit}
                disabled={!isFormValid}
                label="Guardar cambios"
                className={`mt-2 flex-1 rounded-lg px-4 py-2 text-sm font-medium text-white
                  ${
                    isFormValid
                      ? "bg-slate-900 hover:bg-slate-800"
                      : "bg-slate-400 cursor-not-allowed"
                  }`}
              />

              <ActionButton
                onClick={handleCancelEdit}
                label="Cancelar"
                className="mt-2 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              />
            </div>
          ) : (
            <ActionButton onClick={handleEditClick} label="Editar Producto" />
          )}

          <ActionButton
            onClick={handleDelete}
            color="red"
            active={true}
            label="Eliminar"
          />

          <ConfirmModal
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={confirmDelete}
            title="Eliminar producto"
            message={`¿Seguro que querés eliminar "${ediatbleProductData.name}"?`}
            confirmLabel="Sí, eliminar"
          />
        </footer>
      </div>
    </div>
  );
}
