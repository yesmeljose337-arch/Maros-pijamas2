import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardStat } from "../types";

export function StatCard({ stat }: { stat: DashboardStat }) {
  const Icon = stat.icon;
  const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <Card>
      <CardContent className="pt-5 pb-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="rounded-full bg-secondary p-2.5">
            <Icon className="h-4 w-4 text-foreground" />
          </div>
          <span
            className={cn(
              "flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs",
              stat.trend === "up" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
            )}
          >
            <TrendIcon className="h-3 w-3" />
            {stat.change}
          </span>
        </div>
        <div>
          <p className="font-heading text-2xl text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
        </div>
      </CardContent>
    </Card>
  );
}