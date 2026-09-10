import { img, IMAGES } from "@/lib/images";

export interface Experience {
  id: string;
  number: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  duration: string;
  details: string[];
}

export const experiences: Experience[] = [
  {
    id: "1",
    number: "01",
    slug: "old-ahmedabad",
    title: "Old Ahmedabad",
    description: "Walk through the pols, temples, mosques and historic streets of the walled city.",
    longDescription:
      "A private guide leads you through the narrow pols of the old city at first light, before the streets fill — past carved wooden havelis, stepwells and centuries-old temples, ending with breakfast at a family-run eatery known only to locals.",
    image: img(IMAGES.architecture.laneway),
    duration: "3 hours, morning",
    details: ["Private guide", "Starts at sunrise", "Ends with breakfast", "Easy walking pace"],
  },
  {
    id: "2",
    number: "02",
    slug: "textile-stories",
    title: "Textile Stories",
    description: "Discover Ahmedabad's extraordinary textile traditions.",
    longDescription:
      "Visit the block-printing workshops and weaving houses that have shaped Gujarat's textile trade for generations, meeting the artisans behind ajrakh, bandhani and mashru weaving, and finishing at a private textile archive rarely open to visitors.",
    image: img(IMAGES.textile.weaverHands),
    duration: "4 hours",
    details: ["Artisan workshops", "Private archive visit", "Small group, max 4", "Transport included"],
  },
  {
    id: "3",
    number: "03",
    slug: "the-sabarmati",
    title: "The Sabarmati",
    description: "A quiet morning along the Sabarmati River.",
    longDescription:
      "A slow morning along the Sabarmati riverfront — a gentle walk, a visit to Sabarmati Ashram, and a quiet stretch of tea by the water before the city wakes.",
    image: img(IMAGES.architecture.cityDusk),
    duration: "2.5 hours, morning",
    details: ["Riverfront walk", "Sabarmati Ashram", "Tea by the water", "Private guide"],
  },
  {
    id: "4",
    number: "04",
    slug: "private-gujarat",
    title: "Private Gujarat",
    description: "Curated day journeys beyond the city.",
    longDescription:
      "Full-day journeys beyond Ahmedabad — to the stepwells of Patan, the marble temples of Palitana or the salt flats of the Rann, each arranged privately with a driver and guide, returning in time for dinner at the hotel.",
    image: img(IMAGES.architecture.aerial),
    duration: "Full day",
    details: ["Private car & guide", "Multiple routes available", "Packed lunch included", "Flexible timing"],
  },
];

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}
