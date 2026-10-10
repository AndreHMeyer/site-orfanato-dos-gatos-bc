import { defineConfig } from '@playwright/test';
import { withBasePath } from './src/lib/paths';
const origin = 'http://localhost:' + (process.env.PORT || '3000');
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: origin, trace: 'retain-on-failure' },
  webServer: { command: 'node scripts/preview.mjs', url: origin + withBasePath('/'), reuseExistingServer: !process.env.CI },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
