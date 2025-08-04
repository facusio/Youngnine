"use client";
import { useState } from "react";
import { supabase } from "@/utils/supabase";

const AVAILABLE_SIZES = ["S", "M", "L", "XL"];

export default function NewProductForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [error, setError] = useState("");

  function toggleSize(size: string) {
    setSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  }

  const handleCreate = async () => {
    const payload = {
      name,
      price: parseInt(price, 10),
      image_url: imageUrl,
      sizes,
    };

    const { error } = await supabase.from("products").insert(payload).select();

    if (error) {
      console.error("Error al crear producto:", error.message, error.details);
      setError(error.message);
    } else {
      setError("");
      setName("");
      setPrice("");
      setImageUrl("");
      setSizes([]);
      onCreated();
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded">
      {error && <p className="text-red-600">{error}</p>}
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full border px-2 py-1 rounded"
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={e => setPrice(e.target.value.replace(/^0+/, ""))}
        className="w-full border px-2 py-1 rounded"
      />
      <input
        type="text"
        placeholder="URL de la imagen"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        className="w-full border px-2 py-1 rounded"
      />
      <div>
        <label className="block font-medium mb-1">Talles disponibles:</label>
        <div className="flex gap-2">
          {AVAILABLE_SIZES.map(size => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`px-3 py-1 border rounded-full ${
                sizes.includes(size)
                  ? "bg-brand text-white"
                  : "bg-white text-brand"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={handleCreate}
        className="w-full bg-green-500 text-white py-2 rounded"
        disabled={!name || !price || !imageUrl || sizes.length === 0}
      >
        Crear producto
      </button>
    </div>
  );
}