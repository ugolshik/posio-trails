import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { trails, type TrailType, type Season } from "@/data/trails";
import { TrailCard } from "@/components/TrailCard";
import { TrailMap } from "@/components/TrailMap";

type ActivityFilter = "all" | "hiking" | "cycling" | "kayak";
type SeasonFilter = "all" | "summer" | "winter" | "all_year";

const isCycling = (t: TrailType) => ["cycling", "mtb", "gravel", "fatbike"].includes(t);

export default function TrailsPage() {
  const { t } = useTranslation();
  const [activity, setActivity] = useState<ActivityFilter>("all");
  const [season, setSeason] = useState<SeasonFilter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return trails.filter((tr) => {
      if (activity === "hiking" && tr.type !== "hiking") return false;
      if (activity === "cycling" && !isCycling(tr.type)) return false;
      if (activity === "kayak" && tr.type !== "kayak") return false;
      if (season !== "all" && tr.season !== season) return false;
      if (query && !`${tr.name} ${tr.park} ${tr.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [activity, season, query]);

  const pill = <T extends string>(key: T, label: string, current: T, set: (v: T) => void) => (
    <button
      key={key}
      onClick={() => set(key)}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
        current === key
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">{t("trails.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("trails.subtitle", { count: trails.length })}</p>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {pill("all", t("trails.filterAll"), activity, setActivity)}
          {pill("hiking", t("trails.filterHiking"), activity, setActivity)}
          {pill("cycling", t("trails.filterCycling"), activity, setActivity)}
          {pill("kayak", t("trails.filterKayak"), activity, setActivity)}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="self-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t("trails.season")}:
            </span>
            {pill("all", t("trails.seasonAll"), season, setSeason)}
            {pill("summer", t("trails.seasonSummer"), season, setSeason)}
            {pill("winter", t("trails.seasonWinter"), season, setSeason)}
            {pill("all_year", t("trails.seasonAllYear"), season, setSeason)}
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.75} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("trails.search")}
              className="w-full rounded-lg border border-input bg-card py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tr) => <TrailCard key={tr.id} trail={tr} />)}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
          {t("trails.empty")}
        </div>
      )}

      <section className="mt-16">
        <h2 className="mb-4 text-2xl font-semibold">{t("trails.mapTitle")}</h2>
        <TrailMap trails={filtered.length > 0 ? filtered : trails} />
      </section>
    </div>
  );
}
