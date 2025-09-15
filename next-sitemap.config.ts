// next-sitemap.config.ts
import type { IConfig } from 'next-sitemap';

const config: IConfig = {
  siteUrl: process.env.SITE_URL || 'https://pawpass.zainolamzar.my',
  generateRobotsTxt: true, // (optional)
  sitemapSize: 5000,       // splits large sitemaps automatically
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/private/*'], // pages to exclude
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/private'] },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://pawpass.zainolamzar.my'}/sitemap-0.xml`,
    ],
  },
};

export default config;
