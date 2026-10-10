import type { NextConfig } from 'next';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
if (basePath && !/^\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/.test(basePath)) {
  throw new Error('NEXT_PUBLIC_BASE_PATH deve ser um caminho como /nome-do-repositorio, sem barra final.');
}
const config: NextConfig = {
  output: 'export',
  basePath,
  images: { unoptimized: true },
  poweredByHeader: false,
  trailingSlash: true,
};
export default config;
