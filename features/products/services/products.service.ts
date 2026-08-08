import { mockProducts } from "../mocks/products.mock";
import type { Product, ProductFilters } from "../types";

// Copia mutable en memoria. Se pierde al recargar — se reemplaza por
// llamadas reales a Maros.Api en la fase de integración con backend.
let productsStore: Product[] = [...mockProducts];

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function getProducts(filters?: Partial<ProductFilters>): Promise<Product[]> {
  let result = [...productsStore];

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(q));
  }
  if (filters?.category && filters.category !== "todas") {
    result = result.filter((p) => p.category === filters.category);
  }
  if (filters?.status && filters.status !== "todos") {
    result = result.filter((p) => p.status === filters.status);
  }

  return delay(result);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return delay(productsStore.find((p) => p.id === id));
}

export async function createProduct(
  data: Omit<Product, "id" | "slug" | "createdAt">
): Promise<Product> {
  const newProduct: Product = {
    ...data,
    id: `p${Date.now()}`,
    slug: data.name.toLowerCase().replace(/\s+/g, "-"),
    createdAt: new Date().toISOString().slice(0, 10),
  };
  productsStore = [newProduct, ...productsStore];
  return delay(newProduct);
}

export async function updateProduct(
  id: string,
  data: Partial<Product>
): Promise<Product | undefined> {
  productsStore = productsStore.map((p) => (p.id === id ? { ...p, ...data } : p));
  return delay(productsStore.find((p) => p.id === id));
}

export async function deleteProduct(id: string): Promise<void> {
  productsStore = productsStore.filter((p) => p.id !== id);
  return delay(undefined);
}