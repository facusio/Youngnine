"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface NewProductFormProps {
  onCreated: () => void;
}

const AVAILABLE_SIZES = ["S", "M", "L", "XL"] as const;

export default function NewProductForm({ onCreated }: NewProductFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [error, setError] = useState("");
  const supabase = createClientComponentClient();

  function toggleSize(size: string) {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }

  const handleCreate = async () => {
    if (!name || !price || !imageUrl || sizes.length === 0) {
      setError("Completa todos los campos.");
      return;
    }
    const payload = {
      name,
      price: parseInt(price, 10),
      image_url: imageUrl,
      sizes,
    };

    const { error: supaError } = await supabase.from("products").insert(payload);
    if (supaError) {
      setError(supaError.message);
    } else {
      // limpiar form
      setName("");
      setPrice("");
      setImageUrl("");
      setSizes([]);
      setError("");
      onCreated();
    }
  };

  return (
    <div className="mb-8 p-4 border rounded">
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="URL de la imagen"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <div className="flex space-x-2 mb-4">
        {AVAILABLE_SIZES.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => toggleSize(size)}
            className={`px-3 py-1 border rounded-full ${
              sizes.includes(size) ? "bg-black text-white" : ""
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      <button
        onClick={handleCreate}
        className="w-full bg-green-500 text-white py-2 rounded"
      >
        Crear producto
      </button>
    </div>
  );
}