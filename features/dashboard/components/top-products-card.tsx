import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TopProduct } from "../types";

export function TopProductsCard({ products }: { products: TopProduct[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Productos populares</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center gap-3 py-2 border-b border-border last:border-0"
          >
            <span className="text-xs text-muted-foreground w-4">{index + 1}</span>
            <div className="h-9 w-9 rounded-md bg-secondary flex items-center justify-center text-base shrink-0">
              {product.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-foreground truncate">{product.name}</p>
              <p className="text-xs text-muted-foreground">{product.sales} ventas</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}