import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AdoptionCard } from '../../src/components/AdoptionCard';
import { withBasePath } from '../../src/lib/paths';

const homePath = withBasePath('/');

test('menu por teclado, clique externo e mudança de breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(homePath);
  const toggle = page.getByRole('button', { name: 'Abrir menu' });
  const nav = page.getByRole('navigation', { name: 'Navegação principal', exact: true });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await expect(nav.getByRole('link', { name: 'Início', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await page.keyboard.press('Space');
  await page.getByRole('banner').getByRole('link', { name: 'Orfanato dos Gatos BC — início' }).click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.setViewportSize({ width: 390, height: 900 });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('menu aberto e âncora respeitam o cabeçalho com texto a 200%', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(homePath);
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  const header = (await page.locator('.site-header').boundingBox())!;
  const nav = page.getByRole('navigation', { name: 'Navegação principal', exact: true });
  expect((await nav.boundingBox())!.y).toBeGreaterThanOrEqual(header.height - 1);
  await page.screenshot({ path: 'docs/screenshots/375-menu-texto-200.png' });
  await nav.getByRole('link', { name: 'Adoção', exact: true }).click();
  await expect.poll(async () => (await page.locator('#adocao').boundingBox())!.y).toBeGreaterThanOrEqual(header.height);
});

test('ações do Hero e todos os links internos do rodapé', async ({ page }) => {
  await page.goto(homePath);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [label, id] of [['Conhecer os gatos', 'adocao'], ['Fazer uma doação', 'doar'], ['Conheça a nossa causa', 'sobre']]) {
    await page.getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp('#' + id + '$'));
    await expect(page.locator('#' + id).getByRole('heading').first()).toBeInViewport();
  }
  for (const link of await page.locator('footer a[href^="#"]').all()) {
    const href = await link.getAttribute('href');
    await link.click();
    await expect(page).toHaveURL(new RegExp(href + '$'));
    await expect(page.locator(href!).getByRole('heading').first()).toBeInViewport();
  }
});

for (const available of ['female', 'male'] as const) {
  test('galeria parcial com somente ' + available + ' disponível', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 900 });
    await page.goto(homePath);
    const styles = await page.locator('link[rel="stylesheet"]').evaluateAll(links => links.map(link => link.outerHTML).join(''));
    const fonts = await page.locator('html').getAttribute('class');
    const cards = (['female', 'male'] as const).map(sex => renderToStaticMarkup(createElement(AdoptionCard, {
      sex, driveUrl: sex === available ? 'https://drive.google.com/drive/folders/TEST_' + sex : null,
    }))).join('');
    await page.setContent(`<html lang="pt-BR" class="${fonts}"><head><title>Galeria parcial</title>${styles}</head><body><main class="container section"><div class="adoption-grid">${cards}</div></main></body></html>`);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole('link')).toHaveCount(1);
    await expect(page.getByRole('button')).toBeDisabled();
    await expect(page.locator('.' + available).getByRole('link')).toHaveAttribute('href', new RegExp('TEST_' + available + '$'));
    const boxes = await page.locator('.adoption-card').evaluateAll(cards => cards.map(card => card.getBoundingClientRect().height));
    expect(Math.abs(boxes[0] - boxes[1])).toBeLessThan(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(result.violations).toEqual([]);
    await page.screenshot({ path: `docs/screenshots/360-galeria-parcial-${available}.png`, fullPage: true });
  });
}
