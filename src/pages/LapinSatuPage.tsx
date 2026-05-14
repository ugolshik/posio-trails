import { ArrowRight, Bike, Coffee, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import hero from "@/assets/hero-posio.jpg";

export default function LapinSatuPage() {
  const { t } = useTranslation();
  const cards = [
    { icon: MapPin, key: "location" as const },
    { icon: Bike, key: "bikes" as const },
    { icon: Coffee, key: "tips" as const },
  ];
  return (
    <div>
      <section className="relative overflow-hidden">
        <img src={hero} alt="Posio in winter" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/55 via-foreground/40 to-background" />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-background sm:px-6 sm:py-32">
          <span className="inline-flex items-center gap-2 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} /> Posio, Finland
          </span>
          <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">{t("lapin.title")}</h1>
          <p className="mt-4 max-w-xl text-base opacity-90 sm:text-lg">{t("lapin.subtitle")}</p>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {cards.map(({ icon: Icon, key }) => (
            <div key={key} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div className="mt-3 text-base font-semibold">{t(`lapin.cards.${key}.title`)}</div>
              <p className="mt-1 text-sm text-muted-foreground">{t(`lapin.cards.${key}.desc`)}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-border bg-card p-8 shadow-card">
          <h2 className="text-xl font-semibold">{t("lapin.contact")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("lapin.contactDesc")}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="mailto:reception@lapinsatu.fi"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("lapin.emailReception")} <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
            <a
              href="/trails"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              {t("lapin.browseFirst")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
