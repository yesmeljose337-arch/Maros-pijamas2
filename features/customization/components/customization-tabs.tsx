"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { catalogConfigs } from "../config/catalogs.config";
import { CatalogGrid } from "./catalog-grid";

export function CustomizationTabs() {
  return (
    <Tabs defaultValue="modelos">
      <TabsList>
        {catalogConfigs.map((c) => (
          <TabsTrigger key={c.key} value={c.key}>
            {c.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {catalogConfigs.map((c) => (
        <TabsContent key={c.key} value={c.key}>
          <CatalogGrid config={c} />
        </TabsContent>
      ))}
    </Tabs>
  );
}