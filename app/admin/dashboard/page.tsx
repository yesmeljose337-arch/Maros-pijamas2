import { getDashboardData } from "@/features/dashboard/services/dashboard.service";
import { StatCard } from "@/features/dashboard/components/stat-card";
import { WeeklyQuotationsChart } from "@/features/dashboard/components/weekly-quotations-chart";
import { TopProductsCard } from "@/features/dashboard/components/top-products-card";
import { RecentQuotationsTable } from "@/features/dashboard/components/recent-quotations-table";
import { ActiveSeasonCard } from "@/features/dashboard/components/active-season-card";
import { QuickActions } from "@/features/dashboard/components/quick-actions";
import { ExportReportButton } from "@/features/dashboard/components/export-report-button";
import { ConversionRateCard } from "@/features/dashboard/components/conversion-rate-card";

export default async function DashboardPage() {
  const data = await getDashboardData();

return (
  <div className="flex flex-col gap-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-heading text-3xl text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Resumen general de Maro&apos;s Pijamas</p>
      </div>
      <ExportReportButton
        stats={data.stats.map((s) => ({ label: s.label, value: s.value }))}
        conversionRate={data.conversionRate}
        activeSeasonName={data.activeSeason.name}
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <WeeklyQuotationsChart data={data.salesVsQuotations} />
      <TopProductsCard products={data.topProducts} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <RecentQuotationsTable quotations={data.recentQuotations} />
      <div className="flex flex-col gap-4">
        <ActiveSeasonCard
          name={data.activeSeason.name}
          collection={data.activeSeason.collection}
          daysRemaining={data.activeSeason.daysRemaining}
        />
        <ConversionRateCard rate={data.conversionRate} />
        <QuickActions />
      </div>
    </div>
  </div>
);
}