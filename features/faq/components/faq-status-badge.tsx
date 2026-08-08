import { Badge } from "@/components/ui/badge";
import type { FaqStatus } from "../types";

export function FaqStatusBadge({ status }: { status: FaqStatus }) {
  return (
    <Badge className={status === "publicada" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}>
      {status === "publicada" ? "Publicada" : "Borrador"}
    </Badge>
  );
}