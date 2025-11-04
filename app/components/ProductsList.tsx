"use client";
import { motion } from "framer-motion";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { Spinner } from "./shared/Spinner";
import { SearchFilterBar } from "./SearchFilterBar";
import { Pagination } from "./shared/Pagination";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { AddProduct } from "./shared/AddProduct";
import { Product } from "../types/product";

type FilterStatus = "all" | "active" | "inactive";

const PAGE_SIZE = 6;

export function ProductList({ products }: { products: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowMain(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    const byStatus = products.filter((product) => {
      if (statusFilter === "all") return true;
      return product.status === statusFilter;
    });

    if (!debouncedQuery.trim()) return byStatus;

    const query = debouncedQuery.toLowerCase();

    return byStatus.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query)
      );
    });
  }, [products, debouncedQuery, statusFilter]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setIsLoading(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery, statusFilter]);

  const noProducts = !isLoading && filteredProducts.length === 0;
  const hasProducts = !isLoading && filteredProducts.length > 0;

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex my-8 ml-0 w-fit gap-6 flex-col"
      >
        <div>
          <h1 className="text-3xl text-center font-semibold my-2  text-slate-800">
            Administra tus productos
          </h1>
        </div>

        <div className="flex">
          <SearchFilterBar
            searchValue={searchQuery}
            onSearchChange={handleInputChange}
            statusValue={statusFilter}
            onStatusChange={(status) => setStatusFilter(status)}
          />

          <div className="ml-4">
            <AddProduct />
          </div>
        </div>
      </motion.header>

      {isLoading && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="relative flex flex-col gap-4 items-center mt-4"
        >
          <Spinner size={24} />
          <p>Buscando productos...</p>
          <div className="flex flex-wrap justify-center gap-4 w-full">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        </motion.section>
      )}

      <motion.main
        initial={{ opacity: 0, y: 25 }}
        animate={showMain ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="w-full flex flex-col items-center"
        style={{ minHeight: 120 }}
      >
        {noProducts && (
          <p className="text-center text-gray-500 py-10">
            No hay productos disponibles.
          </p>
        )}

        {hasProducts && (
          <>
            <div className="flex flex-wrap justify-center gap-4">
              {currentProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </>
        )}
      </motion.main>
    </div>
  );
}
