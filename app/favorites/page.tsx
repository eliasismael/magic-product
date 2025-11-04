import Favorites from "./Favorites";
import { getProducts } from "../functions/getProducts";

export default async function FavoritesPage() {
  const products = await getProducts();

  return <Favorites products={products} />;
}
