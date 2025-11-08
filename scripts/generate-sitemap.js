const fs = require("fs");
const path = require("path");

// Define all pages and their metadata
const pages = [
  {
    url: "/",
    lastmod: new Date().toISOString().split("T")[0],
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    url: "/blog/index.html",
    lastmod: "2025-04-15",
    changefreq: "weekly",
    priority: "0.9",
  },
  {
    url: "/blog/lvm-extend-xfs.html",
    lastmod: "2025-04-15",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    url: "/blog/lvm-xfs-extend.html",
    lastmod: "2025-04-15",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    url: "/projects/index.html",
    lastmod: "2025-04-01",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    url: "/about.html",
    lastmod: "2025-03-01",
    changefreq: "monthly",
    priority: "0.6",
  },
  {
    url: "/contact.html",
    lastmod: "2025-03-01",
    changefreq: "yearly",
    priority: "0.5",
  },
];

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>https://yourdomain.com${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
  )
  .join("")}
</urlset>`;

// Write sitemap file
fs.writeFileSync("sitemap.xml", sitemap);
console.log("Sitemap generated successfully!");

// Generate robots.txt
const robots = `User-agent: *
Allow: /
Disallow: /assets/
Disallow: /scripts/

Sitemap: https://yourdomain.com/sitemap.xml`;

fs.writeFileSync("robots.txt", robots);
console.log("Robots.txt generated successfully!");
