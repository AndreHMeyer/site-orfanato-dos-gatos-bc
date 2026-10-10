import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { withBasePath } from '../../src/lib/paths';

const homePath = withBasePath('/');

test('arquivos locais carregam na raiz ou no subdiretório de publicação', async ({ page, request }) => {
  const failed: string[] = [];
  page.on('requestfailed', req => failed.push(req.url()));
  page.on('response', res => { if (res.status() >= 400) failed.push(res.url()); });
  await page.goto(homePath);
  await page.evaluate(() => document.fonts.ready);
  const images = page.locator('img');
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(img => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0)).toBe(true);
    await expect(image).toHaveAttribute('src', withBasePath('/brand/logo-original.png'));
  }
  const iconPath = await page.locator('link[rel="icon"]').getAttribute('href');
  expect(iconPath?.startsWith(homePath)).toBe(true);
  expect((await request.get(iconPath!)).ok()).toBe(true);
  const assets = await page.locator('script[src], link[rel="stylesheet"]').evaluateAll(elements => elements.map(element => element.getAttribute('src') || element.getAttribute('href')));
  expect(assets.length).toBeGreaterThan(0);
  for (const asset of assets) expect(asset?.startsWith(homePath + '_next/')).toBe(true);
  expect(failed).toEqual([]);
  const notFound = await request.get(homePath + '404.html');
  expect(await notFound.text()).toContain('href="' + homePath + '"');
});

for (const width of [320, 375, 768, 1024, 1440]) {
  test('layout e navegação em ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(homePath);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await expect(page.locator('.pix-key')).toHaveText('orfanatodosgatos@gmail.com');
    await expect(page.getByText('Link em preparação', { exact: true })).toHaveCount(2);
    if (width < 1024) {
      await page.getByRole('button', { name: 'Abrir menu' }).click();
      await expect(page.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute('aria-expanded', 'true');
      await page.keyboard.press('Escape');
      await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused();
      await page.getByRole('button', { name: 'Abrir menu' }).click();
    }
    await page.getByRole('navigation', { name: 'Navegação principal', exact: true }).getByRole('link', { name: 'Adoção', exact: true }).click();
    await expect(page).toHaveURL(/#adocao$/);
    if (width < 1024) await expect(page.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false');
    await expect.poll(async () => (await page.locator('#adocao').boundingBox())!.y).toBeLessThan(140);
    expect((await page.locator('#adocao').boundingBox())!.y).toBeGreaterThanOrEqual(width < 1024 ? 79 : 91);
    await page.screenshot({ path: 'docs/screenshots/' + width + '-adocao.png', animations: 'disabled' });
    await page.goto(homePath);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: 'docs/screenshots/' + width + '-inicio.png', animations: 'disabled' });
    await page.screenshot({ path: 'docs/screenshots/' + width + '-pagina.png', fullPage: true, animations: 'disabled' });
    expect(errors).toEqual([]);
  });
}

test('Pix com permissão: chave exata, repetição e operação por teclado', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto(homePath + '#doar');
  const copy = page.getByRole('button', { name: 'Copiar chave Pix' });
  await copy.click();
  await expect(page.getByRole('status')).toHaveText('Chave Pix copiada!');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('orfanatodosgatos@gmail.com');
  await copy.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('orfanatodosgatos@gmail.com');
});

test('Pix sem clipboard mantém chave visível e orienta cópia manual', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined }));
  await page.goto(homePath + '#doar');
  await page.getByRole('button', { name: 'Copiar chave Pix' }).click();
  await expect(page.getByRole('status')).toContainText('copie manualmente');
  await expect(page.locator('.pix-key')).toBeVisible();
});

test('links oficiais, metadados, âncoras e ausência de chamadas externas', async ({ page, baseURL }) => {
  const foreign: string[] = [];
  page.on('request', req => { if (new URL(req.url()).origin !== new URL(baseURL!).origin) foreign.push(req.url()); });
  await page.goto(homePath);
  await expect(page).toHaveTitle('Orfanato dos Gatos BC | Adoção, cuidado e solidariedade');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Balneário Camboriú/);
  await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('link[rel="icon"]')).toHaveCount(1);
  for (const link of await page.locator('a[target="_blank"]').all()) {
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(link).toHaveAttribute('href', /^https:\/\/(www\.instagram\.com\/(orfanatodosgatosbc\/|bazar_orfanatodosgatos)|www\.google\.com\/maps\/dir\/\?api=1&destination=-26\.97372595007401%2C-48\.64839788898396)$/);
  }
  expect(await page.locator('a[href="#"], a[href^="mailto:"], a[href^="tel:"]').count()).toBe(0);
  const anchors = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')!.slice(1)));
  for (const id of new Set(anchors)) await expect(page.locator('[id="' + id + '"]')).toHaveCount(1);
  expect(foreign).toEqual([]);
});

for (const width of [375, 1440]) {
  test('acessibilidade WCAG AA em ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(homePath);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    expect(result.violations).toEqual([]);
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Pular para conteúdo' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#conteudo')).toBeFocused();
  });
}
test('texto ampliado a 200% e movimento reduzido sem cortes', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(homePath);
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  await page.screenshot({ path: 'docs/screenshots/375-texto-200.png', fullPage: true });
  const overflowing = await page.locator('h1, h2, h3, p, button, nav, a, article').evaluateAll(elements => elements.filter(element => { const rect = element.getBoundingClientRect(); return rect.width > 0 && rect.right > window.innerWidth + 1; }).map(element => ({ tag: element.tagName, className: element.getAttribute('class'), width: element.getBoundingClientRect().width, right: element.getBoundingClientRect().right })));
  expect(overflowing).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(page.locator('.pix-key')).toBeVisible();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  await page.screenshot({ path: 'docs/screenshots/375-texto-200.png', fullPage: true });
});

test('conteúdo e navegação disponíveis sem JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 900 } });
  const page = await context.newPage();
  await page.goto(homePath);
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.pix-key')).toHaveText('orfanatodosgatos@gmail.com');
  await expect(page.getByRole('navigation', { name: 'Navegação sem JavaScript' })).toBeVisible();
  await page.getByRole('navigation', { name: 'Navegação sem JavaScript' }).getByRole('link', { name: 'Adoção', exact: true }).click();
  await expect(page).toHaveURL(/#adocao$/);
  await context.close();
});
