import { Badge } from "@/components/ui/badge";
import type { SeasonStatus } from "../types";

const config: Record<SeasonStatus, { label: string; className: string }> = {
  borrador: { label: "Borrador", className: "bg-muted text-muted-foreground" },
  programada: { label: "Programada", className: "bg-secondary text-secondary-foreground" },
  activa: { label: "Activa", className: "bg-primary text-primary-foreground" },
  finalizada: { label: "Finalizada", className: "bg-accent/30 text-foreground" },
};

export function SeasonStatusBadge({ status }: { status: SeasonStatus }) {
  return <Badge className={config[status].className}>{config[status].label}</Badge>;
}