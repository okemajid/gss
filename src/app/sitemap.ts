import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const baseUrl = siteUrl.toString().replace(/\/$/, "");

const routes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  {path: "/", changeFrequency: "daily", priority: 1},
  {path: "/tentang", changeFrequency: "monthly", priority: 0.8},
  {path: "/aplikasi", changeFrequency: "weekly", priority: 0.9},
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
