export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Some hotels give you a room. The Maharana gives you a story to take home.",
    author: "Ananya Mehta",
    location: "Mumbai",
  },
  {
    id: "2",
    quote: "Every corner has been considered — nothing announces itself, and yet nothing is ordinary.",
    author: "Devraj Singh",
    location: "Delhi",
  },
  {
    id: "3",
    quote: "I have stayed in palaces that tried harder and felt like less.",
    author: "Clara Fontaine",
    location: "Paris",
  },
];
