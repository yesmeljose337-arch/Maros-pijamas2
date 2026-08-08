"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { toast } from "@/lib/toast";
import { getProducts, deleteProduct } from "../services/products.service";
import { ProductSearch } from "./product-search";
import { ProductFilters } from "./product-filters";
import { ViewToggle } from "./view-toggle";
import { ProductGrid } from "./product-grid";
import { ProductTable } from "./product-table";
import { ProductQuickView } from "./product-quick-view";
import type { Product, ProductStatus } from "../types";

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"grid" | "table">("grid");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("todas");
  const [status, setStatus] = useState<ProductStatus | "todos">("todos");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const data = await getProducts({ search, category, status });
    setProducts(data);
    setLoading(false);
  }, [search, category, status]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  async function confirmDelete() {
    if (!deleteTarget) return;
    await deleteProduct(deleteTarget.id);
    toast.success(`"${deleteTarget.name}" fue eliminado`);
    setDeleteTarget(null);
    fetchProducts();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-foreground">Productos</h1>
          <p className="text-muted-foreground mt-1">Gestiona el catálogo de Maro&apos;s Pijamas</p>
        </div>
        <Button asChild>
          <Link href="/admin/productos/nuevo">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo producto
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <ProductSearch value={search} onChange={setSearch} />
          <ProductFilters
            category={category}
            status={status}
            onCategoryChange={setCategory}
            onStatusChange={setStatus}
          />
        </div>
        <ViewToggle value={view} onChange={setView} />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-lg" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">
          No se encontraron productos con esos filtros.
        </p>
      ) : view === "grid" ? (
        <ProductGrid products={products} onQuickView={setQuickViewProduct} onDelete={setDeleteTarget} />
      ) : (
        <ProductTable products={products} onQuickView={setQuickViewProduct} onDelete={setDeleteTarget} />
      )}

      <ProductQuickView
        product={quickViewProduct}
        onOpenChange={(open) => !open && setQuickViewProduct(null)}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Eliminar producto"
        description={`¿Seguro que quieres eliminar "${deleteTarget?.name}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        onConfirm={confirmDelete}
      />
    </div>
  );
}