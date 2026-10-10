import { describe, expect, it, vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: 'inter' }),
  Plus_Jakarta_Sans: () => ({ variable: 'jakarta' }),
}));

describe('Publicação e indexação', () => {
  it.each([
    { domain: null, approved: false, published: false },
    { domain: null, approved: true, published: false },
    { domain: 'https://example.org', approved: false, published: false },
    { domain: 'https://example.org', approved: true, published: true },
  ])('domínio=$domain, aprovação=$approved', async ({ domain, approved, published }) => {
    vi.resetModules();
    const { siteConfig, content } = await import('../src/config/site');
    // Domínio de fixture apenas em memória; não altera a configuração da ONG.
    siteConfig.domain = domain;
    siteConfig.editorial.approved = approved;
    const { metadata } = await import('../src/app/layout');
    const { default: robots } = await import('../src/app/robots');
    const { default: sitemap } = await import('../src/app/sitemap');
    const { withBasePath } = await import('../src/lib/paths');
    expect(metadata.title).toBe(content.title);
    expect(metadata.robots).toEqual({ index: published, follow: true });
    expect(metadata.alternates?.canonical).toBe(domain ? withBasePath('/') : undefined);
    expect(metadata.openGraph?.images).toEqual(domain ? [{
      url: domain + withBasePath('/brand/og-cover.png'), width: 1200, height: 630,
      alt: siteConfig.name + ' — Adoção e Proteção Animal',
    }] : undefined);
    expect(metadata.twitter).toMatchObject({ card: domain ? 'summary_large_image' : 'summary' });
    expect(robots().rules).toEqual({ userAgent: '*', ...(published ? { allow: withBasePath('/') } : { disallow: '/' }) });
    expect(robots().sitemap).toBe(published ? domain + withBasePath('/sitemap.xml') : undefined);
    expect(sitemap()).toEqual(published ? [{ url: domain + withBasePath('/'), changeFrequency: 'monthly', priority: 1 }] : []);
  });
});
