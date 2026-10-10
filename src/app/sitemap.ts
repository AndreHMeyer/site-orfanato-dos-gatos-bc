import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getPublicOrigin } from '@/lib/links';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getPublicOrigin(siteConfig.domain);
  return origin && siteConfig.editorial.approved ? [{ url: origin + '/', changeFrequency: 'monthly', priority: 1 }] : [];
}
