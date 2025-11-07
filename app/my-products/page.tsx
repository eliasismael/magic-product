"use client";
import { useProducts } from "../context/ProductsContext";
import MyProducts from "./MyProducts";

export default function MyProductsPage() {
  const { products } = useProducts();

  return <MyProducts products={products} />;
}
