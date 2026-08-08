import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeasonCard } from "./season-card";
import { SeasonsTimeline } from "./seasons-timeline";
import type { Season } from "../types";

export function SeasonGrid({ seasons }: { seasons: Season[] }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-foreground">Temporadas</h1>
          <p className="text-muted-foreground mt-1">
            Programa el contenido dinámico de la landing pública
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/temporadas/nueva">
            <Plus className="h-4 w-4 mr-2" />
            Nueva temporada
          </Link>
        </Button>
      </div>

      <SeasonsTimeline seasons={seasons} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {seasons.map((s) => (
          <SeasonCard key={s.id} season={s} />
        ))}
      </div>
    </div>
  );
}