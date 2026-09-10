import { img, IMAGES } from "@/lib/images";

export type RoomCategory = "suite" | "room";

export interface Room {
  id: string;
  slug: string;
  category: RoomCategory;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  images: string[];
  size: string;
  guests: number;
  bed: string;
  price: number;
  amenities: string[];
}

export const rooms: Room[] = [
  {
    id: "1",
    slug: "the-maharana-suite",
    category: "suite",
    name: "The Maharana Suite",
    shortName: "Maharana Suite",
    description:
      "Our most expansive residence, layered with heritage details, generous living spaces and views across the old city.",
    longDescription:
      "Occupying a corner of the original haveli, the Maharana Suite pairs restored jaali screens and hand-finished plasterwork with a private sitting room, a dressing chamber and a deep stone balcony that opens onto the rooftops of the walled city. Every surface — the reclaimed teak flooring, the brass fittings, the block-printed textiles — is either original to the house or made within a day's drive of it.",
    images: [img(IMAGES.rooms.gardenView), img(IMAGES.rooms.lobbyArch), img(IMAGES.rooms.pillows)],
    size: "120 sq m",
    guests: 2,
    bed: "King Bed",
    price: 42000,
    amenities: ["Private balcony", "Sitting room", "Soaking tub", "Butler service", "Courtyard view"],
  },
  {
    id: "2",
    slug: "the-royal-chamber",
    category: "suite",
    name: "The Royal Chamber",
    shortName: "Royal Chamber",
    description:
      "A refined retreat where handcrafted details meet modern comfort.",
    longDescription:
      "The Royal Chamber sits above the old zenana courtyard, its tall shuttered windows framing the tamarind tree below. Furnishings mix restored campaign pieces with contemporary upholstery in muted stone and forest tones, and the bathroom's veined marble is quarried from the same region as the original haveli's floors.",
    images: [img(IMAGES.rooms.bedGray), img(IMAGES.rooms.bedLinen), img(IMAGES.rooms.couch)],
    size: "68 sq m",
    guests: 2,
    bed: "King Bed",
    price: 26000,
    amenities: ["Courtyard view", "Reading nook", "Rain shower", "Turndown service"],
  },
  {
    id: "3",
    slug: "the-courtyard-room",
    category: "room",
    name: "The Courtyard Room",
    shortName: "Courtyard Room",
    description:
      "A peaceful room opening toward a secluded inner courtyard.",
    longDescription:
      "Set along the quieter eastern wing, the Courtyard Room looks directly onto a private inner courtyard shaded by a century-old neem tree. Interiors are pared back — whitewashed walls, sandstone flooring, a single antique mirror — letting the architecture and the light do the work.",
    images: [img(IMAGES.rooms.bedWhite), img(IMAGES.rooms.bedLinen2), img(IMAGES.rooms.pillows, 1200)],
    size: "42 sq m",
    guests: 2,
    bed: "Queen Bed",
    price: 17500,
    amenities: ["Courtyard access", "Garden view", "Writing desk"],
  },
  {
    id: "4",
    slug: "the-terrace-room",
    category: "room",
    name: "The Terrace Room",
    shortName: "Terrace Room",
    description:
      "An intimate room with a private stone terrace catching the evening light.",
    longDescription:
      "On the uppermost floor of the west wing, the Terrace Room opens onto a private stone terrace facing the sunset side of the property — the best seat in the house for the call to prayer drifting up from the old city at dusk.",
    images: [img(IMAGES.rooms.bedLinen, 1200), img(IMAGES.rooms.gardenView, 1200)],
    size: "38 sq m",
    guests: 2,
    bed: "Queen Bed",
    price: 16000,
    amenities: ["Private terrace", "Sunset view", "Rain shower"],
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((r) => r.slug === slug);
}
