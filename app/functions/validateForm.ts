import { Product } from "../types/product";

export type FormErrors = {
  name?: string;
  sku?: string;
  price?: string;
  stock?: string;
  imgUrl?: string;
};

/**
 * Valida los campos de un producto nuevo o editado.
 * @param data Producto a validar
 * @param products Lista de productos existentes
 * @param excludeId (opcional) Id del producto actual para evitar marcar su propio SKU como duplicado
 * @returns Un objeto con los errores encontrados
 */

export function validateProduct(
  data: Partial<Product>,
  products: Product[],
  excludeId?: string
): FormErrors {
  const newErrors: FormErrors = {};

  const price = Number.parseFloat(String(data.price));
  const stock = Number.parseInt(String(data.stock));

  if (!data.name?.trim()) {
    newErrors.name = "El nombre es requerido";
  } else if (data.name.trim().length < 3) {
    newErrors.name = "El nombre debe tener al menos 3 caracteres";
  }

  if (!data.sku?.trim()) {
    newErrors.sku = "El SKU es requerido";
  } else if (!/^[A-Z0-9-]+$/i.test(data.sku)) {
    newErrors.sku = "El SKU solo puede contener letras, números y guiones";
  } else {
    const skuExists = products.some(
      (p) =>
        p.sku.trim().toUpperCase() === data.sku!.trim().toUpperCase() &&
        p.id !== excludeId
    );
    if (skuExists) newErrors.sku = "Ya existe un producto con ese SKU";
  }

  if (
    data.price === undefined ||
    data.price === null ||
    String(data.price).trim() === ""
  ) {
    newErrors.price = "El precio es requerido";
  } else if (Number.isNaN(price)) {
    newErrors.price = "Precio inválido";
  } else if (price <= 0) {
    newErrors.price = "El precio debe ser mayor a 0";
  }

  if (data.stock === undefined || data.stock === null || isNaN(data.stock)) {
    newErrors.stock = "El stock es requerido";
  } else if (Number.isNaN(stock)) {
    newErrors.stock = "Stock inválido";
  } else if (stock < 0) {
    newErrors.stock = "El stock no puede ser negativo";
  }

  return newErrors;
}
