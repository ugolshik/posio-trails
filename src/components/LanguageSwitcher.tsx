import { useState, useEffect, useRef } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "@/i18n";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current =
    LANGUAGES.find((l) => l.code === i18n.resolvedLanguage) ?? LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("nav.language")}
        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
      >
        <Globe className="h-3.5 w-3.5" strokeWidth={1.75} />
        {current.short}
        <ChevronDown className="h-3 w-3 opacity-60" strokeWidth={2} />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-lg border border-border bg-popover shadow-elevated">
          {LANGUAGES.map((l) => {
            const active = l.code === current.code;
            return (
              <button
                key={l.code}
                onClick={() => {
                  i18n.changeLanguage(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-accent ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <span>{l.label}</span>
                {active && <Check className="h-3.5 w-3.5 text-primary" strokeWidth={2} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
