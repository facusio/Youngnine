import ProductGrid from "@/components/ProductGrid";
import { supabase } from "@/utils/supabase";
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { gender?: string };
}) {
    let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const g = searchParams.gender;
  if (g === "Hombre") {
    query = query.in("gender", ["Hombre", "Unisex"]);
  } else if (g === "Mujer") {
    query = query.in("gender", ["Mujer", "Unisex"]);
  }

  const { data: products, error } = await query;
  if (error) {
    console.error("Error cargando productos:", error);
    return <p className="p-4 text-red-600">No se pudieron cargar los productos.</p>;
  }

  return (
    <div id="top" className="pt-24 p-6 bg-white">
      <h2 className="text-3xl font-bold mb-6 text-brand">Nuestros productos</h2>
      <ProductGrid products={products ?? []} />
    </div>
  );
}