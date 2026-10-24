import type { MetadataRoute } from "next";

import { profile } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: profile.website,
      lastModified: new Date("2026-10-24"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
