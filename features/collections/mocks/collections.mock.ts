import type { Collection } from "../types";

export const mockCollections: Collection[] = [
  {
    id: "general",
    name: "General",
    description: "Catálogo permanente de Maro's Pijamas, disponible todo el año.",
    accentHex: "#6B6832",
    productIds: ["p1", "p2", "p6"],
  },
  {
    id: "navidad",
    name: "Navidad",
    description: "Colección de temporada navideña, con estampados y tonos festivos.",
    accentHex: "#B6AE3A",
    productIds: ["p4"],
  },
  {
    id: "dia-madre",
    name: "Día de la Madre",
    description: "Piezas premium pensadas como regalo para el Día de la Madre.",
    accentHex: "#C98BA0",
    productIds: ["p5"],
  },
  {
    id: "san-valentin",
    name: "San Valentín",
    description: "Edición especial de San Valentín en tonos románticos.",
    accentHex: "#B3453A",
    productIds: [],
  },
  {
    id: "halloween",
    name: "Halloween",
    description: "Colección temática de Halloween, edición limitada.",
    accentHex: "#C97A3A",
    productIds: [],
  },
  {
    id: "dia-padre",
    name: "Día del Padre",
    description: "Selección de batas y conjuntos para el Día del Padre.",
    accentHex: "#4A6B7A",
    productIds: ["p3"],
  },
];