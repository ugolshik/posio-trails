import { ArrowRight, Bike, Mountain, MapPin, Waves } from "lucide-react";
import { useTranslation } from "react-i18next";
import { trails } from "@/data/trails";
import { TrailCard } from "@/components/TrailCard";
import { TrailMap } from "@/components/TrailMap";
import hero from "@/assets/hero-posio.jpg";

export default function HomePage() {
  const { t } = useTranslation();
  const featured = trails.slice(0, 6);

  const cats = [
    { icon: Mountain, key: "hiking" as const },
    { icon: Bike, key: "cycling" as const },
    { icon: Waves, key: "kayak" as const },
  ];

  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <img
          src={hero}
          alt="Snow-crowned spruces of Riisitunturi National Park near Posio"
          width={1920}
          height={1280}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-foreground/40 via-foreground/30 to-background" />
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 sm:pt-36 md:pb-32 md:pt-48">
          <span className="inline-flex items-center gap-2 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
            {t("home.region")}
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-background sm:text-5xl md:text-6xl">
            {t("home.title")}
          </h1>
          <p className="mt-4 max-w-xl text-base text-background/85 sm:text-lg">{t("home.subtitle")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/trails"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("home.browseAll")} <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
            <a
              href="/rentals"
              className="inline-flex items-center gap-2 rounded-lg bg-background/90 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-background"
            >
              <Bike className="h-4 w-4" strokeWidth={1.75} />
              {t("home.rentBike")}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {cats.map(({ icon: Icon, key }) => (
            <div key={key} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div className="mt-3 text-base font-semibold">{t(`home.cats.${key}.title`)}</div>
              <p className="mt-1 text-sm text-muted-foreground">{t(`home.cats.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">{t("home.featured")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t("home.featuredDesc")}</p>
          </div>
          <a
            href="/trails"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
          >
            {t("home.viewAll")} <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </a>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((trail) => (
            <TrailCard key={trail.id} trail={trail} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">{t("home.mapTitle")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t("home.mapDesc")}</p>
        </div>
        <TrailMap trails={trails} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/95 to-primary p-8 text-primary-foreground sm:p-12">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-wider opacity-80">
              {t("home.stay.kicker")}
            </span>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{t("home.stay.title")}</h2>
            <p className="mt-3 text-sm opacity-90 sm:text-base">{t("home.stay.desc")}</p>
            <a
              href="/lapin-satu"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
            >
              {t("home.stay.cta")} <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
