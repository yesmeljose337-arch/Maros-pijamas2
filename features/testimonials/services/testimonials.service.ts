import { mockTestimonials } from "../mocks/testimonials.mock";
import type { Testimonial } from "../types";

let store: Testimonial[] = [...mockTestimonials];

function delay<T>(data: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return delay([...store]);
}

export async function createTestimonial(data: Omit<Testimonial, "id" | "status">): Promise<Testimonial> {
  const newItem: Testimonial = { ...data, id: `t${Date.now()}`, status: "publicado" };
  store = [newItem, ...store];
  return delay(newItem);
}

export async function toggleTestimonialVisibility(id: string): Promise<Testimonial | undefined> {
  store = store.map((t) =>
    t.id === id ? { ...t, status: t.status === "publicado" ? "oculto" : "publicado" } : t
  );
  return delay(store.find((t) => t.id === id));
}

export async function deleteTestimonial(id: string): Promise<void> {
  store = store.filter((t) => t.id !== id);
  return delay(undefined);
}