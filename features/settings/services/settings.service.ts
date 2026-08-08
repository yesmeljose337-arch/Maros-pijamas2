import { mockSiteSettings } from "../mocks/settings.mock";
import type { SiteSettings } from "../types";

let store: SiteSettings = { ...mockSiteSettings };

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return delay({ ...store });
}

export async function updateSiteSettings(patch: Partial<SiteSettings>): Promise<SiteSettings> {
  store = { ...store, ...patch };
  return delay({ ...store });
}