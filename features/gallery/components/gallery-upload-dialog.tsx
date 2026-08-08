"use client";

import { useState } from "react";
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
import { GALLERY_CATEGORIES } from "../types";
import type { GalleryCategory } from "../types";

interface GalleryUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: { url: string; category: GalleryCategory; caption: string }) => void;
}

export function GalleryUploadDialog({ open, onOpenChange, onSave }: GalleryUploadDialogProps) {
  const [url, setUrl] = useState<string | undefined>();
  const [category, setCategory] = useState<GalleryCategory>(GALLERY_CATEGORIES[0]);
  const [caption, setCaption] = useState("");

  function handleSubmit() {
    if (!url) return;
    onSave({ url, category, caption });
    setUrl(undefined);
    setCaption("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subir imagen</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <SingleImageUploader label="Imagen" value={url} onChange={setUrl} aspect="square" />

          <div>
            <Label className="mb-1.5 block">Categoría</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as GalleryCategory)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GALLERY_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-1.5 block">Descripción (alt / caption)</Label>
            <Input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Ej. Familia en pijamas navideñas" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={!url}>Subir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}