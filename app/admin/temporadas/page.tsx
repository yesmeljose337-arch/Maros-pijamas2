import { getSeasons } from "@/features/seasons/services/seasons.service";
import { SeasonGrid } from "@/features/seasons/components/season-grid";

export default async function TemporadasPage() {
  const seasons = await getSeasons();
  return <SeasonGrid seasons={seasons} />;
}