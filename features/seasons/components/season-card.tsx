import Link from "next/link";
import { CalendarRange } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SeasonStatusBadge } from "./season-status-badge";
import type { Season } from "../types";

function formatRange(start: string, end: string) {
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
  return `${new Date(start).toLocaleDateString("es-CO", opts)} — ${new Date(end).toLocaleDateString("es-CO", opts)}`;
}

export function SeasonCard({ season }: { season: Season }) {
  return (
    <Link href={`/admin/temporadas/${season.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
        <div
          className="h-24 flex items-center px-4"
          style={{ backgroundColor: season.colors.primary }}
        >
          <p className="font-heading text-lg text-white truncate">{season.name}</p>
        </div>
        <CardContent className="pt-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <SeasonStatusBadge status={season.status} />
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <CalendarRange className="h-3.5 w-3.5" />
              {formatRange(season.startDate, season.endDate)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">{season.heroSubtitle}</p>
        </CardContent>
      </Card>
    </Link>
  );
}