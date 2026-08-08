"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SingleImageUploader } from "./single-image-uploader";
import type { SeoData } from "@/types/seo";

interface SeoEditorProps {
  value: SeoData;
  onChange: (value: SeoData) => void;
  baseUrl?: string;
}

export function SeoEditor({ value, onChange, baseUrl = "marospijamas.com" }: SeoEditorProps) {
  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <div>
        <Label className="mb-1.5 block">Meta título</Label>
        <Input value={value.title} onChange={(e) => onChange({ ...value, title: e.target.value })} />
      </div>
      <div>
        <Label className="mb-1.5 block">Meta descripción</Label>
        <Textarea rows={3} value={value.description} onChange={(e) => onChange({ ...value, description: e.target.value })} />
      </div>
      <div>
        <Label className="mb-1.5 block">URL amigable (slug)</Label>
        <Input value={value.slug} onChange={(e) => onChange({ ...value, slug: e.target.value })} />
      </div>
      <SingleImageUploader
        label="Imagen para redes sociales"
        value={value.socialImage}
        onChange={(img) => onChange({ ...value, socialImage: img })}
        aspect="wide"
      />
      <div>
        <Label className="mb-1.5 block">Texto alternativo (alt) de la imagen</Label>
        <Input
          value={value.altText ?? ""}
          onChange={(e) => onChange({ ...value, altText: e.target.value })}
          placeholder="Ej. Pijama satín beige sobre fondo marfil"
        />
      </div>

      <div className="rounded-md border border-border p-3 bg-secondary/40">
        <p className="text-xs text-muted-foreground mb-1">Vista previa en Google</p>
        <p className="text-[#1a0dab] text-base truncate">{value.title || "Título de la página"}</p>
        <p className="text-[#006621] text-xs">{baseUrl}/{value.slug || "url-amigable"}</p>
        <p className="text-sm text-[#545454] line-clamp-2">
          {value.description || "Descripción de la página..."}
        </p>
      </div>
    </div>
  );
}