import { Bike, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { rentals } from "@/data/rentals";

export default function RentalsPage() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">{t("rentals.title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("rentals.subtitle")}</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {rentals.map((r) => (
          <article key={r.id} className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card">
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              <img src={r.image} alt={r.name} loading="lazy" className="h-full w-full object-cover" />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-background/90 px-2 py-1 text-xs font-medium backdrop-blur">
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
                {r.region}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div>
                <h2 className="text-lg font-semibold">{r.name}</h2>
                <p className="text-sm text-muted-foreground">{r.address}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {r.bikeTypes.map((b) => (
                  <span key={b} className="inline-flex items-center gap-1 rounded-md bg-primary-soft px-2 py-0.5 text-xs font-medium text-primary">
                    <Bike className="h-3 w-3" strokeWidth={2} />
                    {b}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{r.notes}</p>
              <div className="mt-auto space-y-1.5 text-sm">
                {r.priceFrom && <div className="font-mono text-foreground/85">{t("rentals.from")} {r.priceFrom}</div>}
                {r.phone && (
                  <a href={`tel:${r.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />{r.phone}
                  </a>
                )}
                {r.email && (
                  <a href={`mailto:${r.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />{r.email}
                  </a>
                )}
              </div>
              <a
                href={r.url}
                target={r.url.startsWith("/") ? undefined : "_blank"}
                rel="noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {r.url.startsWith("/") ? t("rentals.contactReception") : t("rentals.visitWebsite")}
                {!r.url.startsWith("/") && <ExternalLink className="h-4 w-4" strokeWidth={1.75} />}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
