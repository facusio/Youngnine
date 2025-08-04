"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import NewProductForm from "@/components/NewProductForm";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

export default function AdminDashboard() {
  const supabase = createClientComponentClient();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
    const sub = supabase
      .channel("public:products")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => fetchProducts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(sub);
    };
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.error("Error cargando productos:", error.message);
    else setProducts(data);
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>

      <NewProductForm onCreated={fetchProducts} />

      <table className="w-full mt-8 table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Precio</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="px-4 py-2 border">{p.name}</td>
              <td className="px-4 py-2 border">${p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}