import { Badge } from "@/components/ui/badge";
import type { QuotationStatus } from "../types";

const config: Record<QuotationStatus, { label: string; className: string }> = {
  nueva: { label: "Nueva", className: "bg-accent text-accent-foreground" },
  en_revision: { label: "En revisión", className: "bg-secondary text-secondary-foreground" },
  contactada: { label: "Contactada", className: "bg-primary/15 text-primary" },
  cotizada: { label: "Cotizada", className: "bg-primary/30 text-primary" },
  aceptada: { label: "Aceptada", className: "bg-primary text-primary-foreground" },
  rechazada: { label: "Rechazada", className: "bg-destructive/15 text-destructive" },
  archivada: { label: "Archivada", className: "bg-muted text-muted-foreground" },
};

export function QuotationStatusBadge({ status }: { status: QuotationStatus }) {
  return <Badge className={config[status].className}>{config[status].label}</Badge>;
}