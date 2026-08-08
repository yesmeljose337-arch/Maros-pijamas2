import { MessageCircle, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { QuotationStatusBadge } from "./quotation-status-badge";
import { buildWhatsAppLink } from "../utils/whatsapp";
import type { Quotation } from "../types";

interface QuotationTableProps {
  quotations: Quotation[];
  clientCities: Record<string, string>;
  onRowClick: (quotation: Quotation) => void;
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export function QuotationTable({ quotations, clientCities, onRowClick }: QuotationTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Producto</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quotations.map((q) => (
          <TableRow key={q.id} className="cursor-pointer" onClick={() => onRowClick(q)}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                    {initials(q.clientName)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{q.clientName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {clientCities[q.clientId] ?? ""}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {q.items[0]?.productName}
              {q.items.length > 1 && ` +${q.items.length - 1}`}
            </TableCell>
            <TableCell className="text-muted-foreground">{q.createdAt}</TableCell>
            <TableCell>
              <QuotationStatusBadge status={q.status} />
            </TableCell>
            <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-end gap-1">
                <Button
                  asChild
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-primary hover:text-primary"
                  title="Enviar por WhatsApp"
                >
                  <a href={buildWhatsAppLink(q)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => onRowClick(q)}
                  title="Ver detalle"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}