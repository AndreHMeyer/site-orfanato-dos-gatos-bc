import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getPublicOrigin } from '@/lib/links';
import { withBasePath } from '@/lib/paths';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
  const origin = getPublicOrigin(siteConfig.domain);
  const published = siteConfig.editorial.approved && !!origin;
  return { rules: { userAgent: '*', ...(published ? { allow: withBasePath('/') } : { disallow: '/' }) }, ...(published ? { sitemap: origin + withBasePath('/sitemap.xml') } : {}) };
}
