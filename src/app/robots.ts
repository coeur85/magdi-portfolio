import type { MetadataRoute } from 'next';
import { profile } from '@/lib/portfolio';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', profile.url).href,
    host: profile.url,
  };
}
