import type { LucideIcon } from "lucide-react";

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

export interface SalesVsQuotationsPoint {
  day: string;
  ventas: number;
  cotizaciones: number;
}

export interface TopProduct {
  id: string;
  name: string;
  sales: number;
  views: number;
  emoji: string;
}

export type QuotationStatus =
  | "nueva"
  | "en_revision"
  | "contactada"
  | "cotizada"
  | "aceptada"
  | "rechazada"
  | "archivada";

export interface RecentQuotation {
  id: string;
  clientName: string;
  product: string;
  status: QuotationStatus;
  date: string;
}

export interface DashboardData {
  stats: DashboardStat[];
  salesVsQuotations: SalesVsQuotationsPoint[];
  conversionRate: number;
  monthlySales: { amount: string; changePercent: string };
  topProducts: TopProduct[];
  recentQuotations: RecentQuotation[];
  activeSeason: {
    name: string;
    collection: string;
    collectionId: string;
    startDate: string;
    endDate: string;
  };
}