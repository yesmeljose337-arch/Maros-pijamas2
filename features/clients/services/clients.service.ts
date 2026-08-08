import { mockClients } from "../mocks/clients.mock";
import type { Client } from "../types";

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function getClients(): Promise<Client[]> {
  return delay([...mockClients]);
}

export async function getClientById(id: string): Promise<Client | undefined> {
  return delay(mockClients.find((c) => c.id === id));
}