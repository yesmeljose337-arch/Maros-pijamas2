"use client";

import { useState } from "react";
import { CollectionCard } from "./collection-card";
import { CollectionPreviewModal } from "./collection-preview-modal";
import type { Collection } from "../types";

export function CollectionGrid({ collections }: { collections: Collection[] }) {
  const [previewing, setPreviewing] = useState<Collection | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {collections.map((c) => (
          <CollectionCard key={c.id} collection={c} onPreview={() => setPreviewing(c)} />
        ))}
      </div>
      <CollectionPreviewModal
        collection={previewing}
        onOpenChange={(open) => !open && setPreviewing(null)}
      />
    </>
  );
}