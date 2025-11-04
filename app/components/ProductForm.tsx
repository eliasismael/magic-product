"use client";
import React, { useState } from "react";
import { NoIdProduct } from "../types/product";
import { Spinner } from "./shared/Spinner";
import { useProducts } from "../context/ProductsContext";
import { FormErrors, validateProduct } from "../functions/validateForm";
import { InputField } from "./shared/InputField";
import { CloseButton } from "./shared/CloseButton";

interface ProductFormProps {
  onClose: () => void;
  onSubmit: (product: NoIdProduct) => Promise<void>;
}

export function ProductForm({ onClose, onSubmit }: ProductFormProps) {
  const { isAddProductLoading, products } = useProducts();
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
    status: "active" as "active" | "inactive",
    imgUrl: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const parsedData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
    };
    const newErrors = validateProduct(parsedData, products);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageChange = (file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        imgUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newProduct: NoIdProduct = {
      name: formData.name.trim(),
      sku: formData.sku.trim().toUpperCase(),
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
      status: formData.status,
      imgUrl: formData.imgUrl,
    };

    setErrors({});

    await onSubmit(newProduct);
    setFormData({
      name: "",
      sku: "",
      price: "",
      stock: "",
      status: "active",
      imgUrl: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Cerrar"
      />
      {/* Modal */}
      <main className="relative z-10 w-full shadow-black/50 max-w-lg rounded-2xl from-[#e5e9f2]  bg-linear-to-br  to-gray-300   p-6 shadow-2xl">
        <header className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Nuevo Producto
            </h2>
            <p className="text-sm text-slate-500">
              Completá los datos del producto. Todos los campos son
              obligatorios.
            </p>
          </div>

          <CloseButton onClick={onClose} />
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            id="name"
            label="Nombre del Producto"
            value={formData.name}
            onChange={(val) => handleChange("name", val)}
            placeholder="Ej: Taza Cerámica"
            error={errors.name}
          />

          <InputField
            id="sku"
            label="SKU"
            value={formData.sku}
            onChange={(val) => handleChange("sku", val)}
            placeholder="Ej: TAZ-001"
            error={errors.sku}
          />

          <InputField
            id="price"
            label="Precio"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(val) => handleChange("price", val)}
            error={errors.price}
          />

          <InputField
            id="stock"
            label="Stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={(val) => handleChange("stock", val)}
            error={errors.stock}
          />

          <InputField
            id="image"
            label="Imagen del producto"
            type="file"
            accept="image/*"
            onFileChange={handleImageChange}
            error={errors.imgUrl}
          >
            {formData.imgUrl && (
              <div className="mt-2">
                <p className="text-xs text-slate-500 mb-1">Vista previa:</p>
                <img
                  src={formData.imgUrl}
                  alt="Vista previa"
                  className="h-24 w-24 rounded-lg object-cover border border-slate-200"
                />
              </div>
            )}
          </InputField>

          <footer className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isAddProductLoading}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              {isAddProductLoading ? <Spinner /> : "Añadir Producto"}
            </button>
          </footer>
        </form>
      </main>
    </div>
  );
}
