"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";

interface ExportReportButtonProps {
  stats: { label: string; value: string }[];
  conversionRate: number;
  activeSeasonName: string;
}

export function ExportReportButton({ stats, conversionRate, activeSeasonName }: ExportReportButtonProps) {
  function handleExport() {
    const rows = [
      ["Métrica", "Valor"],
      ...stats.map((s) => [s.label, s.value]),
      ["Tasa de conversión", `${conversionRate}%`],
      ["Temporada activa", activeSeasonName],
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reporte-maros-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Reporte exportado");
  }

  return (
    <Button variant="outline" onClick={handleExport}>
      <Download className="h-4 w-4 mr-2" />
      Exportar reporte
    </Button>
  );
}