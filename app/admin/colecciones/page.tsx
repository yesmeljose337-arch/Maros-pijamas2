import { getCollections } from "@/features/collections/services/collections.service";
import { CollectionGrid } from "@/features/collections/components/collection-grid";

export default async function ColeccionesPage() {
  const collections = await getCollections();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl text-foreground">Colecciones</h1>
        <p className="text-muted-foreground mt-1">
          Gestiona las 6 colecciones fijas y sus productos asignados
        </p>
      </div>
      <CollectionGrid collections={collections} />
    </div>
  );
}