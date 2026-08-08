import { mockBanners } from "../mocks/banners.mock";
import type { Banner } from "../types";

let store: Banner[] = [...mockBanners];

function delay<T>(data: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function getBanners(): Promise<Banner[]> {
  return delay([...store]);
}

export async function createBanner(data: Omit<Banner, "id">): Promise<Banner> {
  const newBanner: Banner = { ...data, id: `ba${Date.now()}` };
  store = [...store, newBanner];
  return delay(newBanner);
}

export async function updateBanner(id: string, data: Partial<Banner>): Promise<Banner | undefined> {
  store = store.map((b) => (b.id === id ? { ...b, ...data } : b));
  return delay(store.find((b) => b.id === id));
}

export async function deleteBanner(id: string): Promise<void> {
  store = store.filter((b) => b.id !== id);
  return delay(undefined);
}