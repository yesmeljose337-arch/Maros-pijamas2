import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SingleImageUploader } from "@/components/shared/single-image-uploader";
import type { GeneralSettings } from "../types";

interface PanelProps {
  value: GeneralSettings;
  onChange: (value: GeneralSettings) => void;
}

export function SettingsGeneralPanel({ value, onChange }: PanelProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6">
      <div className="flex flex-col gap-4">
        <div>
          <Label className="mb-1.5 block">Nombre del sitio</Label>
          <Input value={value.siteName} onChange={(e) => onChange({ ...value, siteName: e.target.value })} />
        </div>
        <div>
          <Label className="mb-1.5 block">Descripción</Label>
          <Textarea rows={2} value={value.description} onChange={(e) => onChange({ ...value, description: e.target.value })} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label className="mb-1.5 block text-xs">Moneda</Label>
            <Input value={value.currency} onChange={(e) => onChange({ ...value, currency: e.target.value })} />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs">Zona horaria</Label>
            <Input value={value.timezone} onChange={(e) => onChange({ ...value, timezone: e.target.value })} />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs">Idioma</Label>
            <Input value={value.language} onChange={(e) => onChange({ ...value, language: e.target.value })} />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-md bg-secondary/50 px-3 py-2.5">
          <div>
            <p className="text-sm font-medium text-foreground">Activar modo mantenimiento</p>
            <p className="text-xs text-muted-foreground">El sitio mostrará una página de mantenimiento a visitantes</p>
          </div>
          <Switch checked={value.maintenanceMode} onCheckedChange={(v) => onChange({ ...value, maintenanceMode: v })} />
        </div>
      </div>
      <SingleImageUploader label="Logo" value={value.logo} onChange={(img) => onChange({ ...value, logo: img })} aspect="square" />
    </div>
  );
}