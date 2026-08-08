import type { CatalogConfig } from "../types";

export const catalogConfigs: CatalogConfig[] = [
  { key: "modelos", label: "Modelos", singularLabel: "modelo", hasImage: true, hasColor: false, hasPriceModifier: false },
  { key: "telas", label: "Telas", singularLabel: "tela", hasImage: true, hasColor: false, hasPriceModifier: true },
  { key: "colores", label: "Colores", singularLabel: "color", hasImage: false, hasColor: true, hasPriceModifier: false },
  { key: "estampados", label: "Estampados", singularLabel: "estampado", hasImage: true, hasColor: false, hasPriceModifier: true },
  { key: "bordados", label: "Bordados", singularLabel: "bordado", hasImage: true, hasColor: false, hasPriceModifier: true },
  { key: "tallas", label: "Tallas", singularLabel: "talla", hasImage: false, hasColor: false, hasPriceModifier: false },
];