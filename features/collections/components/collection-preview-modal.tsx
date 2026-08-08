"use client";

import { ImageOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Collection } from "../types";

interface CollectionPreviewModalProps {
  collection: Collection | null;
  onOpenChange: (open: boolean) => void;
}

export function CollectionPreviewModal({ collection, onOpenChange }: CollectionPreviewModalProps) {
  if (!collection) return null;

  return (
    <Dialog open={!!collection} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Vista previa — {collection.name}</DialogTitle>
        </DialogHeader>
        <div className="aspect-[16/9]" style={{ backgroundColor: `${collection.accentHex}1A` }}>
          {collection.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={collection.coverImage} alt={collection.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageOff className="h-8 w-8" style={{ color: collection.accentHex }} />
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-sm text-muted-foreground">{collection.description}</p>
          <p className="text-xs text-muted-foreground mt-3">
            {collection.productIds.length} productos asignados
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}