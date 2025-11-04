import { StaticImageData } from "next/image";

export type Product = {
  id: string | number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: "active" | "inactive";
  imgUrl?: StaticImageData | string;
  createdByUser?: boolean;
  isFavorite?: boolean;
};

export type NoIdProduct = Omit<Product, "id">;
