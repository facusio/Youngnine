import ProductCardPreview from "./ProductCardPreview";
import type { Product } from "@/types/product";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCardPreview key={p.id} product={p} />
      ))}
    </div>
  );
}