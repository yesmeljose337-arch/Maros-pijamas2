"use client";

import { useRef } from "react";
import { Plus, X, ImageOff } from "lucide-react";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  max?: number;
}

export function ImageUploader({ images, onChange, max = 6 }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files)
      .slice(0, max - images.length)
      .forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            onChange([...images, reader.result]);
          }
        };
        reader.readAsDataURL(file);
      });
  };

  const removeAt = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {images.map((img, i) => (
        <div key={i} className="relative aspect-square rounded-md overflow-hidden border border-border group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt={`Imagen ${i + 1}`} className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => removeAt(i)}
            className="absolute top-1 right-1 bg-background/90 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      {images.length < max && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="aspect-square rounded-md border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span className="text-xs">Agregar</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {images.length === 0 && (
        <div className="col-span-full flex items-center gap-2 text-xs text-muted-foreground">
          <ImageOff className="h-3.5 w-3.5" />
          Sin imágenes todavía. Se guardan localmente en el navegador — Cloudinary se integra en la fase de backend.
        </div>
      )}
    </div>
  );
}