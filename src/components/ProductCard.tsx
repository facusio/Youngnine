"use client";
import { useState } from "react";
import { redirectToWhatsApp } from "@/utils/whatsapp";

interface Product {
  id: string;
  name: string;
  price: number;
  sizes: string[];
  image_url: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-card flex flex-col gap-3 hover:shadow-lg transition">
      {/* Imagen con <img> nativo */}
      <div className="rounded-xl overflow-hidden h-64 w-full">
        <img
          src={product.image_url}
          alt={product.name}
          className="object-cover h-full w-full"
        />
      </div>

      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-500 text-sm">${product.price}</p>

      <select
        value={size}
        onChange={(e) => setSize(e.target.value)}
        className="border p-2 rounded"
      >
        {product.sizes.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <input
        type="number"
        min={1}
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