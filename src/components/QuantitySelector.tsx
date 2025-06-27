"use client";
import { useState } from "react";

export default function QuantitySelector({ onBuy }: { onBuy: (qty: number) => void }) {
    const [quantity, setQuantity] = useState<number>(1);
    const valid = quantity >= 1;

    return (
        <div className="mt-6 flex items-center space-x-4">
            <input 
                type="number"
                value={quantity ===0 ? "" : quantity}
                min={1}
                onChange={e => setQuantity(e.target.value ? Math.max(1, Number(e.target.value)) : 0)}
                className="w-20 border p-2 rounded"
            />
            <button
                disabled={!valid}
                onClick={() => onBuy(quantity)} 
                className={`px-6 py-2 rounded-full font-semibold transition ${ valid ? "bg-[#25D366] text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
            >
                Comprar
            </button>
        </div>
    )
}