import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { content, siteConfig } from '@/config/site';
import { getPublicOrigin } from '@/lib/links';
import { withBasePath } from '@/lib/paths';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-inter', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-jakarta', display: 'swap' });
const origin = getPublicOrigin(siteConfig.domain);
const approvedImage = siteConfig.media.ogCover && origin ? origin + withBasePath(siteConfig.media.ogCover) : null;

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
  ...(origin ? { metadataBase: new URL(origin), alternates: { canonical: withBasePath('/') } } : {}),
  robots: { index: siteConfig.editorial.approved && !!origin, follow: true },
  openGraph: {
    title: content.title, description: content.description,
    locale: 'pt_BR', type: 'website', siteName: siteConfig.name,
    ...(origin ? { url: origin + withBasePath('/') } : {}),
    ...(approvedImage ? { images: [{ url: approvedImage, alt: siteConfig.name }] } : {}),
  },
  twitter: {
    card: approvedImage ? 'summary_large_image' : 'summary',
    title: content.title, description: content.description,
    ...(approvedImage ? { images: [approvedImage] } : {}),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={inter.variable + ' ' + jakarta.variable}>
    <body>{children}</body>
  </html>;
}
