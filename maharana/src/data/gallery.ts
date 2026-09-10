import { img, IMAGES } from "@/lib/images";

export type GalleryCategory = "architecture" | "rooms" | "dining" | "experiences";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  orientation: "portrait" | "landscape" | "square";
}

export const galleryImages: GalleryImage[] = [
  { id: "g1", src: img(IMAGES.architecture.archway), alt: "Carved stone archway at The Maharana", category: "architecture", orientation: "portrait" },
  { id: "g2", src: img(IMAGES.rooms.gardenView), alt: "Suite bedroom with garden view", category: "rooms", orientation: "landscape" },
  { id: "g3", src: img(IMAGES.dining.thaliSilver), alt: "Gujarati thali at Darbar", category: "dining", orientation: "square" },
  { id: "g4", src: img(IMAGES.architecture.carvedDoor), alt: "Hand-carved wooden door", category: "architecture", orientation: "portrait" },
  { id: "g5", src: img(IMAGES.textile.weaverHands), alt: "Weaver's hands at work", category: "experiences", orientation: "landscape" },
  { id: "g6", src: img(IMAGES.rooms.lobbyArch), alt: "Arched hallway", category: "architecture", orientation: "landscape" },
  { id: "g7", src: img(IMAGES.dining.platter), alt: "Evening tasting plate at Mehfil", category: "dining", orientation: "portrait" },
  { id: "g8", src: img(IMAGES.architecture.courtyardPatio), alt: "Courtyard seating at dusk", category: "architecture", orientation: "square" },
  { id: "g9", src: img(IMAGES.rooms.pillows), alt: "Suite detail, linens", category: "rooms", orientation: "portrait" },
  { id: "g10", src: img(IMAGES.architecture.aerial), alt: "Aerial view of the old city", category: "architecture", orientation: "landscape" },
  { id: "g11", src: img(IMAGES.textile.market), alt: "Textile market, Ahmedabad", category: "experiences", orientation: "portrait" },
  { id: "g12", src: img(IMAGES.dining.roundTray), alt: "Seasonal plate at The Courtyard", category: "dining", orientation: "landscape" },
];
