import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

export default function ProductCardPreview({ product }: { product: Product }) {
    return (
        <Link href={`/products/${product.id}`} className="block bg-white rounded-xl overflow-hidden shadow-card hover:shadow-lg transition">
            <div className="relative w-full h-64">
                <Image src={product.image_url} alt={product.name} fill className="object-cover" />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500 text-sm">${product.price}</p>
            </div>
        </Link>
    );
}