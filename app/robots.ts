export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://koi-s.up.railway.app/sitemap.xml",
  };
}