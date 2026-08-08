import type { Quotation } from "../types";

export function buildWhatsAppLink(quotation: Quotation): string {
  const cleanPhone = quotation.clientPhone.replace(/\D/g, "");
  const itemsText = quotation.items
    .map((i) => {
      const details = [i.size, i.color, i.tela, i.estampado, i.bordado].filter(Boolean).join(" / ");
      return `- ${i.productName} (${details}) x${i.quantity}`;
    })
    .join("%0A");

  const message = `Hola ${quotation.clientName}, te escribimos de Maro's Pijamas sobre tu cotización:%0A${itemsText}`;

  return `https://wa.me/57${cleanPhone}?text=${message}`;
}