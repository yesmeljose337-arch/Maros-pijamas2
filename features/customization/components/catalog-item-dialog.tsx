"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SingleImageUploader } from "@/components/shared/single-image-uploader";
import type { CatalogConfig, CatalogItem } from "../types";

interface CatalogItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: CatalogConfig;
  editingItem: CatalogItem | null;
  onSave: (data: { name: string; image?: string; hex?: string; priceModifier?: number }) => void;
}

export function CatalogItemDialog({
  open,
  onOpenChange,
  config,
  editingItem,
  onSave,
}: CatalogItemDialogProps) {
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | undefined>();
  const [hex, setHex] = useState("#6B6832");
  const [priceModifier, setPriceModifier] = useState(0);

  useEffect(() => {
    if (open) {
      setName(editingItem?.name ?? "");
      setImage(editingItem?.image);
      setHex(editingItem?.hex ?? "#6B6832");
      setPriceModifier(editingItem?.priceModifier ?? 0);
    }
  }, [open, editingItem]);

  function handleSubmit() {
    if (!name.trim()) return;
    onSave({
      name: name.trim(),
      image: config.hasImage ? image : undefined,
      hex: config.hasColor ? hex : undefined,
      priceModifier: config.hasPriceModifier ? priceModifier : undefined,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingItem ? `Editar ${config.singularLabel}` : `Nuevo ${config.singularLabel}`}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div>
            <Label className="mb-1.5 block">Nombre</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Satín" />
          </div>

          {config.hasColor && (
            <div>
              <Label className="mb-1.5 block">Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={hex}
                  onChange={(e) => setHex(e.target.value)}
                  className="h-9 w-9 rounded-md border border-border cursor-pointer"
                />
                <Input value={hex} onChange={(e) => setHex(e.target.value)} className="font-mono text-xs" />
              </div>
            </div>
          )}

          {config.hasImage && (
            <SingleImageUploader label="Imagen" value={image} onChange={setImage} aspect="square" />
          )}

          {config.hasPriceModifier && (
            <div>
              <Label className="mb-1.5 block">Recargo sobre el precio base (COP)</Label>
              <Input
                type="number"
                min={0}
                value={priceModifier}
                onChange={(e) => setPriceModifier(Number(e.target.value))}
                placeholder="0"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>{editingItem ? "Guardar cambios" : "Crear"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}