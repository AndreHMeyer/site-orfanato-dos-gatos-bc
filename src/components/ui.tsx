import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

export function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (abre em nova aba)</span></a>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={'eyebrow ' + (light ? 'eyebrow-light' : '')}><span aria-hidden="true" />{children}</p>;
}

export function CatIllustration({ variant = 'hero' }: { variant?: 'hero' | 'about' }) {
  return <svg viewBox="0 0 560 490" fill="none" aria-hidden="true" className={'cat-illustration ' + variant}>
    <path d="M59 445V230C59 102 151 34 282 34s217 76 217 196v215H59Z" fill="#E9F4EF" />
    <path d="M89 229 282 74l187 155" stroke="#77B5A4" strokeWidth="3" strokeLinecap="round" />
    <path d="M121 211v217m316-217v217" stroke="#77B5A4" strokeWidth="3" strokeLinecap="round" />
    <circle cx="438" cy="107" r="32" fill="#ED8C89" />
    <path d="M185 167c-18-22-43 2-29 19l29 27 29-27c15-17-11-41-29-19Z" fill="#ED8C89" />
    <path d="M352 154v16m-8-8h16M74 123v18m-9-9h18M476 290v16m-8-8h16" stroke="#285F53" strokeWidth="2.5" strokeLinecap="round" />
    <ellipse cx="287" cy="434" rx="192" ry="16" fill="#D5E7DD" />
    <path d="M219 409c-49 15-74-2-74-34 0-18-14-28-26-18-19 16-7 51 14 67 25 20 72 13 91 2" stroke="#285F53" strokeWidth="25" strokeLinecap="round" />
    <path d="M207 267c-29 23-47 73-45 123 1 29 23 42 70 42h50c24 0 40-13 36-35l-21-109-90-21Z" fill="#285F53" />
    <path d="m190 237 1-67c1-8 5-10 11-4l40 39h27l36-39c6-6 11-3 11 5l4 65c2 44-25 75-65 75-41 0-67-29-65-74Z" fill="#285F53" />
    <path d="m203 190 20 24h-19l-1-24Zm83 24 18-24 2 25-20-1Z" fill="#77B5A4" />
    <path d="M230 253c4-5 9-5 13 0m30 0c4-5 9-5 13 0" stroke="#FAF9F6" strokeWidth="3" strokeLinecap="round" />
    <path d="m252 268 7 6 7-6h-14Z" fill="#ED8C89" />
    <path d="M259 275c-3 7-8 9-13 5m13-5c3 7 8 9 13 5M209 266l-24-4m24 15-23 5m110-16 24-4m-24 15 23 5" stroke="#FAF9F6" strokeWidth="2" strokeLinecap="round" />
    <path d="M245 315c-9 27-13 69-10 106m37-102 12 103" stroke="#77B5A4" strokeWidth="2" strokeLinecap="round" />
    <path d="M388 413c34 3 58-11 58-34 0-19-19-24-24-10-5 14-16 18-35 17" stroke="#D47D76" strokeWidth="22" strokeLinecap="round" />
    <path d="M313 315c-19 18-31 64-26 89 4 22 19 28 49 28h50c20 0 29-11 23-29l-23-79-73-9Z" fill="#ED8C89" />
    <path d="m301 288-2-53c0-7 4-9 10-4l31 28h24l28-29c5-5 9-3 10 4l6 53c4 35-19 60-52 60-33 0-53-22-55-59Z" fill="#ED8C89" />
    <path d="m311 247 15 16-15 2v-18Zm67 15 13-16 2 18-15-2Z" fill="#F9ECEA" />
    <path d="M326 293c3-4 7-4 10 0m31 0c3-4 7-4 10 0m-29 17 6 4 6-4m-6 4c-2 6-6 8-10 4m10-4c2 6 6 8 10 4m-46-14-20-3m22 12-21 4m85-13 22-3m-21 12 21 3M337 355l-8 67m39-65 8 65" stroke="#763D3C" strokeWidth="2" strokeLinecap="round" />
    <path d="M93 418c0-35-3-58-19-83m17 61c-24 0-36-14-35-31 22 0 35 14 35 31m0-26c-6-20 0-37 16-46 10 17 4 35-16 46" fill="#77B5A4" />
    <path d="M82 411h30l-6 25H88l-6-25Z" fill="#A7474B" />
    <path d="M459 424c0-34 7-57 24-77m-19 48c23-1 38-18 35-35-22 3-36 17-35 35m8-27c3-21-4-35-20-41-7 19-1 33 20 41" fill="#77B5A4" />
    <path d="M447 416h29l-5 22h-19l-5-22Z" fill="#285F53" />
  </svg>;
}

export function Instagram({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".9" fill="currentColor" stroke="none" /></svg>;
}
