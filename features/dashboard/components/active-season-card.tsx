import { CalendarRange } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ActiveSeasonCardProps {
  name: string;
  collection: string;
  daysRemaining: number;
}

export function ActiveSeasonCard({ name, collection, daysRemaining }: ActiveSeasonCardProps) {
  return (
    <Card className="bg-primary text-primary-foreground">
      <CardContent className="pt-6 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <CalendarRange className="h-4 w-4" />
          <span className="text-xs uppercase tracking-wide opacity-80">
            Temporada activa
          </span>
        </div>
        <div>
          <p className="font-heading text-2xl">{name}</p>
          <p className="text-sm opacity-80">{collection}</p>
        </div>
        <p className="text-xs opacity-70">
          {daysRemaining} días restantes de temporada
        </p>
      </CardContent>
    </Card>
  );
}