import {
  mockStats,
  mockSalesVsQuotations,
  mockConversionRate,
  mockMonthlySales,
  mockTopProducts,
  mockRecentQuotations,
  mockActiveSeason,
} from "../mocks/dashboard.mock";
import type { DashboardData } from "../types";

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function getDashboardData(): Promise<DashboardData> {
  return delay({
    stats: mockStats,
    salesVsQuotations: mockSalesVsQuotations,
    conversionRate: mockConversionRate,
    monthlySales: mockMonthlySales,
    topProducts: mockTopProducts,
    recentQuotations: mockRecentQuotations,
    activeSeason: mockActiveSeason,
  });
}