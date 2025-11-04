import { ProductList } from "./components/ProductsList";
import { getProducts } from "./functions/getProducts";

export default async function Home() {
  const products = await getProducts();
  return (
    <div className="mx-auto mb-8 px-20 flex flex-col items-center justify-center">
      <ProductList products={products} />
    </div>
  );
}
