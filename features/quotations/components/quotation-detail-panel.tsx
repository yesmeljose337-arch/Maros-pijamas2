"use client";

import { MessageCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { QuotationStatusSelect } from "./quotation-status-select";
import { buildWhatsAppLink } from "../utils/whatsapp";
import { updateQuotationStatus } from "../services/quotations.service";
import { toast } from "@/lib/toast";
import type { Quotation, QuotationStatus } from "../types";

interface QuotationDetailPanelProps {
  quotation: Quotation | null;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (id: string, status: QuotationStatus) => void;
}

export function QuotationDetailPanel({
  quotation,
  onOpenChange,
  onStatusChange,
}: QuotationDetailPanelProps) {
  if (!quotation) return null;

  async function handleStatusChange(status: QuotationStatus) {
    if (!quotation) return;
    await updateQuotationStatus(quotation.id, status);
    onStatusChange(quotation.id, status);
    toast.success("Estado de la cotización actualizado");
  }

  return (
    <Sheet open={!!quotation} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading">{quotation.clientName}</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4 pb-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1.5">Estado</p>
            <QuotationStatusSelect value={quotation.status} onChange={handleStatusChange} />
          </div>

<div>
  <p className="text-xs text-muted-foreground mb-2">Productos solicitados</p>
  <div className="flex flex-col gap-2">
    {quotation.items.map((item, i) => (
      <div key={i} className="rounded-md bg-secondary p-3">
        <p className="text-sm text-foreground">{item.productName}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground mt-1">
          {item.modelo && <span>Modelo: {item.modelo}</span>}
          {item.size && <span>Talla: {item.size}</span>}
          {item.color && <span>Color: {item.color}</span>}
          {item.tela && <span>Tela: {item.tela}</span>}
          {item.estampado && <span>Estampado: {item.estampado}</span>}
          {item.bordado && <span>Bordado: {item.bordado}</span>}
          <span>Cantidad: {item.quantity}</span>
        </div>
      </div>
    ))}
  </div>
</div>

{quotation.referenceImages.length > 0 && (
  <div>
    <p className="text-xs text-muted-foreground mb-2">Imágenes de referencia del cliente</p>
    <div className="grid grid-cols-3 gap-2">
      {quotation.referenceImages.map((img, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i} src={img} alt={`Referencia ${i + 1}`} className="aspect-square rounded-md object-cover border border-border" />
      ))}
    </div>
  </div>
)}

          <Button asChild className="mt-2">
            <a href={buildWhatsAppLink(quotation)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4 mr-2" />
              Abrir WhatsApp
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}