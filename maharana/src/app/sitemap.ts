import type { MetadataRoute } from "next";
import { rooms } from "@/data/rooms";
import { experiences } from "@/data/experiences";

const base = "https://www.themaharana.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/rooms",
    "/dining",
    "/experiences",
    "/heritage",
    "/gallery",
    "/contact",
    "/booking",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const roomRoutes = rooms.map((r) => ({
    url: `${base}/rooms/${r.slug}`,
    lastModified: new Date(),
  }));

  const experienceRoutes = experiences.map((e) => ({
    url: `${base}/experiences/${e.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...roomRoutes, ...experienceRoutes];
}
