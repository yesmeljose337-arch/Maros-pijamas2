export type CatalogKey =
  | "modelos"
  | "telas"
  | "colores"
  | "estampados"
  | "bordados"
  | "tallas";

export interface CatalogItem {
  id: string;
  catalog: CatalogKey;
  name: string;
  image?: string;
  hex?: string;
  priceModifier?: number;
}

export interface CatalogConfig {
  key: CatalogKey;
  label: string;
  singularLabel: string;
  hasImage: boolean;
  hasColor: boolean;
  hasPriceModifier: boolean;
}