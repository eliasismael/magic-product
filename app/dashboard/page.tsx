"use client";
import Dashboard from "./Dashboard";
import { useProducts } from "../context/ProductsContext";

export default function DashboardPage() {
  const { products } = useProducts();
  return <Dashboard products={products} />;
}
