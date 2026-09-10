import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Heritage from "@/components/sections/Heritage";
import Rooms from "@/components/sections/Rooms";
import FeaturedRoom from "@/components/sections/FeaturedRoom";
import Dining from "@/components/sections/Dining";
import Experiences from "@/components/sections/Experiences";
import Architecture from "@/components/sections/Architecture";
import GalleryPreview from "@/components/sections/GalleryPreview";
import Testimonials from "@/components/sections/Testimonials";
import Location from "@/components/sections/Location";
import BookingCTA from "@/components/sections/BookingCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Heritage />
      <Rooms />
      <FeaturedRoom />
      <Dining />
      <Experiences />
      <Architecture />
      <GalleryPreview />
      <Testimonials />
      <Location />
      <BookingCTA />
    </>
  );
}
