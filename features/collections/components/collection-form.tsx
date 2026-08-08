"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SingleImageUploader } from "@/components/shared/single-image-uploader";
import { ProductPicker } from "./product-picker";
import { updateCollection } from "../services/collections.service";
import type { Collection } from "../types";

export function CollectionForm({ collection }: { collection: Collection }) {
  const router = useRouter();
  const [description, setDescription] = useState(collection.description);
  const [coverImage, setCoverImage] = useState<string | undefined>(collection.coverImage);
  const [productIds, setProductIds] = useState<string[]>(collection.productIds);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await updateCollection(collection.id, { description, coverImage, productIds });
    setSaving(false);
    router.push("/admin/colecciones");
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="h-8 w-8 rounded-full shrink-0"
            style={{ backgroundColor: collection.accentHex }}
          />
          <h1 className="font-heading text-3xl text-foreground">{collection.name}</h1>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>

      <div>
        <Label className="mb-1.5 block">Descripción</Label>
        <Textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <SingleImageUploader
        label="Imagen de portada"
        value={coverImage}
        onChange={setCoverImage}
      />

      <div>
        <Label className="mb-1.5 block">
          Productos asignados ({productIds.length})
        </Label>
        <ProductPicker selectedIds={productIds} onChange={setProductIds} />
      </div>
    </div>
  );
}