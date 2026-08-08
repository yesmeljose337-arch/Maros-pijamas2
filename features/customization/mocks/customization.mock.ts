import type { CatalogItem } from "../types";

export const mockCatalogItems: CatalogItem[] = [
  // Modelos
  { id: "mo1", catalog: "modelos", name: "Clásico dos piezas" },
  { id: "mo2", catalog: "modelos", name: "Camisón largo" },
  { id: "mo3", catalog: "modelos", name: "Short + top" },

  // Telas
  { id: "te1", catalog: "telas", name: "Algodón Pima", priceModifier: 0 },
  { id: "te2", catalog: "telas", name: "Satín", priceModifier: 20000 },
  { id: "te3", catalog: "telas", name: "Franela", priceModifier: 10000 },

  // Colores
  { id: "co1", catalog: "colores", name: "Verde Oliva", hex: "#6B6832" },
  { id: "co2", catalog: "colores", name: "Beige", hex: "#EFE8D8" },
  { id: "co3", catalog: "colores", name: "Marfil", hex: "#FAF8F4" },
  { id: "co4", catalog: "colores", name: "Dorado", hex: "#B6AE3A" },

  // Estampados
  { id: "es1", catalog: "estampados", name: "Liso", priceModifier: 0 },
  { id: "es2", catalog: "estampados", name: "Floral sutil", priceModifier: 12000 },

  // Bordados
  { id: "bo1", catalog: "bordados", name: "Iniciales", priceModifier: 15000 },
  { id: "bo2", catalog: "bordados", name: "Nombre completo", priceModifier: 22000 },

  // Tallas
  { id: "ta1", catalog: "tallas", name: "XS" },
  { id: "ta2", catalog: "tallas", name: "S" },
  { id: "ta3", catalog: "tallas", name: "M" },
  { id: "ta4", catalog: "tallas", name: "L" },
  { id: "ta5", catalog: "tallas", name: "XL" },
];