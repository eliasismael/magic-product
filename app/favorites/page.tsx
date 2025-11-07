"use client";
import Favorites from "./Favorites";
import { useProducts } from "../context/ProductsContext";

export default function FavoritesPage() {
  const { products } = useProducts();

  return <Favorites products={products} />;
}
