"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductSearch as ClientSearch } from "@/features/products/components/product-search";
import { getClients } from "../services/clients.service";
import { ClientTable } from "./client-table";
import type { Client } from "../types";

export function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getClients().then((data) => {
      setClients(data);
      setLoading(false);
    });
  }, []);

  const filtered = clients.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl text-foreground">Clientes</h1>
        <p className="text-muted-foreground mt-1">Historial de clientes de Maro&apos;s Pijamas</p>
      </div>

      <ClientSearch value={search} onChange={setSearch} />

      {loading ? <Skeleton className="h-96 w-full rounded-lg" /> : <ClientTable clients={filtered} />}
    </div>
  );
}