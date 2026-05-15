import { useState, useRef } from "react";
import { Trash2, Plus, Link2, Upload, ChevronDown, ChevronUp, Play, ImageIcon, AlertTriangle, GripVertical } from "lucide-react";
import { trails, type GalleryItem } from "@/data/trails";
import {
  getTrailGallery,
  setTrailGallery,
  addItemToTrail,
  removeItemFromTrail,
  storageUsedKb,
} from "@/lib/galleryStore";

function compressImage(file: File, maxPx: number, quality: number): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.src = url;
  });
}

function defaultGallery(trail: (typeof trails)[number]): GalleryItem[] {
  return trail.gallery ?? [
    { kind: "image", src: trail.image },
    ...(trail.winterImage ? [{ kind: "image" as const, src: trail.winterImage }] : []),
  ];
}

function useTrailGallery(trail: (typeof trails)[number]) {
  const def = defaultGallery(trail);
  const [items, setItems] = useState<GalleryItem[]>(() => getTrailGallery(trail.id) ?? def);

  const add = (item: GalleryItem) => {
    const next = addItemToTrail(trail.id, item, def);
    setItems([...next]);
  };

  const remove = (i: number) => {
    const next = removeItemFromTrail(trail.id, i, def);
    setItems([...next]);
  };

  const reset = () => {
    setTrailGallery(trail.id, def);
    setItems([...def]);
  };

  const move = (from: number, to: number) => {
    const next = [...items];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setTrailGallery(trail.id, next);
    setItems(next);
  };

  return { items, add, remove, reset, move };
}

// ── Thumbnail preview ────────────────────────────────────────────────
function Thumb({ item }: { item: GalleryItem }) {
  if (item.kind === "video") {
    return (
      <div className="relative h-full w-full">
        <img
          src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
          alt="video thumbnail"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Play className="h-4 w-4 fill-white text-white" />
        </div>
      </div>
    );
  }
  return <img src={item.src} alt="" className="h-full w-full object-cover" />;
}

// ── Add-URL dialog ───────────────────────────────────────────────────
function AddUrlDialog({ onAdd, onClose }: { onAdd: (item: GalleryItem) => void; onClose: () => void }) {
  const [tab, setTab] = useState<"image" | "video">("image");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    const v = value.trim();
    if (!v) { setError("Введите ссылку"); return; }
    if (tab === "image") {
      onAdd({ kind: "image", src: v });
    } else {
      const match = v.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
      if (!match) { setError("Не распознан YouTube URL"); return; }
      onAdd({ kind: "video", youtubeId: match[1] });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-elevated" onClick={e => e.stopPropagation()}>
        <h3 className="text-base font-semibold">Добавить ссылку</h3>
        <div className="mt-3 flex gap-2">
          {(["image", "video"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${tab === t ? "bg-primary text-primary-foreground" : "bg-surface text-muted-foreground hover:text-foreground"}`}
            >
              {t === "image" ? <ImageIcon className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {t === "image" ? "Фото URL" : "YouTube"}
            </button>
          ))}
        </div>
        <input
          autoFocus
          type="url"
          placeholder={tab === "image" ? "https://example.com/photo.jpg" : "https://youtube.com/watch?v=..."}
          value={value}
          onChange={e => { setValue(e.target.value); setError(""); }}
          onKeyDown={e => e.key === "Enter" && submit()}
          className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
        {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-muted-foreground hover:text-foreground">Отмена</button>
          <button onClick={submit} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Добавить</button>
        </div>
      </div>
    </div>
  );
}

// ── Single trail editor row ──────────────────────────────────────────
function TrailRow({ trail }: { trail: (typeof trails)[number] }) {
  const [open, setOpen] = useState(false);
  const [showUrlDialog, setShowUrlDialog] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const { items, add, remove, reset, move } = useTrailGallery(trail);

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploadError("");
    const hasVideo = Array.from(files).some(f => f.type.startsWith("video/"));
    if (hasVideo) {
      setUploadError("Видеофайлы не поддерживаются. Используйте «Добавить по ссылке» → YouTube.");
      return;
    }
    setUploading(true);
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      const src = await compressImage(file, 1400, 0.82);
      add({ kind: "image", src });
    }
    setUploading(false);
  };

  const dragRef = useRef<number | null>(null);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-accent"
      >
        <img
          src={items[0]?.kind === "image" ? items[0].src : trail.image}
          alt=""
          className="h-10 w-14 flex-shrink-0 rounded-md object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">{trail.name}</div>
          <div className="truncate text-xs text-muted-foreground">{trail.park}</div>
        </div>
        <span className="rounded-full bg-surface px-2 py-0.5 text-xs text-muted-foreground">
          {items.length} фото
        </span>
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>

      {open && (
        <div className="border-t border-border px-4 pb-4 pt-3">
          {/* Photo grid */}
          <div className="flex flex-wrap gap-2">
            {items.map((item, i) => (
              <div
                key={i}
                draggable
                onDragStart={() => { dragRef.current = i; }}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDrop={e => {
                  e.preventDefault();
                  setDragOver(false);
                  if (dragRef.current !== null && dragRef.current !== i) {
                    move(dragRef.current, i);
                    dragRef.current = null;
                  }
                }}
                onDragEnd={() => { setDragOver(false); dragRef.current = null; }}
                className={`group relative h-20 w-28 overflow-hidden rounded-lg border-2 transition-all ${dragOver ? "border-primary/50" : "border-transparent"} cursor-grab`}
              >
                <Thumb item={item} />
                <div className="absolute inset-0 flex items-start justify-between bg-black/0 p-1 opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100">
                  <GripVertical className="h-4 w-4 text-white drop-shadow" />
                  <button
                    onClick={() => remove(i)}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/90 text-white shadow transition-transform hover:scale-110"
                    title="Удалить"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-1.5 py-1">
                  <span className="text-[10px] text-white/80">
                    {i === 0 ? "Главное" : `#${i + 1}`}
                  </span>
                </div>
              </div>
            ))}

            {/* Drop zone for upload */}
            <label
              className={`flex h-20 w-28 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed transition-colors ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent"}`}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={e => handleFiles(e.target.files)}
              />
              {uploading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : (
                <>
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="text-center text-[10px] leading-tight text-muted-foreground">Загрузить<br />фото</span>
                </>
              )}
            </label>
          </div>

          {uploadError && (
            <p className="mt-2 text-xs text-destructive">{uploadError}</p>
          )}

          {/* Action buttons */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowUrlDialog(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
            >
              <Link2 className="h-3.5 w-3.5" />
              Добавить по ссылке
            </button>
            <button
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
            >
              <Plus className="h-3.5 w-3.5" />
              Загрузить файл
            </button>
            <button
              onClick={reset}
              className="ml-auto text-xs text-muted-foreground hover:text-destructive"
            >
              Сбросить к исходным
            </button>
          </div>

          <p className="mt-2 text-[11px] text-muted-foreground">
            Перетащите фото для изменения порядка. Первое фото — главное на карточке.
          </p>
        </div>
      )}

      {showUrlDialog && (
        <AddUrlDialog onAdd={add} onClose={() => setShowUrlDialog(false)} />
      )}
    </div>
  );
}

// ── Main admin page ──────────────────────────────────────────────────
export default function AdminPage() {
  const [search, setSearch] = useState("");
  const usedKb = storageUsedKb();

  const filtered = trails.filter(
    t =>
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.park.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Управление галереями</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Добавляйте и удаляйте фото/видео для каждого маршрута. Изменения сохраняются в браузере.
          </p>
        </div>
        {usedKb > 3000 && (
          <div className="flex items-center gap-1.5 rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-xs text-foreground">
            <AlertTriangle className="h-3.5 w-3.5 text-warning" />
            Хранилище: {usedKb} КБ
          </div>
        )}
      </div>

      <input
        type="search"
        placeholder="Поиск маршрутов…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
      />

      <div className="flex flex-col gap-3">
        {filtered.map(trail => (
          <TrailRow key={trail.id} trail={trail} />
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Как работает хранение фото</p>
        <ul className="mt-2 space-y-1 text-xs">
          <li>📁 <strong>Загруженные файлы</strong> сохраняются в браузере (до ~10 МБ суммарно)</li>
          <li>🔗 <strong>Фото по ссылке</strong> загружаются каждый раз с внешнего сервера</li>
          <li>▶️ <strong>YouTube-видео</strong> отображаются по ID без скачивания</li>
          <li>⚠️ При очистке браузера загруженные фото удалятся. Для надёжного хранения используйте ссылки.</li>
        </ul>
      </div>
    </div>
  );
}
