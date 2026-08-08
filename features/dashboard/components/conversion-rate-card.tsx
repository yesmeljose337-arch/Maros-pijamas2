import { Card, CardContent } from "@/components/ui/card";

export function ConversionRateCard({ rate }: { rate: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (rate / 100) * circumference;

  return (
    <Card>
      <CardContent className="pt-6 flex items-center gap-4">
        <svg width={96} height={96} className="shrink-0 -rotate-90">
          <circle cx={48} cy={48} r={radius} stroke="var(--secondary)" strokeWidth={8} fill="none" />
          <circle
            cx={48}
            cy={48}
            r={radius}
            stroke="var(--primary)"
            strokeWidth={8}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
          <text
            x={48}
            y={48}
            textAnchor="middle"
            dominantBaseline="middle"
            className="rotate-90"
            style={{ fontSize: "18px", fontWeight: 600, fill: "var(--foreground)", transform: "rotate(90deg)", transformOrigin: "48px 48px" }}
          >
            {rate}%
          </text>
        </svg>
        <div>
          <p className="text-sm text-muted-foreground">Cotizaciones convertidas</p>
          <p className="text-xs text-muted-foreground mt-1">Últimos 30 días</p>
        </div>
      </CardContent>
    </Card>
  );
}