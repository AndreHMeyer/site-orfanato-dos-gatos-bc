import { afterEach, expect, it, vi } from 'vitest';

afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });

it('mantém os caminhos originais quando hospedado na raiz', async () => {
  vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '');
  const { withBasePath } = await import('../src/lib/paths');
  expect(withBasePath('/')).toBe('/');
  expect(withBasePath('/brand/logo-original.png')).toBe('/brand/logo-original.png');
});

it('prefixa a página e os arquivos locais em um site de projeto do Pages', async () => {
  vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '/site-orfanato-dos-gatos-bc');
  const { withBasePath } = await import('../src/lib/paths');
  expect(withBasePath('/')).toBe('/site-orfanato-dos-gatos-bc/');
  expect(withBasePath('/brand/logo-original.png')).toBe('/site-orfanato-dos-gatos-bc/brand/logo-original.png');
  expect(withBasePath('/images/approved.webp')).toBe('/site-orfanato-dos-gatos-bc/images/approved.webp');
  expect(withBasePath('https://www.instagram.com/orfanatodosgatosbc/')).toBe('https://www.instagram.com/orfanatodosgatosbc/');
  expect(withBasePath('#doar')).toBe('#doar');
});
