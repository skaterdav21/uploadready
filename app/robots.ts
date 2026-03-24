export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://uploadready.org/sitemap.xml",
  };
}
