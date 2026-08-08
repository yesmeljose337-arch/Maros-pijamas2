import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { SeasonColors } from "../types";

interface SeasonColorEditorProps {
  colors: SeasonColors;
  onChange: (colors: SeasonColors) => void;
}

const fields: { key: keyof SeasonColors; label: string }[] = [
  { key: "primary", label: "Color primario" },
  { key: "accent", label: "Color de acento" },
  { key: "background", label: "Color de fondo" },
];

export function SeasonColorEditor({ colors, onChange }: SeasonColorEditorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg">
      {fields.map(({ key, label }) => (
        <div key={key}>
          <Label className="mb-1.5 block text-xs">{label}</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={colors[key]}
              onChange={(e) => onChange({ ...colors, [key]: e.target.value })}
              className="h-9 w-9 rounded-md border border-border cursor-pointer shrink-0"
            />
            <Input
              value={colors[key]}
              onChange={(e) => onChange({ ...colors, [key]: e.target.value })}
              className="font-mono text-xs"
            />
          </div>
        </div>
      ))}
    </div>
  );
}