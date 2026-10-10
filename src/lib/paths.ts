/** Prefixo definido no build; vazio para domínio próprio, /repositório no Pages. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBasePath(pathname: string): string {
  return pathname.startsWith('/') && !pathname.startsWith('//')
    ? basePath + pathname
    : pathname;
}
