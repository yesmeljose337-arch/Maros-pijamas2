"use client";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { toast } from "@/lib/toast";
import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CatalogItemCard } from "./catalog-item-card";
import { CatalogItemDialog } from "./catalog-item-dialog";
import {
  getCatalogItems,
  createCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
} from "../services/customization.service";
import type { CatalogConfig, CatalogItem } from "../types";

export function CatalogGrid({ config }: { config: CatalogConfig }) {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const data = await getCatalogItems(config.key);
    setItems(data);
    setLoading(false);
  }, [config.key]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  function openCreate() {
    setEditingItem(null);
    setDialogOpen(true);
  }

  function openEdit(item: CatalogItem) {
    setEditingItem(item);
    setDialogOpen(true);
  }

  async function handleSave(data: { name: string; image?: string; hex?: string; priceModifier?: number }) {
    if (editingItem) {
      await updateCatalogItem(editingItem.id, data);
    } else {
      await createCatalogItem({ catalog: config.key, ...data });
    }
    fetchItems();
  }

const [deleteTarget, setDeleteTarget] = useState<CatalogItem | null>(null);

function handleDeleteClick(item: CatalogItem) {
  setDeleteTarget(item);
}

async function confirmDelete() {
  if (!deleteTarget) return;
  await deleteCatalogItem(deleteTarget.id);
  toast.success(`"${deleteTarget.name}" fue eliminado`);
  setDeleteTarget(null);
  fetchItems();
}

  return (
    <div className="flex flex-col gap-4 pt-4">
      <div className="flex justify-end">
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Agregar {config.singularLabel}
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          Sin {config.label.toLowerCase()} registrados todavía.
        </p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((item) => (
            <CatalogItemCard
              key={item.id}
              item={item}
              config={config}
              onEdit={() => openEdit(item)}
              onDelete={() => handleDeleteClick(item)}
            />
          ))}
        </div>
      )}

      
      <CatalogItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        config={config}
        editingItem={editingItem}
        onSave={handleSave}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title={`Eliminar ${config.singularLabel}`}
        description={`¿Seguro que quieres eliminar "${deleteTarget?.name}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        onConfirm={confirmDelete}
      />
    </div>
  );
}