import type { FaqItem } from "../types";

export const mockFaqItems: FaqItem[] = [
  { id: "f1", question: "¿Cuánto tiempo tarda el pedido?", answer: "El tiempo promedio de entrega es de 7 a 15 días hábiles dependiendo de la personalización.", category: "Envíos", order: 1, status: "publicada" },
  { id: "f2", question: "¿Puedo elegir el tipo de tela?", answer: "Sí, puedes elegir entre algodón pima, satín, franela y más desde el personalizador.", category: "Personalización", order: 2, status: "publicada" },
  { id: "f3", question: "¿Hacen envíos a todo Colombia?", answer: "Sí, realizamos envíos a nivel nacional con transportadoras aliadas.", category: "Envíos", order: 3, status: "publicada" },
  { id: "f4", question: "¿Puedo personalizar con mi nombre o iniciales?", answer: "Sí, ofrecemos bordado de iniciales o nombre completo con costo adicional.", category: "Personalización", order: 4, status: "publicada" },
  { id: "f5", question: "¿Aceptan pedidos al por mayor para empresas?", answer: "Sí, contamos con planes especiales para pedidos corporativos.", category: "General", order: 5, status: "borrador" },
];