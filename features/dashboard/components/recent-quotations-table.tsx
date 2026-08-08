import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { QuotationStatusBadge } from "@/features/quotations/components/quotation-status-badge";
import type { RecentQuotation } from "../types";

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export function RecentQuotationsTable({ quotations }: { quotations: RecentQuotation[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-medium">Cotizaciones recientes</CardTitle>
        <Link href="/admin/cotizaciones" className="text-xs text-primary hover:underline">
          Ver todos →
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {quotations.map((q) => (
          <div key={q.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                {initials(q.clientName)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-foreground truncate">{q.clientName}</p>
              <p className="text-xs text-muted-foreground truncate">{q.product} · {q.date}</p>
            </div>
            <QuotationStatusBadge status={q.status} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}