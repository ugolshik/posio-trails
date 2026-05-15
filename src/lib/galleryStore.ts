import type { GalleryItem } from "@/data/trails";

const STORAGE_KEY = "posio-gallery-v1";

type Store = Record<string, GalleryItem[]>;

function load(): Store {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function save(store: Store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function getTrailGallery(trailId: string): GalleryItem[] | null {
  const store = load();
  return store[trailId] ?? null;
}

export function setTrailGallery(trailId: string, items: GalleryItem[]) {
  const store = load();
  store[trailId] = items;
  save(store);
}

export function addItemToTrail(trailId: string, item: GalleryItem, defaultItems: GalleryItem[]) {
  const store = load();
  const current = store[trailId] ?? defaultItems;
  store[trailId] = [...current, item];
  save(store);
  return store[trailId];
}

export function removeItemFromTrail(trailId: string, index: number, defaultItems: GalleryItem[]) {
  const store = load();
  const current = [...(store[trailId] ?? defaultItems)];
  current.splice(index, 1);
  store[trailId] = current;
  save(store);
  return store[trailId];
}

export function reorderItems(trailId: string, items: GalleryItem[]) {
  const store = load();
  store[trailId] = items;
  save(store);
}

export function storageUsedKb(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? "";
    return Math.round((raw.length * 2) / 1024);
  } catch {
    return 0;
  }
}
