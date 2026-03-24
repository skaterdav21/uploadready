export default function sitemap() {
  const baseUrl = "https://uploadready.org";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/resize-image`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/compress-image`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/heic-to-jpg`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/merge-pdf`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/split-pdf`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/compress-pdf`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
    },
  ];
}
