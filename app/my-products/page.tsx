import { getProducts } from "../functions/getProducts";
import MyProducts from "./MyProducts";

export default async function MyProductsPage() {
  const products = await getProducts();

  return <MyProducts products={products} />;
}
