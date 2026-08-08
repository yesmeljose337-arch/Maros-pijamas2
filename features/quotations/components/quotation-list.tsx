"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getQuotations } from "../services/quotations.service";
import { getClients } from "@/features/clients/services/clients.service";
import { QuotationTable } from "./quotation-table";
import { QuotationDetailPanel } from "./quotation-detail-panel";
import { QUOTATION_STATUSES } from "../types";
import type { Quotation, QuotationStatus } from "../types";

export function QuotationList() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [clientCities, setClientCities] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Quotation | null>(null);
  const [statusFilter, setStatusFilter] = useState<QuotationStatus | "todos">("todos");

  useEffect(() => {
    getQuotations().then((data) => {
      setQuotations(data);
      setLoading(false);
    });
    getClients().then((clients) => {
      const map: Record<string, string> = {};
      clients.forEach((c) => {
        map[c.id] = c.city;
      });
      setClientCities(map);
    });
  }, []);

  function handleStatusChange(id: string, status: QuotationStatus) {
    setQuotations((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
    setSelected((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
  }

  const filtered =
    statusFilter === "todos" ? quotations : quotations.filter((q) => q.status === statusFilter);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-foreground">Cotizaciones</h1>
          <p className="text-muted-foreground mt-1">Solicitudes recibidas desde el sitio público</p>
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as QuotationStatus | "todos")}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            {QUOTATION_STATUSES.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <Skeleton className="h-96 w-full rounded-lg" />
      ) : (
        <QuotationTable quotations={filtered} clientCities={clientCities} onRowClick={setSelected} />
      )}

      <QuotationDetailPanel
        quotation={selected}
        onOpenChange={(open) => !open && setSelected(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}