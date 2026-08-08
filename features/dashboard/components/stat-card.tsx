import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardStat } from "../types";

export function StatCard({ stat }: { stat: DashboardStat }) {
  const Icon = stat.icon;
  const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <Card>
      <CardContent className="pt-6 flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className="font-heading text-3xl text-foreground mt-1">{stat.value}</p>
          <div
            className={cn(
              "flex items-center gap-1 text-xs mt-2",
              stat.trend === "up" ? "text-primary" : "text-destructive"
            )}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            <span>{stat.change} vs. semana pasada</span>
          </div>
        </div>
        <div className="rounded-full bg-secondary p-2.5">
          <Icon className="h-4 w-4 text-foreground" />
        </div>
      </CardContent>
    </Card>
  );
}