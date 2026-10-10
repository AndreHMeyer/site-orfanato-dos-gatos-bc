// Servidor de arquivos exclusivamente para desenvolvimento/revisão local.
// O deploy usa apenas out/; nenhum servidor acompanha o site publicado.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('out');
const port = Number(process.env.PORT || 3000);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon', '.webp': 'image/webp', '.avif': 'image/avif' };
const server = createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (basePath && pathname === basePath) {
      res.writeHead(308, { Location: basePath + '/' }).end();
      return;
    }
    if (basePath && !pathname.startsWith(basePath + '/')) {
      res.writeHead(404).end('Página não encontrada');
      return;
    }
    pathname = pathname.slice(basePath.length);
    let target = path.resolve(root, '.' + pathname);
    const relative = path.relative(root, target);
    if (relative.startsWith('..') || path.isAbsolute(relative)) { res.writeHead(403).end(); return; }
    if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
    const file = await readFile(target);
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
    res.end(file);
  } catch {
    const fallback = await readFile(path.join(root, '404.html')).catch(() => 'Página não encontrada');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(fallback);
  }
});
server.listen(port, '127.0.0.1', () => console.log('Prévia estática: http://localhost:' + port + basePath + '/'));
