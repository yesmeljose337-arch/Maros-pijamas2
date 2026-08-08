"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { getClientById } from "@/features/clients/services/clients.service";
import { ClientDetail } from "@/features/clients/components/client-detail";
import { Skeleton } from "@/components/ui/skeleton";
import type { Client } from "@/features/clients/types";

export default function ClienteDetallePage() {
  const params = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null | undefined>(undefined);

  useEffect(() => {
    getClientById(params.id).then((data) => setClient(data ?? null));
  }, [params.id]);

  if (client === undefined) return <Skeleton className="h-96 w-full rounded-lg" />;
  if (client === null) notFound();

  return <ClientDetail client={client} />;
}