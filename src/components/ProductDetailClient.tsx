"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import QuantitySelector from "./QuantitySelector";
import { redirectToWhatsApp } from "@/utils/whatsapp";

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0] ?? ""
  );

  return (
    <main className="pt-28 px-6 lg:px-12 max-w-3xl mx-auto">
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>

      <h1 className="text-4xl font-bold mt-6">{product.name}</h1>

      <div className="mt-4">
        <label className="block font-medium">Talles:</label>
        <div className="flex space-x-2 mt-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`
                px-3 py-1 border rounded-full transition
                ${selectedSize === size
                  ? "bg-brand text-white border-brand"
                  : "bg-transparent text-brand border-gray-300"}
                hover:opacity-80
              `}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <QuantitySelector
        onBuy={(qty) =>
          redirectToWhatsApp(product.name, selectedSize, qty)
        }
      />
    </main>
  );
}