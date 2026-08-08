import { ClipboardList, Users, ShoppingBag, Eye } from "lucide-react";
import type {
  DashboardStat,
  SalesVsQuotationsPoint,
  TopProduct,
  RecentQuotation,
} from "../types";

export const mockStats: DashboardStat[] = [
  { id: "quotations", label: "Cotizaciones nuevas", value: "24", change: "+12%", trend: "up", icon: ClipboardList },
  { id: "clients", label: "Clientes nuevos", value: "8", change: "+5%", trend: "up", icon: Users },
  { id: "products", label: "Productos activos", value: "156", change: "+3", trend: "up", icon: ShoppingBag },
  { id: "visits", label: "Visitas del sitio", value: "1,204", change: "-4%", trend: "down", icon: Eye },
];

export const mockSalesVsQuotations: SalesVsQuotationsPoint[] = [
  { day: "Lun", ventas: 3, cotizaciones: 4 },
  { day: "Mar", ventas: 5, cotizaciones: 7 },
  { day: "Mié", ventas: 2, cotizaciones: 3 },
  { day: "Jue", ventas: 6, cotizaciones: 8 },
  { day: "Vie", ventas: 4, cotizaciones: 6 },
  { day: "Sáb", ventas: 8, cotizaciones: 10 },
  { day: "Dom", ventas: 3, cotizaciones: 5 },
];

export const mockConversionRate = 68;

export const mockMonthlySales = {
  amount: "$12.450.000",
  changePercent: "+18%",
};

export const mockTopProducts: TopProduct[] = [
  { id: "1", name: "Pijama Satín Beige", sales: 42, views: 120, emoji: "🌙" },
  { id: "2", name: "Conjunto Algodón Marfil", sales: 35, views: 98, emoji: "☁️" },
  { id: "3", name: "Bata Verde Oliva", sales: 28, views: 87, emoji: "🫒" },
  { id: "4", name: "Pijama Estampado Navideño", sales: 21, views: 63, emoji: "✨" },
  { id: "5", name: "Set Dorado Premium", sales: 17, views: 49, emoji: "🌟" },
];

export const mockRecentQuotations: RecentQuotation[] = [
  { id: "1", clientName: "María López", product: "Pijama Satín Beige", status: "nueva", date: "Hoy" },
  { id: "2", clientName: "Carla Ramírez", product: "Conjunto Algodón Marfil", status: "en_revision", date: "Hoy" },
  { id: "3", clientName: "Sofía Torres", product: "Set Dorado Premium", status: "contactada", date: "Ayer" },
  { id: "4", clientName: "Ana Herrera", product: "Bata Verde Oliva", status: "cotizada", date: "Ayer" },
  { id: "5", clientName: "Laura Gómez", product: "Pijama Estampado Navideño", status: "aceptada", date: "2 días" },
];

export const mockActiveSeason = {
  name: "Navidad 2026",
  collection: "Colección Navideña",
  collectionId: "navidad",
  startDate: "2026-11-15",
  endDate: "2026-12-31",
};