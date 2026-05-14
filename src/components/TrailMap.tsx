import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import type { Trail } from "@/data/trails";

const TYPE_COLOR: Record<Trail["type"], string> = {
  hiking: "#22c55e",
  cycling: "#f97316",
  mtb: "#f97316",
  gravel: "#f97316",
  fatbike: "#f97316",
  kayak: "#3b82f6",
  skiing: "#22d3ee",
};

interface Props {
  trails: Trail[];
  heightClass?: string;
  fitBounds?: boolean;
  showLegend?: boolean;
}

export function TrailMap({ trails, heightClass = "h-[420px]", fitBounds = false, showLegend = true }: Props) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    import("leaflet").then((L) => {
      if (!containerRef.current) return;

      const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView(
        [66.12, 28.4],
        9,
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      const allLatLngs: [number, number][] = [];

      trails.forEach((trail) => {
        const color = TYPE_COLOR[trail.type];

        // Draw route polyline
        if (trail.routeCoords && trail.routeCoords.length > 1) {
          const line = L.polyline(trail.routeCoords, {
            color,
            weight: 4,
            opacity: 0.85,
            lineJoin: "round",
            lineCap: "round",
          }).addTo(map);

          const diffLabel = trail.difficulty.charAt(0).toUpperCase() + trail.difficulty.slice(1);
          line.bindPopup(
            `<div style="min-width:160px">
              <div style="font-weight:600;font-size:14px">${trail.name}</div>
              <div style="font-size:12px;color:#666;margin-top:2px">${trail.park}</div>
              <div style="font-size:12px;margin-top:6px">${trail.lengthKm} km · ${diffLabel}</div>
              <a href="/trails/${trail.id}" style="
                display:inline-block;margin-top:8px;font-size:12px;
                color:#2563eb;text-decoration:underline
              ">View details →</a>
            </div>`,
          );

          trail.routeCoords.forEach((c) => allLatLngs.push(c));
        }

        // Start-point marker
        const icon = L.divIcon({
          className: "",
          html: `<span style="
            display:flex;align-items:center;justify-content:center;
            width:22px;height:22px;border-radius:50%;
            background:${color};border:3px solid white;
            box-shadow:0 2px 6px rgba(0,0,0,0.35);
            cursor:pointer;
          "></span>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
          popupAnchor: [0, -14],
        });

        const diffLabel = trail.difficulty.charAt(0).toUpperCase() + trail.difficulty.slice(1);
        L.marker([trail.startPoint.coords[0], trail.startPoint.coords[1]], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="min-width:160px">
              <div style="font-weight:600;font-size:14px">${trail.name}</div>
              <div style="font-size:12px;color:#666;margin-top:2px">${trail.park}</div>
              <div style="font-size:12px;margin-top:6px">${trail.lengthKm} km · ${diffLabel}</div>
              <a href="/trails/${trail.id}" style="
                display:inline-block;margin-top:8px;font-size:12px;
                color:#2563eb;text-decoration:underline
              ">View details →</a>
            </div>`,
          );
      });

      if (fitBounds && allLatLngs.length > 0) {
        map.fitBounds(L.latLngBounds(allLatLngs), { padding: [32, 32] });
      }

      mapRef.current = map;
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-border shadow-card">
      {showLegend && (
        <div className="flex flex-wrap items-center gap-4 border-b border-border bg-card px-4 py-3">
          <span className="text-sm font-medium">{t("map.legend")}</span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="inline-block h-3 w-3 rounded-full bg-[#22c55e]" />
            {t("common.hiking")}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="inline-block h-3 w-3 rounded-full bg-[#f97316]" />
            {t("common.cycling")}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="inline-block h-3 w-3 rounded-full bg-[#3b82f6]" />
            {t("common.kayak")}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="inline-block h-3 w-3 rounded-full bg-[#22d3ee]" />
            {t("common.skiing")}
          </span>
        </div>
      )}
      <div ref={containerRef} className={`w-full ${heightClass}`} style={{ zIndex: 0 }} />
    </div>
  );
}
