import { getDashboardData } from "@/features/dashboard/services/dashboard.service";
import { getSiteSettings } from "@/features/settings/services/settings.service";
import { PageHeader } from "@/components/shared/page-header";
import { DateRangeBadge } from "@/features/dashboard/components/date-range-badge";
import { StatCard } from "@/features/dashboard/components/stat-card";
import { WeeklyQuotationsChart } from "@/features/dashboard/components/weekly-quotations-chart";
import { TopProductsCard } from "@/features/dashboard/components/top-products-card";
import { RecentQuotationsTable } from "@/features/dashboard/components/recent-quotations-table";
import { ActiveSeasonCard } from "@/features/dashboard/components/active-season-card";
import { MonthlySalesCard } from "@/features/dashboard/components/monthly-sales-card";
import { QuickActions } from "@/features/dashboard/components/quick-actions";
import { ExportReportButton } from "@/features/dashboard/components/export-report-button";

export default async function DashboardPage() {
  const [data, settings] = await Promise.all([getDashboardData(), getSiteSettings()]);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Dashboard"
        subtitle="Resumen general de Maro's Pijamas"
        action={
          <div className="flex items-center gap-2">
            <DateRangeBadge />
            <ExportReportButton
              stats={data.stats.map((s) => ({ label: s.label, value: s.value }))}
              conversionRate={data.conversionRate}
              activeSeasonName={data.activeSeason.name}
            />
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {data.stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <WeeklyQuotationsChart data={data.salesVsQuotations} />
        <div className="flex flex-col gap-4">
          <ActiveSeasonCard
            name={data.activeSeason.name}
            collection={data.activeSeason.collection}
            collectionId={data.activeSeason.collectionId}
            startDate={data.activeSeason.startDate}
            endDate={data.activeSeason.endDate}
          />
          <MonthlySalesCard
            amount={data.monthlySales.amount}
            changePercent={data.monthlySales.changePercent}
            conversionRate={data.conversionRate}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentQuotationsTable quotations={data.recentQuotations} />
        <TopProductsCard products={data.topProducts} />
      </div>

      <QuickActions
        whatsappNumber={settings.whatsapp.phoneNumber}
        whatsappMessage={settings.whatsapp.defaultMessage}
      />
    </div>
  );
}