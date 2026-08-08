import { ImageOff, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CatalogItem, CatalogConfig } from "../types";

interface CatalogItemCardProps {
  item: CatalogItem;
  config: CatalogConfig;
  onEdit: () => void;
  onDelete: () => void;
}

export function CatalogItemCard({ item, config, onEdit, onDelete }: CatalogItemCardProps) {
  return (
    <Card className="overflow-hidden group">
      <div className="aspect-square bg-secondary flex items-center justify-center relative">
        {config.hasColor ? (
          <div className="w-full h-full" style={{ backgroundColor: item.hex }} />
        ) : config.hasImage && item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : config.hasImage ? (
          <ImageOff className="h-6 w-6 text-muted-foreground" />
        ) : (
          <span className="font-heading text-2xl text-foreground">{item.name}</span>
        )}
        <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="secondary" className="h-7 w-7" onClick={onEdit}>
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button size="icon" variant="secondary" className="h-7 w-7" onClick={onDelete}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <CardContent className="pt-3 pb-3">
        <p className="text-sm text-foreground truncate">{item.name}</p>
        {config.hasPriceModifier && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {item.priceModifier ? `+$${item.priceModifier.toLocaleString("es-CO")}` : "Sin recargo"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}