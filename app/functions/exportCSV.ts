import { Product } from "../types/product";

export const exportProducts = (
  allProducts: Product[],
  favProducts: Product[]
) => {
  const favIds = new Set(favProducts.map((p) => p.id));

  const headers = [
    "id",
    "name",
    "sku",
    "price",
    "stock",
    "status",
    "isFavorite",
    "createdByUser",
  ];

  const rows = allProducts.map((p) => {
    const isFavorite = favIds.has(p.id);
    return [
      p.id,
      p.name,
      p.sku,
      p.price,
      p.stock,
      p.status,
      isFavorite ? "yes" : "no",
      p.createdByUser ? "yes" : "no",
    ];
  });

  const csvContent = [headers, ...rows]
    .map((row) =>
      row
        .map((value) =>
          typeof value === "string" && value.includes(",")
            ? `"${value}"`
            : value
        )
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "productos.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
