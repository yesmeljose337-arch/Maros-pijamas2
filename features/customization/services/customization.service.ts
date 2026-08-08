import { mockCatalogItems } from "../mocks/customization.mock";
import type { CatalogItem, CatalogKey } from "../types";

let store: CatalogItem[] = [...mockCatalogItems];

function delay<T>(data: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function getCatalogItems(catalog: CatalogKey): Promise<CatalogItem[]> {
  return delay(store.filter((item) => item.catalog === catalog));
}

export async function createCatalogItem(
  data: Omit<CatalogItem, "id">
): Promise<CatalogItem> {
  const newItem: CatalogItem = { ...data, id: `${data.catalog}-${Date.now()}` };
  store = [...store, newItem];
  return delay(newItem);
}

export async function updateCatalogItem(
  id: string,
  data: Partial<CatalogItem>
): Promise<CatalogItem | undefined> {
  store = store.map((item) => (item.id === id ? { ...item, ...data } : item));
  return delay(store.find((item) => item.id === id));
}

export async function deleteCatalogItem(id: string): Promise<void> {
  store = store.filter((item) => item.id !== id);
  return delay(undefined);
}