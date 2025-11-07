"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { ProductCard } from "../components/ProductCard";
import { exportProducts } from "../functions/exportCSV";
import { AddProduct } from "../components/shared/AddProduct";
import MetricCard from "../components/shared/MetricCard";
import { ActionButton } from "../components/shared/ActionButton";
import { Product } from "../types/product";

export default function Dashboard({ products }: { products: Product[] }) {
  const { total, active, inactive, totalStockValue, favorites, userProducts } =
    useMemo(() => {
      const total = products.length;
      const active = products.filter((p) => p.status === "active").length;
      const inactive = products.filter((p) => p.status === "inactive").length;
      const totalStockValue = products.reduce(
        (acc, p) => acc + p.price * p.stock,
        0
      );

      const favorites = products.filter((p) => p.isFavorite);
      const userProducts = products.filter((p) => p.createdByUser);

      return {
        total,
        active,
        inactive,
        totalStockValue,
        favorites,
        userProducts,
      };
    }, [products]);

  const lowStockProducts = useMemo(
    () => products.filter((p) => p.stock > 0 && p.stock < 10),
    [products]
  );

  return (
    <div className="min-h-screen px-4 py-6 md:px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0 }}
        className="mb-8 rounded-3xl bg-linear-to-r from-white/80 to-white/20 backdrop-blur-xl border border-white/40 shadow-[0_20px_50px_rgba(15,23,42,0.03)] px-4 md:px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-semibold text-slate-900 tracking-tight">
            Dashboard
          </h2>
          <p className="text-slate-400 text-sm">
            Visión general del inventario y actividad reciente
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <ActionButton
            onClick={() => exportProducts(products, favorites)}
            label="Exportar CSV"
            className="cursor-pointer rounded-2xl bg-slate-100 text-slate-700 px-4 py-2 text-sm font-medium border border-white hover:bg-white transition"
          />
          <AddProduct />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12 }}
        className="flex flex-wrap gap-5 mb-8"
      >
        <div className="flex-1 min-w-[180px] sm:min-w-[210px]">
          <MetricCard
            label="Productos totales"
            value={total}
            tone="default"
            sub="Incluye activos e inactivos"
          />
        </div>
        <div className="flex-1 min-w-[180px] sm:min-w-[210px]">
          <MetricCard
            label="Activos"
            value={active}
            tone="blue"
            sub="En venta"
          />
        </div>
        <div className="flex-1 min-w-[180px] sm:min-w-[210px]">
          <MetricCard
            label="Inactivos"
            value={inactive}
            tone="muted"
            sub="Pausados"
          />
        </div>
        <div className="flex-1 min-w-[180px] sm:min-w-[210px]">
          <MetricCard
            label="Valor total en stock"
            value={`$${totalStockValue.toFixed(2)}`}
            tone="dark"
            sub="Precio por unidades"
          />
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="flex-1 rounded-3xl bg-linear-to-b from-slate-100 to-slate-200 shadow-[0_16px_40px_rgba(15,23,42,0.03)] border border-white/60 p-5"
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Productos con bajo stock
            </h2>
            <span className="text-xs text-slate-400 bg-slate-100/80 px-3 py-1 rounded-full whitespace-nowrap">
              {lowStockProducts.length} encontrados
            </span>
          </div>

          {lowStockProducts.length === 0 ? (
            <p className="text-sm text-slate-400">
              No hay productos con stock crítico.
            </p>
          ) : (
            <div className="flex flex-wrap gap-4">
              {lowStockProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.28 + i * 0.04,
                  }}
                  className="w-full md:w-[calc(50%-0.5rem)] rounded-2xl border border-slate-100 bg-slate-50/40 hover:bg-white transition shadow-sm"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.28 }}
          className="w-full  lg:w-[330px] shrink-0 rounded-3xl bg-linear-to-tr from-slate-100 to-slate-200 shadow-sm shadow-slate-400 border border-white/60 p-5"
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Últimos agregados
          </h2>
          {userProducts.length === 0 ? (
            <p className="text-sm text-slate-400">
              Aún no agregaste productos manualmente.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {userProducts
                .slice(-5)
                .reverse()
                .map((p, i) => (
                  <motion.li
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: 0.33 + i * 0.03,
                    }}
                    className="flex items-center justify-between rounded-2xl bg-slate-50/70 border border-slate-100 px-3 py-2 gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {p.name}
                      </p>
                      <p className="text-xs text-slate-400">SKU: {p.sku}</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-700 bg-white px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                      ${p.price.toFixed(2)}
                    </span>
                  </motion.li>
                ))}
            </ul>
          )}
        </motion.div>
      </div>
    </div>
  );
}
