import { img, IMAGES } from "@/lib/images";

export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  cuisine: string;
  description: string;
  longDescription: string;
  images: string[];
  openingHours: { label: string; hours: string }[];
  menuHighlights: { name: string; description: string }[];
}

export const restaurants: Restaurant[] = [
  {
    id: "1",
    slug: "darbar",
    name: "Darbar",
    cuisine: "Gujarat & the subcontinent",
    description:
      "An all-day dining room celebrating the flavours of Gujarat and the Indian subcontinent.",
    longDescription:
      "Set beneath a restored double-height ceiling, Darbar serves an unhurried menu of Gujarati thalis, coastal curries and tandoor classics through the day, drawing on recipes passed down through the kitchens of Ahmedabad's old merchant families.",
    images: [img(IMAGES.dining.thaliSilver), img(IMAGES.dining.thaliSides), img(IMAGES.dining.roundTray)],
    openingHours: [
      { label: "Breakfast", hours: "7:00 – 10:30" },
      { label: "Lunch", hours: "12:30 – 15:00" },
      { label: "Dinner", hours: "19:00 – 23:00" },
    ],
    menuHighlights: [
      { name: "Undhiyu", description: "Winter vegetables slow-cooked in banana leaf, Surti style." },
      { name: "Dal Dhokli", description: "Wheat dumplings simmered in a tangy, jaggery-sweetened dal." },
      { name: "Sabarmati Thali", description: "A rotating seven-course thali built around the season." },
    ],
  },
  {
    id: "2",
    slug: "mehfil",
    name: "Mehfil",
    cuisine: "Evening tasting menu & cocktails",
    description:
      "An intimate evening destination for slow dinners, cocktails and conversations.",
    longDescription:
      "Mehfil opens only after dark. Candlelit tables sit beneath a courtyard of hanging lanterns, and a short tasting menu changes with the market — paired, if you like, with a cocktail list built around Indian spirits and spice.",
    images: [img(IMAGES.dining.platter), img(IMAGES.dining.metalTray), img(IMAGES.dining.ceramicPlate)],
    openingHours: [{ label: "Dinner", hours: "19:30 – 00:00, Tuesday – Sunday" }],
    menuHighlights: [
      { name: "Tasting Menu", description: "Six courses, changed weekly, built around a single ingredient." },
      { name: "Smoked Old Fashioned", description: "Whisky, jaggery, clove smoke." },
      { name: "Saffron Kulfi", description: "Slow-churned, served with pistachio brittle." },
    ],
  },
  {
    id: "3",
    slug: "the-courtyard",
    name: "The Courtyard",
    cuisine: "Afternoon tea & seasonal plates",
    description:
      "Afternoon tea, seasonal plates and quiet moments beneath the open sky.",
    longDescription:
      "Open to the sky and shaded by an old tamarind tree, The Courtyard serves afternoon tea, light seasonal plates and fresh-pressed juices from late morning until early evening — the hotel's quietest corner.",
    images: [img(IMAGES.architecture.courtyardPatio), img(IMAGES.dining.plateFlowers)],
    openingHours: [{ label: "All day", hours: "11:00 – 18:00" }],
    menuHighlights: [
      { name: "Gujarat High Tea", description: "Savoury farsan, jaggery cake, masala chai." },
      { name: "Seasonal Salad", description: "Whatever is best in the kitchen garden that morning." },
    ],
  },
];

export function getRestaurantBySlug(slug: string): Restaurant | undefined {
  return restaurants.find((r) => r.slug === slug);
}
