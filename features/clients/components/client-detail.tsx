"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getQuotationsByClient } from "@/features/quotations/services/quotations.service";
import { QuotationStatusBadge } from "@/features/quotations/components/quotation-status-badge";
import type { Client } from "../types";
import type { Quotation } from "@/features/quotations/types";

export function ClientDetail({ client }: { client: Client }) {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuotationsByClient(client.id).then((data) => {
      setQuotations(data);
      setLoading(false);
    });
  }, [client.id]);

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="font-heading text-3xl text-foreground">{client.name}</h1>
        <p className="text-muted-foreground mt-1">
          {client.phone} · {client.city}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">
            Historial de cotizaciones ({quotations.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {loading ? (
            <Skeleton className="h-20 w-full rounded-lg" />
          ) : quotations.length === 0 ? (
            <p className="text-sm text-muted-foreground">Sin cotizaciones registradas.</p>
          ) : (
            quotations.map((q) => (
              <div key={q.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                <div>
                  <p className="text-sm text-foreground">
                    {q.items.map((i) => i.productName).join(", ")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{q.createdAt}</p>
                </div>
                <QuotationStatusBadge status={q.status} />
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}