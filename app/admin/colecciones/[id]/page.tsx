"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { getCollectionById } from "@/features/collections/services/collections.service";
import { CollectionForm } from "@/features/collections/components/collection-form";
import { Skeleton } from "@/components/ui/skeleton";
import type { Collection, CollectionId } from "@/features/collections/types";

export default function ColeccionDetallePage() {
  const params = useParams<{ id: string }>();
  const [collection, setCollection] = useState<Collection | null | undefined>(undefined);

  useEffect(() => {
    getCollectionById(params.id as CollectionId).then((data) => setCollection(data ?? null));
  }, [params.id]);

  if (collection === undefined) return <Skeleton className="h-96 w-full rounded-lg" />;
  if (collection === null) notFound();

  return <CollectionForm collection={collection} />;
}