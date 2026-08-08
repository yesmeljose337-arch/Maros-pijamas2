"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { getSeasonById } from "@/features/seasons/services/seasons.service";
import { SeasonForm } from "@/features/seasons/components/season-form";
import { Skeleton } from "@/components/ui/skeleton";
import type { Season } from "@/features/seasons/types";

export default function TemporadaDetallePage() {
  const params = useParams<{ id: string }>();
  const [season, setSeason] = useState<Season | null | undefined>(undefined);

  useEffect(() => {
    getSeasonById(params.id).then((data) => setSeason(data ?? null));
  }, [params.id]);

  if (season === undefined) return <Skeleton className="h-96 w-full rounded-lg" />;
  if (season === null) notFound();

  return <SeasonForm mode="edit" initialData={season} />;
}