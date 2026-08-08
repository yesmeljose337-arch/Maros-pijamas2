import { CustomizationTabs } from "@/features/customization/components/customization-tabs";

export default function PersonalizacionPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl text-foreground">Personalización</h1>
        <p className="text-muted-foreground mt-1">
          Catálogos que alimentan el personalizador de productos
        </p>
      </div>
      <CustomizationTabs />
    </div>
  );
}