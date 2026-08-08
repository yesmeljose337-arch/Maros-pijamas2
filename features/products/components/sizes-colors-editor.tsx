"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ProductColor } from "../types";

interface SizesColorsEditorProps {
  sizes: string[];
  colors: ProductColor[];
  onAddSize: (size: string) => void;
  onRemoveSize: (size: string) => void;
  onAddColor: (color: ProductColor) => void;
  onRemoveColor: (colorName: string) => void;
}

export function SizesColorsEditor({
  sizes,
  colors,
  onAddSize,
  onRemoveSize,
  onAddColor,
  onRemoveColor,
}: SizesColorsEditorProps) {
  const [newSize, setNewSize] = useState("");
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#6B6832");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <p className="text-sm font-medium text-foreground mb-2">Tallas</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {sizes.map((size) => (
            <span
              key={size}
              className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 text-sm"
            >
              {size}
              <button type="button" onClick={() => onRemoveSize(size)}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Ej. M"
            value={newSize}
            onChange={(e) => setNewSize(e.target.value)}
            className="w-24"
          />
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={() => {
              if (newSize.trim()) {
                onAddSize(newSize.trim().toUpperCase());
                setNewSize("");
              }
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground mb-2">Colores</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {colors.map((color) => (
            <span
              key={color.name}
              className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-sm"
            >
              <span
                className="h-3 w-3 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
              />
              {color.name}
              <button type="button" onClick={() => onRemoveColor(color.name)}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="color"
            value={newColorHex}
            onChange={(e) => setNewColorHex(e.target.value)}
            className="h-9 w-9 rounded-md border border-border cursor-pointer"
          />
          <Input
            placeholder="Nombre del color"
            value={newColorName}
            onChange={(e) => setNewColorName(e.target.value)}
          />
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={() => {
              if (newColorName.trim()) {
                onAddColor({ name: newColorName.trim(), hex: newColorHex });
                setNewColorName("");
              }
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}