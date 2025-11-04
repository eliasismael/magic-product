"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "../components/ProductCard";
import { Product } from "../types/product";

function Favorites({ products }: { products: Product[] }) {
  const favorites = useMemo(
    () => products.filter((p) => p.isFavorite),
    [products]
  );

  const hasFavorites = favorites.length > 0;

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0 }}
        className="w-full max-w-6xl px-4 mt-6 mb-4 text-center"
      >
        <h2 className="text-3xl my-2 font-semibold text-slate-900">
          Favoritos
        </h2>
        <p className="text-sm text-slate-500">
          Productos que marcaste como favoritos
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="w-full max-w-6xl px-4 pb-10"
      >
        {!hasFavorites ? (
          <p className="text-center text-gray-500 py-10">
            No hay productos favoritos todavía.
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {favorites.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: 0.2 + idx * 0.03,
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Favorites;
