import { Badge } from "@/components/ui/badge";
import type { ProductStatus } from "../types";

const config: Record<ProductStatus, { label: string; className: string }> = {
  activo: { label: "Activo", className: "bg-primary text-primary-foreground" },
  borrador: { label: "Borrador", className: "bg-secondary text-secondary-foreground" },
  archivado: { label: "Archivado", className: "bg-muted text-muted-foreground" },
};

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  return <Badge className={config[status].className}>{config[status].label}</Badge>;
}