import { blogPosts } from "@/data/blog-posts";

const BASE_URL = "https://koi-s.up.railway.app";
const SITE_UPDATED = new Date("2026-05-06");

export default function sitemap() {
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/apis`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  const blogPages = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: parseDate(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}

// "1 Mayıs 2026" formatını Date'e çevir
function parseDate(dateStr: string): Date {
  const months: Record<string, number> = {
    Ocak: 0, Şubat: 1, Mart: 2, Nisan: 3, Mayıs: 4, Haziran: 5,
    Temmuz: 6, Ağustos: 7, Eylül: 8, Ekim: 9, Kasım: 10, Aralık: 11,
  };
  const [day, month, year] = dateStr.split(" ");
  return new Date(Number(year), months[month], Number(day));
}