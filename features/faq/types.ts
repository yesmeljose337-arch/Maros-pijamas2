export type FaqStatus = "publicada" | "borrador";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: FaqStatus;
}

export const FAQ_CATEGORIES = ["General", "Envíos", "Personalización", "Pagos", "Devoluciones"] as const;