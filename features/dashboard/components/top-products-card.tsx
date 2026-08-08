import Link from "next/link";
import { Eye, ImageOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TopProduct } from "../types";

export function TopProductsCard({ products }: { products: TopProduct[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-medium">Productos más vistos</CardTitle>
        <Link href="/admin/productos" className="text-xs text-primary hover:underline">
          Ver reporte →
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {products.map((product, index) => (
          <div key={product.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
            <span className="text-xs text-muted-foreground w-4">{index + 1}</span>
            <div className="h-9 w-9 rounded-md bg-secondary flex items-center justify-center shrink-0">
              <ImageOff className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-sm text-foreground truncate flex-1">{product.name}</p>
            <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <Eye className="h-3.5 w-3.5" />
              {product.views}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}