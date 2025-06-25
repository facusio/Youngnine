"use client";
import { useState } from "react";
import { redirectToWhatsApp } from "@/utils/whatsapp";

export default function ProductCard({ product }: { product: any }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-card flex flex-col gap-3 hover:shadow-lg transition duration-200">
      <img src={product.image_url} alt={product.name} className="rounded-xl object-cover h-64 w-full" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-500 text-sm">${product.price}</p>

      <select value={size} onChange={(e) => setSize(e.target.value)} className="border p-2 rounded">
        {product.sizes.map((s: string) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="border p-2 rounded w-20"
      />

      <button
        onClick={() => redirectToWhatsApp(product.name, size, quantity)}
        className="bg-brand text-white py-2 rounded-xl hover:bg-brand/90 transition shadow-subtle active:scale-95"
      >
        Comprar por WhatsApp
      </button>
    </div>
  );
}