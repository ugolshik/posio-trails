import { Clock, Route as RouteIcon, MapPin, Mountain, Bike, Waves, ArrowRight, Sun, Snowflake } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Trail } from "@/data/trails";

const statusStyles: Record<Trail["status"], string> = {
  open: "bg-success/15 text-success",
  partially_closed: "bg-warning/15 text-warning",
  seasonal: "bg-primary-soft text-primary",
};

const seasonIcon: Record<Trail["season"], typeof Sun | null> = {
  summer: Sun,
  winter: Snowflake,
  all_year: null,
};

export function TrailCard({ trail }: { trail: Trail }) {
  const { t } = useTranslation();
  const isKayak = trail.type === "kayak";
  const isCycling = ["cycling", "mtb", "gravel", "fatbike"].includes(trail.type);
  const TypeIcon = isKayak ? Waves : isCycling ? Bike : Mountain;
  const typeLabel = isKayak ? t("common.kayak") : isCycling ? t("common.cycling") : t("common.hiking");

  const statusLabel: Record<Trail["status"], string> = {
    open: t("common.open"),
    partially_closed: t("common.partial"),
    seasonal: t("common.seasonal"),
  };
  const difficultyLabel: Record<Trail["difficulty"], string> = {
    easy: t("common.easy"),
    medium: t("common.medium"),
    demanding: t("common.demanding"),
  };

  const SeasonIcon = seasonIcon[trail.season];

  return (
    <a
      href={`/trails/${trail.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={trail.image}
          alt={trail.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className={`absolute left-3 top-3 rounded-md px-2 py-1 text-xs font-medium ${statusStyles[trail.status]}`}>
          ● {statusLabel[trail.status]}
        </span>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-background/85 px-2 py-1 text-xs font-medium text-foreground backdrop-blur">
          <TypeIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
          {typeLabel}
        </span>
        {SeasonIcon && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md bg-background/85 px-2 py-1 text-xs font-medium text-foreground backdrop-blur">
            <SeasonIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
            {trail.season === "winter" ? t("common.winter") : t("common.summer")}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-semibold leading-tight">{trail.name}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{trail.park}</p>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{trail.shortDescription}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 text-sm text-foreground/80">
          <span className="inline-flex items-center gap-1.5">
            <RouteIcon className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
            {trail.lengthKm} km
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
            {trail.durationHours[0]}–{trail.durationHours[1]} {t("common.hours")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Mountain className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
            {difficultyLabel[trail.difficulty]}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
          {trail.distanceFromPosioKm === 0 ? t("common.startsInPosio") : t("common.fromPosio", { km: trail.distanceFromPosioKm })}
          <span className="mx-1">·</span>
          {trail.loop ? t("common.loop") : t("common.pointToPoint")}
        </div>
        {trail.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {trail.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-md bg-surface px-2 py-0.5 text-xs text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-1 flex items-center gap-1 text-xs font-medium text-primary">
          {t("common.viewDetails")} <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </div>
      </div>
    </a>
  );
}
