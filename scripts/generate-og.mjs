// Arte estática de compartilhamento. Usa apenas React/Next já instalados e a marca local.
import { readFile, writeFile } from 'node:fs/promises';
import { createElement as h } from 'react';
import { ImageResponse } from 'next/og.js';

const logo = await readFile(new URL('../public/brand/logo-original.png', import.meta.url));
const image = new ImageResponse(
  h('div', { style: {
    display: 'flex', alignItems: 'center', width: '100%', height: '100%',
    background: '#FAF9F6', padding: '70px', color: '#285F53',
    borderBottom: '18px solid #ED8C89',
  } },
  h('div', { style: { display: 'flex', padding: '20px', background: 'white', borderRadius: '32px' } },
    h('img', { src: `data:image/png;base64,${logo.toString('base64')}`, width: 320, height: 320, alt: '' })),
  h('div', { style: { display: 'flex', flexDirection: 'column', marginLeft: '56px', width: '570px' } },
    h('div', { style: { display: 'flex', flexDirection: 'column', fontSize: '64px', lineHeight: 1.1, fontWeight: 700 } },
      h('div', null, 'Orfanato dos'), h('div', null, 'Gatos BC')),
    h('div', { style: { fontSize: '30px', marginTop: '28px', color: '#52645C' } }, 'Adoção e Proteção Animal'),
    h('div', { style: { fontSize: '24px', marginTop: '44px' } }, 'Balneário Camboriú · SC'))),
  { width: 1200, height: 630 },
);

await writeFile(new URL('../public/brand/og-cover.png', import.meta.url), Buffer.from(await image.arrayBuffer()));
console.log('Capa gerada: public/brand/og-cover.png (1200 × 630).');
