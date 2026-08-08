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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SingleImageUploader } from "@/components/shared/single-image-uploader";
import { BANNER_POSITIONS } from "../types";
import type { Banner } from "../types";

interface BannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingBanner: Banner | null;
  onSave: (data: Omit<Banner, "id">) => void;
}

export function BannerDialog({ open, onOpenChange, editingBanner, onSave }: BannerDialogProps) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<string | undefined>();
  const [linkUrl, setLinkUrl] = useState("");
  const [position, setPosition] = useState<string>(BANNER_POSITIONS[0]);

  useEffect(() => {
    if (open) {
      setTitle(editingBanner?.title ?? "");
      setImage(editingBanner?.image);
      setLinkUrl(editingBanner?.linkUrl ?? "");
      setPosition(editingBanner?.position ?? BANNER_POSITIONS[0]);
    }
  }, [open, editingBanner]);

  function handleSubmit() {
    if (!title.trim()) return;
    onSave({ title: title.trim(), image, linkUrl: linkUrl.trim(), position, active: editingBanner?.active ?? true });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingBanner ? "Editar banner" : "Nuevo banner"}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div>
            <Label className="mb-1.5 block">Título</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej. Envío gratis en pedidos +$150.000" />
          </div>
          <SingleImageUploader label="Imagen del banner" value={image} onChange={setImage} />
          <div>
            <Label className="mb-1.5 block">Enlace</Label>
            <Input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="/coleccion/navidad" />
          </div>
          <div>
            <Label className="mb-1.5 block">Posición</Label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BANNER_POSITIONS.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSubmit}>{editingBanner ? "Guardar cambios" : "Crear banner"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}