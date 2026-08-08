import type { Season } from "../types";

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function dayOfYearPercent(dateStr: string) {
  const d = new Date(dateStr);
  const start = new Date(d.getFullYear(), 0, 1);
  const diffDays = (d.getTime() - start.getTime()) / 86400000;
  const isLeap = (d.getFullYear() % 4 === 0 && d.getFullYear() % 100 !== 0) || d.getFullYear() % 400 === 0;
  const daysInYear = isLeap ? 366 : 365;
  return (diffDays / daysInYear) * 100;
}

export function SeasonsTimeline({ seasons }: { seasons: Season[] }) {
  if (seasons.length === 0) return null;

  return (
    <div className="rounded-lg border border-border bg-card p-4 overflow-x-auto">
      <p className="text-sm font-medium text-foreground mb-4">Línea de tiempo</p>
      <div className="min-w-[640px]">
        <div className="grid grid-cols-12 text-xs text-muted-foreground pb-2 border-b border-border pl-28">
          {MONTHS.map((m) => (
            <span key={m} className="text-center">{m}</span>
          ))}
        </div>
        <div className="flex flex-col gap-3 pt-3">
          {seasons.map((season) => {
            const left = dayOfYearPercent(season.startDate);
            const right = dayOfYearPercent(season.endDate);
            const width = Math.max(right - left, 1.5);
            return (
              <div key={season.id} className="flex items-center gap-2">
                <span className="text-xs text-foreground truncate w-24 shrink-0">{season.name}</span>
                <div className="relative flex-1 h-2.5 bg-secondary rounded-full">
                  <div
                    className="absolute h-2.5 rounded-full"
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                      backgroundColor: season.colors.primary,
                    }}
                    title={`${season.startDate} — ${season.endDate}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}