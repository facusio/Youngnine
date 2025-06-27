import type { ReactElement } from "react";
import type { Product } from "@/types/product";
import ProductGrid from "@/components/ProductGrid";
import { supabase } from "@/utils/supabase";

export default async function ProductsPage(): Promise<ReactElement> {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, image_url");

  if (error) {
    console.error("Error cargando productos:", error);
    return (
      <main className="pt-16 px-6 lg:px-12 bg-white">
        <h2 className="text-3xl font-bold mb-6 mt-8 text-brand">Nuestros productos</h2>
        <p className="text-red-600">No se pudieron cargar los productos.</p>
      </main>
    );
  }

  const products: Product[] = (data ?? []) as Product[];

  return (
    <main className="pt-20 px-6 lg:px-12 bg-white">
      <h2 id="top" className="text-3xl font-bold mb-6 mt-8 text-brand">Nuestros productos</h2>
      <ProductGrid products={products} />
    </main>
  );
}