import { mockCollections } from "../mocks/collections.mock";
import type { Collection, CollectionId } from "../types";

let collectionsStore: Collection[] = [...mockCollections];

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function getCollections(): Promise<Collection[]> {
  return delay([...collectionsStore]);
}

export async function getCollectionById(id: CollectionId): Promise<Collection | undefined> {
  return delay(collectionsStore.find((c) => c.id === id));
}

export async function updateCollection(
  id: CollectionId,
  data: Partial<Pick<Collection, "description" | "coverImage" | "productIds">>
): Promise<Collection | undefined> {
  collectionsStore = collectionsStore.map((c) => (c.id === id ? { ...c, ...data } : c));
  return delay(collectionsStore.find((c) => c.id === id));
}

import type { Product } from "@/features/products/types";

// Se llama desde el formulario de Producto al guardar, para mantener
// sincronizado Collection.productIds con Product.collectionIds (relación bidireccional).
export async function syncProductCollections(
  productId: string,
  collectionIds: CollectionId[]
): Promise<void> {
  collectionsStore = collectionsStore.map((c) => {
    const shouldHave = collectionIds.includes(c.id);
    const has = c.productIds.includes(productId);
    if (shouldHave && !has) return { ...c, productIds: [...c.productIds, productId] };
    if (!shouldHave && has) return { ...c, productIds: c.productIds.filter((id) => id !== productId) };
    return c;
  });
  return delay(undefined);
}