export type CollectionId =
  | "general"
  | "navidad"
  | "dia-madre"
  | "san-valentin"
  | "halloween"
  | "dia-padre";

export interface Collection {
  id: CollectionId;
  name: string;
  description: string;
  coverImage?: string;
  accentHex: string;
  productIds: string[];
}