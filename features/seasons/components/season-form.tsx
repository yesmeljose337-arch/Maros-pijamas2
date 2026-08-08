"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { seasonSchema, type SeasonFormValues } from "../schemas/season.schema";
import { createSeason, updateSeason, deleteSeason, activateSeason } from "../services/seasons.service";
import { SeasonColorEditor } from "./season-color-editor";
import { SeasonPreviewModal } from "./season-preview-modal";
import { SingleImageUploader } from "@/components/shared/single-image-uploader";
import { ProductPicker } from "@/features/collections/components/product-picker";
import { mockCollections } from "@/features/collections/mocks/collections.mock";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Trash2, Sparkles } from "lucide-react";
import type { Season, SeasonColors } from "../types";
import type { CollectionId } from "@/features/collections/types";

interface SeasonFormProps {
  mode: "create" | "edit";
  initialData?: Season;
}

export function SeasonForm({ mode, initialData }: SeasonFormProps) {
  const router = useRouter();
  const [heroImage, setHeroImage] = useState(initialData?.heroImage);
  const [bannerImage, setBannerImage] = useState(initialData?.bannerImage);
  const [colors, setColors] = useState<SeasonColors>(
    initialData?.colors ?? { primary: "#6B6832", accent: "#B6AE3A", background: "#FAF8F4" }
  );
  const [featuredProductIds, setFeaturedProductIds] = useState<string[]>(
    initialData?.featuredProductIds ?? []
  );
  const [activating, setActivating] = useState(false);

  const form = useForm<SeasonFormValues>({
    resolver: zodResolver(seasonSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      collectionId: initialData?.collectionId ?? "general",
      startDate: initialData?.startDate ?? "",
      endDate: initialData?.endDate ?? "",
      heroTitle: initialData?.heroTitle ?? "",
      heroSubtitle: initialData?.heroSubtitle ?? "",
      ctaText: initialData?.ctaText ?? "Ver colección",
      ctaLink: initialData?.ctaLink ?? "",
    },
  });

  const selectedCollectionId = form.watch("collectionId") as CollectionId;
  const collectionProductIds =
    mockCollections.find((c) => c.id === selectedCollectionId)?.productIds ?? [];

  async function onSubmit(values: SeasonFormValues) {
    const payload = { ...values, heroImage, bannerImage, colors, featuredProductIds };

    if (mode === "create") {
      const created = await createSeason(payload);
      router.push(`/admin/temporadas/${created.id}`);
    } else if (initialData) {
      await updateSeason(initialData.id, payload);
      router.push("/admin/temporadas");
    }
  }

  async function handleActivate() {
    if (!initialData) return;
    setActivating(true);
    await activateSeason(initialData.id);
    setActivating(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!initialData) return;
    const confirmed = window.confirm(`¿Eliminar la temporada "${initialData.name}"?`);
    if (confirmed) {
      await deleteSeason(initialData.id);
      router.push("/admin/temporadas");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="font-heading text-3xl text-foreground">
            {mode === "create" ? "Nueva temporada" : initialData?.name}
          </h1>
          <div className="flex gap-2">
            {mode === "edit" && initialData && (
              <>
                <SeasonPreviewModal season={{ ...initialData, colors, heroImage, bannerImage, featuredProductIds }} />
                {initialData.status !== "activa" && (
                  <Button type="button" variant="secondary" onClick={handleActivate} disabled={activating}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    {activating ? "Activando..." : "Activar temporada"}
                  </Button>
                )}
                <Button type="button" variant="outline" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </Button>
              </>
            )}
            <Button type="submit">Guardar</Button>
          </div>
        </div>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="hero">Hero y Banner</TabsTrigger>
            <TabsTrigger value="colores">Colores</TabsTrigger>
            <TabsTrigger value="productos">Productos destacados</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="flex flex-col gap-4 max-w-lg pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la temporada</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Navidad 2026" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="collectionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colección vinculada</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockCollections.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha inicio</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha fin</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="ctaText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Texto del botón (CTA)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ver colección" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ctaLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enlace del botón</FormLabel>
                  <FormControl>
                    <Input placeholder="/coleccion/navidad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="hero" className="flex flex-col gap-6 max-w-lg pt-4">
            <FormField
              control={form.control}
              name="heroTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título del hero</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Duerme como un sueño esta Navidad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="heroSubtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtítulo del hero</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Descubre la colección navideña" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SingleImageUploader label="Imagen del Hero" value={heroImage} onChange={setHeroImage} />
            <SingleImageUploader label="Banner" value={bannerImage} onChange={setBannerImage} />
          </TabsContent>

          <TabsContent value="colores" className="pt-4">
            <SeasonColorEditor colors={colors} onChange={setColors} />
          </TabsContent>

          <TabsContent value="productos" className="pt-4">
            <Label className="mb-2 block">
              Solo puedes destacar productos que pertenecen a la colección vinculada.
            </Label>
            <ProductPicker
              selectedIds={featuredProductIds}
              onChange={setFeaturedProductIds}
              filterIds={collectionProductIds}
            />
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}