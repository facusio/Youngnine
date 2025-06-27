import { supabase } from "@/utils/supabase";
import type { Product } from "@/types/product";
import ProductDetailClient from "@/components/ProductDetailClient";

export default async function ProductDetail(props: unknown) {
  const { params } = props as { params: { id: string } };

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    return (
      <main className="pt-28 px-6 lg:px-12 max-w-3xl mx-auto">
        <p className="text-red-600">No se encontró el producto.</p>
      </main>
    );
  }

  const product = data as Product;
  return <ProductDetailClient product={product} />;
}