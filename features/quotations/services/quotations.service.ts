import { mockQuotations } from "../mocks/quotations.mock";
import type { Quotation, QuotationStatus } from "../types";

let store: Quotation[] = [...mockQuotations];

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function getQuotations(): Promise<Quotation[]> {
  return delay([...store]);
}

export async function getQuotationById(id: string): Promise<Quotation | undefined> {
  return delay(store.find((q) => q.id === id));
}

export async function updateQuotationStatus(
  id: string,
  status: QuotationStatus
): Promise<Quotation | undefined> {
  store = store.map((q) => (q.id === id ? { ...q, status } : q));
  return delay(store.find((q) => q.id === id));
}

export async function getQuotationsByClient(clientId: string): Promise<Quotation[]> {
  return delay(store.filter((q) => q.clientId === clientId));
}