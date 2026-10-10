/** Apenas pastas oficiais do Drive, sem credenciais ou protocolos inseguros. */
export function getDriveFolderUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    const validPath = /^\/drive\/(?:u\/\d+\/)?folders\/[a-zA-Z0-9_-]+\/?$/.test(url.pathname);
    const legacyPath = url.pathname === '/open' && /^[a-zA-Z0-9_-]+$/.test(url.searchParams.get('id') ?? '');
    if (url.protocol === 'https:' && url.hostname === 'drive.google.com' && !url.port && !url.username && !url.password && (validPath || legacyPath)) return url.href;
  } catch { /* Campo inválido tem o mesmo estado visível de um campo pendente. */ }
  if (process.env.NODE_ENV === 'development') console.warn('[Adoção] URL inválida: configure uma pasta HTTPS oficial do Google Drive.');
  return null;
}

export function getPublicOrigin(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && !url.username && !url.password && !url.port && url.hostname.includes('.') && !['localhost', '127.0.0.1'].includes(url.hostname) && url.pathname === '/' && !url.search && !url.hash) return url.origin;
  } catch { /* Sem domínio real, não gerar canonical. */ }
  return null;
}
