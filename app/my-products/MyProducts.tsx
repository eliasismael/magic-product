"use client";

import { motion } from "framer-motion";
import { ProductCard } from "../components/ProductCard";
import { Product } from "../types/product";

function MyProducts({ products }: { products: Product[] }) {
  const myProducts = products.filter((p) => p.createdByUser);
  const hasProducts = myProducts.length > 0;

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0 }}
        className="w-full max-w-6xl px-4 mt-6 mb-4 text-center"
      >
        <h1 className="text-3xl my-2 font-semibold text-slate-900">
          Mis Productos
        </h1>
        <p className="text-sm text-slate-500">
          Productos que agregaste manualmente
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="w-full max-w-6xl px-4 pb-10"
      >
        {!hasProducts ? (
          <p className="text-center text-gray-500 py-10">
            No hay productos agregados todavía.
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {myProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
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

export default MyProducts;
