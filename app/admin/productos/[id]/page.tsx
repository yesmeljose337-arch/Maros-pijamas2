"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { getProductById } from "@/features/products/services/products.service";
import { ProductForm } from "@/features/products/components/product-form";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/features/products/types";

export default function EditarProductoPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    getProductById(params.id).then((data) => setProduct(data ?? null));
  }, [params.id]);

  if (product === undefined) {
    return <Skeleton className="h-96 w-full rounded-lg" />;
  }

  if (product === null) {
    notFound();
  }

  return <ProductForm mode="edit" initialData={product} />;
}