import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { QuotationStatus, RecentQuotation } from "../types";

const statusConfig: Record<QuotationStatus, { label: string; className: string }> = {
  nueva: { label: "Nueva", className: "bg-accent text-accent-foreground" },
  en_revision: { label: "En revisión", className: "bg-secondary text-secondary-foreground" },
  contactada: { label: "Contactada", className: "bg-primary/15 text-primary" },
  cotizada: { label: "Cotizada", className: "bg-primary/30 text-primary" },
  aceptada: { label: "Aceptada", className: "bg-primary text-primary-foreground" },
  rechazada: { label: "Rechazada", className: "bg-destructive/15 text-destructive" },
  archivada: { label: "Archivada", className: "bg-muted text-muted-foreground" },
};

export function RecentQuotationsTable({ quotations }: { quotations: RecentQuotation[] }) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-medium">Cotizaciones recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotations.map((q) => (
              <TableRow key={q.id}>
                <TableCell className="font-medium">{q.clientName}</TableCell>
                <TableCell className="text-muted-foreground">{q.product}</TableCell>
                <TableCell>
                  <Badge className={statusConfig[q.status].className}>
                    {statusConfig[q.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">{q.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}