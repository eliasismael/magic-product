"use client";

import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { initialProducts } from "../data/products";
import { NoIdProduct, Product } from "../types/product";
import { Spinner } from "../components/shared/Spinner";

interface IProductsContext {
  products: Product[];
  setProducts: React.Dispatch<SetStateAction<Product[]>>;
  selectedProduct: Product | null;
  setSelectedProduct: React.Dispatch<SetStateAction<Product | null>>;
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<SetStateAction<boolean>>;
  handleAddProduct: (newProduct: Omit<Product, "id">) => Promise<void>;
  isAddProductLoading: boolean;
  toggleFavProduct: (productId: string) => void;
  handleDeleteProduct: (productId: string) => void; // NUEVO
  handleEditProduct: (productId: string, editData: Product) => void;
}

const ProductsContext = createContext<IProductsContext | undefined>(undefined);

const LS_PRODUCTS_KEY = "products";

export function ProductsContextProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAddProductLoading, setIsAddProductLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedProducts = window.localStorage.getItem(LS_PRODUCTS_KEY);

    const parsedProducts: Product[] = storedProducts
      ? JSON.parse(storedProducts)
      : initialProducts;

    setProducts(parsedProducts);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(products));
  }, [products, isHydrated]);

  const handleAddProduct = async (newProduct: NoIdProduct): Promise<void> => {
    setIsAddProductLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const product: Product = {
          ...newProduct,
          id: Date.now().toString(),
          createdByUser: true,
        };
        setProducts((prev) => [...prev, product]);

        setIsAddProductLoading(false);
        resolve();
      }, 1000);
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setSelectedProduct((prev) => (prev?.id === productId ? null : prev));
  };

  const handleEditProduct = (productId: string, editData: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...editData } : p))
    );
  };

  const toggleFavProduct = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, isFavorite: !Boolean(p.isFavorite) } : p
      )
    );
  };

  const value = {
    products,
    setProducts,
    selectedProduct,
    setSelectedProduct,
    isFormOpen,
    setIsFormOpen,
    handleAddProduct,
    isAddProductLoading,
    toggleFavProduct,
    handleDeleteProduct,
    handleEditProduct,
  };

  if (!isHydrated) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Spinner size={100} />
      </div>
    );
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context)
    throw new Error("useProducts debe usarse dentro de un ProductProvider");
  return context;
};
