import { Mountain } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

const linkClass = "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";

export function SiteHeader() {
  const { t } = useTranslation();
  const path = window.location.pathname;
  const active = (href: string) => (path === href ? "text-foreground font-semibold" : linkClass);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Mountain className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div className="leading-tight">
            <div className="text-base font-semibold">Posio Trails</div>
            <div className="hidden text-xs text-muted-foreground sm:block">{t("nav.tagline")}</div>
          </div>
        </a>
        <div className="flex items-center gap-3 sm:gap-6">
          <nav className="hidden items-center gap-6 md:flex">
            <a href="/" className={active("/")}>{t("nav.home")}</a>
            <a href="/trails" className={active("/trails")}>{t("nav.trails")}</a>
            <a href="/rentals" className={active("/rentals")}>{t("nav.rentals")}</a>
            <a href="/lapin-satu" className={active("/lapin-satu")}>{t("nav.lapinSatu")}</a>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
      <nav className="flex items-center justify-around border-t border-border bg-background/80 px-2 py-2 text-sm md:hidden">
        <a href="/" className={active("/")}>{t("nav.home")}</a>
        <a href="/trails" className={active("/trails")}>{t("nav.trails")}</a>
        <a href="/rentals" className={active("/rentals")}>{t("nav.rentals")}</a>
        <a href="/lapin-satu" className={active("/lapin-satu")}>{t("nav.lapinSatu")}</a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useTranslation();
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="text-sm font-semibold">Posio Trails</div>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">{t("footer.about")}</p>
        </div>
        <div>
          <div className="text-sm font-semibold">{t("footer.sources")}</div>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li><a className="hover:text-foreground" href="https://www.nationalparks.fi/" target="_blank" rel="noreferrer">nationalparks.fi</a></li>
            <li><a className="hover:text-foreground" href="https://www.ruka.fi/en/cycling" target="_blank" rel="noreferrer">ruka.fi cycling</a></li>
            <li><a className="hover:text-foreground" href="https://bikeland.fi/" target="_blank" rel="noreferrer">bikeland.fi</a></li>
            <li><a className="hover:text-foreground" href="https://stellapolaris.fi/en/equipment-rental/" target="_blank" rel="noreferrer">stellapolaris.fi (kayak)</a></li>
            <li><a className="hover:text-foreground" href="https://www.posio.fi/" target="_blank" rel="noreferrer">posio.fi</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold">{t("footer.stay")}</div>
          <p className="mt-2 text-sm text-muted-foreground">Lapin Satu Ky · Posio, Finland</p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Posio Trails
      </div>
    </footer>
  );
}
