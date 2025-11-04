import { getProducts } from "../functions/getProducts";
import Dashboard from "./Dashboard";

export default async function DashboardPage() {
  const products = await getProducts();

  return <Dashboard products={products} />;
}
