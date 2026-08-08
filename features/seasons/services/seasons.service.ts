import { mockSeasons } from "../mocks/seasons.mock";
import type { Season } from "../types";

let seasonsStore: Season[] = [...mockSeasons];

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function getSeasons(): Promise<Season[]> {
  return delay([...seasonsStore]);
}

export async function getSeasonById(id: string): Promise<Season | undefined> {
  return delay(seasonsStore.find((s) => s.id === id));
}

export async function createSeason(
  data: Omit<Season, "id" | "slug" | "status">
): Promise<Season> {
  const newSeason: Season = {
    ...data,
    id: `s${Date.now()}`,
    slug: data.name.toLowerCase().replace(/\s+/g, "-"),
    status: "borrador",
  };
  seasonsStore = [newSeason, ...seasonsStore];
  return delay(newSeason);
}

export async function updateSeason(id: string, data: Partial<Season>): Promise<Season | undefined> {
  seasonsStore = seasonsStore.map((s) => (s.id === id ? { ...s, ...data } : s));
  return delay(seasonsStore.find((s) => s.id === id));
}

export async function deleteSeason(id: string): Promise<void> {
  seasonsStore = seasonsStore.filter((s) => s.id !== id);
  return delay(undefined);
}

// Regla de negocio: solo una temporada puede estar activa a la vez.
// Al activar una, cualquier otra que estuviera "activa" pasa a "finalizada".
export async function activateSeason(id: string): Promise<Season[]> {
  seasonsStore = seasonsStore.map((s) => {
    if (s.id === id) return { ...s, status: "activa" as const };
    if (s.status === "activa") return { ...s, status: "finalizada" as const };
    return s;
  });
  return delay([...seasonsStore]);
}