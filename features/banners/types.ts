export const BANNER_POSITIONS = ["Home - Superior", "Home - Medio", "Página de producto", "Checkout"] as const;

export interface Banner {
  id: string;
  title: string;
  image?: string;
  linkUrl: string;
  position: string;
  active: boolean;
}