import { mockGalleryImages } from "../mocks/gallery.mock";
import type { GalleryImage, GalleryCategory } from "../types";

let store: GalleryImage[] = [...mockGalleryImages];

function delay<T>(data: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function getGalleryImages(category?: GalleryCategory): Promise<GalleryImage[]> {
  const data = category ? store.filter((img) => img.category === category) : store;
  return delay([...data]);
}

export async function addGalleryImage(data: Omit<GalleryImage, "id">): Promise<GalleryImage> {
  const newImage: GalleryImage = { ...data, id: `g${Date.now()}` };
  store = [newImage, ...store];
  return delay(newImage);
}

export async function deleteGalleryImage(id: string): Promise<void> {
  store = store.filter((img) => img.id !== id);
  return delay(undefined);
}