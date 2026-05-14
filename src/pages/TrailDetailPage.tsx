import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Route as RouteIcon,
  Mountain,
  MapPin,
  ExternalLink,
  AlertTriangle,
  Flame,
  Tent,
  Droplets,
  Car,
  Home,
  CircleDot,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { getTrail, trails, type Trail } from "@/data/trails";
import { TrailMap } from "@/components/TrailMap";

const facilityIcons: Record<string, { icon: typeof Flame; label: string }> = {
  campfire: { icon: Flame, label: "Campfire" },
  wilderness_hut: { icon: Home, label: "Wilderness hut" },
  lean_to: { icon: Tent, label: "Lean-to shelter" },
  toilet: { icon: CircleDot, label: "Toilet" },
  water: { icon: Droplets, label: "Drinking water" },
  parking: { icon: Car, label: "Parking" },
};

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
        <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
      </span>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-base font-semibold">{value}</div>
      </div>
    </div>
  );
}

export default function TrailDetailPage() {
  const { t: tr } = useTranslation();
  const { trailId } = useParams();
  const trail = getTrail(trailId ?? "");

  if (!trail) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-3xl font-semibold">{tr("trail.notFound")}</h1>
        <p className="mt-2 text-muted-foreground">{tr("trail.notFoundDesc")}</p>
        <a href="/trails" className="mt-6 inline-flex items-center gap-1 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> {tr("trail.back")}
        </a>
      </div>
    );
  }

  const related = trails
    .filter(
      (x) =>
        x.id !== trail.id &&
        (x.park === trail.park || x.type === trail.type),
    )
    .slice(0, 3);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${trail.startPoint.coords[0]},${trail.startPoint.coords[1]}`;

  const difficultyLabel = tr(`common.${trail.difficulty}` as const);

  return (
    <article className="pb-12">
      <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={trail.image}
          alt={trail.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-x-0 top-4 mx-auto max-w-4xl px-4">
          <a
            href="/trails"
            className="inline-flex items-center gap-1.5 rounded-md bg-background/85 px-3 py-1.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-background"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> {tr("trail.back")}
          </a>
        </div>
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-4 pb-6">
          <p className="text-sm text-foreground/70">{trail.park}</p>
          <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">{trail.name}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="-mt-2 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-5 shadow-card sm:grid-cols-4">
          <Stat icon={RouteIcon} label={tr("trail.length")} value={`${trail.lengthKm} km`} />
          <Stat
            icon={Clock}
            label={tr("trail.duration")}
            value={`${trail.durationHours[0]}–${trail.durationHours[1]} ${tr("common.hours")}`}
          />
          <Stat icon={Mountain} label={tr("trail.difficulty")} value={difficultyLabel} />
          <Stat
            icon={MapPin}
            label={tr("trail.fromPosio")}
            value={trail.distanceFromPosioKm === 0 ? "0 km" : `${trail.distanceFromPosioKm} km`}
          />
        </div>

        {trail.warning && (
          <div className="mt-6 flex gap-3 rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm text-foreground">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-warning" strokeWidth={1.75} />
            <p>{trail.warning}</p>
          </div>
        )}

        <section className="mt-8">
          <TrailMap trails={[trail]} heightClass="h-[340px]" fitBounds showLegend={false} />
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">{tr("trail.about")}</h2>
          <p className="mt-3 leading-relaxed text-foreground/85">{trail.description}</p>
        </section>

        {trail.facilities.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold">{tr("trail.onTrail")}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {trail.facilities.map((f) => {
                const cfg = facilityIcons[f];
                if (!cfg) return null;
                const Icon = cfg.icon;
                return (
                  <span
                    key={f}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground/85"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
                    {cfg.label}
                  </span>
                );
              })}
            </div>
          </section>
        )}

        <section className="mt-10 rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">{tr("trail.trailhead")}</h2>
          <p className="mt-2 font-medium">{trail.startPoint.name}</p>
          <p className="text-sm text-muted-foreground">{trail.startPoint.address}</p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            {trail.startPoint.coords[0].toFixed(4)}, {trail.startPoint.coords[1].toFixed(4)}
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <MapPin className="h-4 w-4" strokeWidth={1.75} />
            {tr("trail.openMaps")}
          </a>
        </section>

        {trail.links.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold">{tr("trail.sources")}</h2>
            <ul className="mt-3 space-y-2">
              {trail.links.map((l) => (
                <li key={l.url}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary hover:underline"
                  >
                    {l.label}
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold">{tr("trail.related")}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((x) => (
                <a
                  key={x.id}
                  href={"/trails/" + x.id}
                  className="group flex gap-3 rounded-xl border border-border bg-card p-3 shadow-card transition-colors hover:bg-accent"
                >
                  <img src={x.image} alt={x.name} className="h-16 w-20 flex-shrink-0 rounded-md object-cover" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{x.name}</div>
                    <div className="truncate text-xs text-muted-foreground">{x.park}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {x.lengthKm} km · {tr(`common.${x.difficulty}` as const)}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
