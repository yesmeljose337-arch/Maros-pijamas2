"use client";

import { useRef } from "react";
import { ImageOff, Upload } from "lucide-react";

interface SingleImageUploaderProps {
  label: string;
  value?: string;
  onChange: (value: string | undefined) => void;
  aspect?: "square" | "wide";
}

export function SingleImageUploader({
  label,
  value,
  onChange,
  aspect = "wide",
}: SingleImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <p className="text-sm font-medium text-foreground mb-2">{label}</p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`relative w-full ${aspect === "wide" ? "aspect-[21/9]" : "aspect-square max-w-xs"} rounded-lg border-2 border-dashed border-border overflow-hidden flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-primary hover:text-primary transition-colors bg-secondary/40`}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt={label} className="w-full h-full object-cover" />
        ) : (
          <>
            <Upload className="h-5 w-5" />
            <span className="text-xs">Subir imagen</span>
          </>
        )}
      </button>
      {value && (
        <button
          type="button"
          onClick={() => onChange(undefined)}
          className="text-xs text-destructive mt-1.5 hover:underline"
        >
          Quitar imagen
        </button>
      )}
      {!value && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
          <ImageOff className="h-3 w-3" />
          Se guarda localmente — Cloudinary se integra en la fase de backend.
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}