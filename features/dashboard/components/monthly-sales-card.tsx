import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MonthlySalesCardProps {
  amount: string;
  changePercent: string;
  conversionRate: number;
}

export function MonthlySalesCard({ amount, changePercent, conversionRate }: MonthlySalesCardProps) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (conversionRate / 100) * circumference;

  return (
    <Card>
      <CardContent className="pt-5 pb-5 flex flex-col gap-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Ventas del mes</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-heading text-2xl text-foreground">{amount}</p>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs mt-1.5">
              <ArrowUpRight className="h-3 w-3" />
              {changePercent} vs mes anterior
            </span>
          </div>
          <svg width={80} height={80} className="-rotate-90 shrink-0">
            <circle cx={40} cy={40} r={radius} stroke="var(--secondary)" strokeWidth={7} fill="none" />
            <circle
              cx={40}
              cy={40}
              r={radius}
              stroke="var(--primary)"
              strokeWidth={7}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
            <text
              x={40}
              y={40}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontSize: "14px", fontWeight: 600, fill: "var(--foreground)", transform: "rotate(90deg)", transformOrigin: "40px 40px" }}
            >
              {conversionRate}%
            </text>
          </svg>
        </div>
        <p className="text-xs text-muted-foreground -mt-1">Cotizaciones convertidas</p>
      </CardContent>
    </Card>
  );
}