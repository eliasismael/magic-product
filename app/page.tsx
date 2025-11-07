"use client";
import { ProductList } from "./components/ProductsList";
import { useProducts } from "./context/ProductsContext";

export default function Home() {
  const { products } = useProducts();
  return (
    <div className="mx-auto mb-8 px-20 flex flex-col items-center justify-center">
      <ProductList products={products} />
    </div>
  );
}
