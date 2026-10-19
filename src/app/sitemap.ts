import type { MetadataRoute } from 'next';
import { profile } from '@/lib/portfolio';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: new URL('/', profile.url).href, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: new URL(profile.cv, profile.url).href, lastModified, changeFrequency: 'yearly', priority: 0.5 },
  ];
}
