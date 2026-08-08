import { mockFaqItems } from "../mocks/faq.mock";
import type { FaqItem } from "../types";

let store: FaqItem[] = [...mockFaqItems];

function delay<T>(data: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function getFaqItems(): Promise<FaqItem[]> {
  return delay([...store].sort((a, b) => a.order - b.order));
}

export async function createFaqItem(data: Omit<FaqItem, "id" | "order">): Promise<FaqItem> {
  const newItem: FaqItem = { ...data, id: `f${Date.now()}`, order: store.length + 1 };
  store = [...store, newItem];
  return delay(newItem);
}

export async function updateFaqItem(id: string, data: Partial<FaqItem>): Promise<FaqItem | undefined> {
  store = store.map((item) => (item.id === id ? { ...item, ...data } : item));
  return delay(store.find((item) => item.id === id));
}

export async function deleteFaqItem(id: string): Promise<void> {
  store = store.filter((item) => item.id !== id);
  return delay(undefined);
}

export async function reorderFaqItem(id: string, direction: "up" | "down"): Promise<void> {
  const sorted = [...store].sort((a, b) => a.order - b.order);
  const index = sorted.findIndex((item) => item.id === id);
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= sorted.length) return delay(undefined);

  const currentOrder = sorted[index].order;
  sorted[index].order = sorted[targetIndex].order;
  sorted[targetIndex].order = currentOrder;
  store = sorted;
  return delay(undefined);
}