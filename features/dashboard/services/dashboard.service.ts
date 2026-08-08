import {
  mockStats,
  mockSalesVsQuotations,
  mockConversionRate,
  mockTopProducts,
  mockRecentQuotations,
  mockActiveSeason,
} from "../mocks/dashboard.mock";
import type { DashboardData } from "../types";

// Simula latencia de red. Se elimina cuando esto llame a Maros.Api.
function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function getDashboardData(): Promise<DashboardData> {
  return delay({
    stats: mockStats,
    salesVsQuotations: mockSalesVsQuotations,
    conversionRate: mockConversionRate,
    topProducts: mockTopProducts,
    recentQuotations: mockRecentQuotations,
    activeSeason: mockActiveSeason,
  });
}