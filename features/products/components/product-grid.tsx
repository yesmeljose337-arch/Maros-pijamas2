import { ProductCard } from "./product-card";
import type { Product } from "../types";

interface ProductGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductGrid({ products, onQuickView, onDelete }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onQuickView={() => onQuickView(p)} onDelete={() => onDelete(p)} />
      ))}
    </div>
  );
}