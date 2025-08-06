"use client";
import { useState, useEffect, useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import NewProductForm from "./NewProductForm";

interface Product {
  id: string;
  name: string;
  price: number;
}

export default function AdminDashboardClient({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const supabase = createClientComponentClient();

  const fetchProducts = useCallback(async () => {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  }, [supabase]);

  useEffect(() => {
    fetchProducts();
    const channel = supabase
      .channel("public:products")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProducts, supabase]);

  const handleCreated = () => {
    fetchProducts();
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>

      <NewProductForm onCreated={handleCreated} />

      <table className="w-full mt-8 table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Nombre</th>
            <th className="border px-4 py-2 text-left">Precio</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">${p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}