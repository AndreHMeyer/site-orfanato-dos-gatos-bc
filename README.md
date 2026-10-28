# Orfanato dos Gatos BC

Site institucional de página única, em português do Brasil, implementado conforme o [SDD](SDD_Orfanato_dos_Gatos_BC.md). Next.js App Router com exportação estática para `out/`. Pronto para homologação; a publicação institucional depende das aprovações e dos dados listados abaixo.

## Executar

Requisitos: Node.js 22 LTS, versão 22.14 ou superior, e npm. Ambiente verificado: Node 22.14.0 / npm 10.9.2, Windows.

```sh
npm ci
npm run dev
```

Abra `http://localhost:3000`. `npm install` também funciona; prefira `npm ci` para reproduzir exatamente o lockfile. No PowerShell com scripts desabilitados, use `npm.cmd` e `npx.cmd`, sem alterar a política de execução do sistema.

```sh
npm run check      # ESLint + TypeScript + testes de componentes/configuração
npm run build      # Gera HTML, CSS, JS, imagens e fontes em out/
npm run preview    # Serve out/ em http://localhost:3000
```

`preview` é uma ferramenta local de revisão. Não há servidor de aplicação no produto publicado. Não usar `next start` para hospedar esta exportação. Para outra porta da prévia, defina `PORT` antes do comando.

## Stack e estrutura

Versões fixadas em `package.json` e `package-lock.json`:

| Tecnologia | Versão |
| --- | --- |
| Next.js | 16.4.0 |
| React / React DOM | 19.3.0 |
| TypeScript | 6.0.3 |
| Tailwind CSS | 4.3.3 |
| Lucide React | 1.54.0 |
| Vitest / jsdom | 5.0.3 / 26.1.0 |
| Playwright / axe | 1.64.0 / 4.13.0 |
| ESLint / eslint-config-next | 9.39.5 / 16.4.0 |

O ESLint 9 foi mantido por compatibilidade com os peer dependencies dos plugins do Next; o npm informa sua depreciação. Atualizar o conjunto de lint quando esses plugins suportarem a versão seguinte. O jsdom 26 é compatível com o Node disponível. São ferramentas de desenvolvimento, ausentes do site exportado.

```text
assets/logo-original.png       Original recebido, preservado
public/brand/logo-original.png Cópia idêntica usada na interface
public/images/                Fotografias WebP usadas na página
public/brand/og-cover.png      Capa de compartilhamento com a marca existente
src/config/site.ts            Dados, textos institucionais base e navegação
src/lib/links.ts               Validação de pastas Drive e domínio
src/lib/adoption.ts            Textos derivados da disponibilidade das galerias
src/app/page.tsx               Seções da página única
src/app/globals.css            Tokens, layout, responsividade e acessibilidade
src/app/layout.tsx             Fontes e metadados
src/app/robots.ts, sitemap.ts  Metadados exportados no build
src/components/               Menu, Pix, adoção e elementos visuais
tests/                        Testes de configuração, componentes e navegador
scripts/preview.mjs            Servidor local de arquivos para revisão
scripts/generate-og.mjs        Regenera a capa PNG com React/Next já instalados
docs/VALIDACAO.md              Evidências e limites da verificação
docs/screenshots/             Evidências visuais nas larguras testadas
out/                          Artefato estático gerado
```

Uma rota de conteúdo `/`, com âncoras Início, Sobre, Adoção, Como adotar, Como ajudar, Doar e Contato. Bazar integra Como ajudar. A rota 404 e os arquivos de metadados são saídas do framework.

Os componentes são renderizados no build; somente menu e botão Pix usam estado no cliente. Não há banco de dados, backend, login, painel, formulários, APIs externas, analytics, embeds, cookies de rastreamento ou armazenamento de dados dos visitantes. Drive e Instagram são hyperlinks. Plus Jakarta Sans e Inter são obtidas por `next/font/google` durante o build e servidas localmente em produção: o build inicial exige acesso aos servidores de fontes, mas a página não consulta Google Fonts em runtime.

## Dados e manutenção

Edite **`src/config/site.ts`**. `null` significa informação ainda não confirmada. Não preencher com dados de exemplo.

### Pastas de adoção

Pastas configuradas: [fêmeas](https://drive.google.com/drive/folders/1HfU_bW0ckvWyxAlYe0pQ6j3FOqYSnVco) e [machos](https://drive.google.com/drive/folders/198_ebY4AQMtFQ-hru9L-PGA-ziVOjT-Y). Os dois botões estão habilitados para abrir a respectiva galeria em nova aba. Para substituir as pastas:

1. A ONG deve criar/controlar uma pasta para fêmeas e outra para machos.
2. Configurar **Acesso geral → Qualquer pessoa com o link → Leitor** em cada pasta.
3. Testar os links em janela anônima, sem conta Google. Confirmar sexo correto e ausência de permissão de edição.
4. Preencher `adoption.femaleDriveUrl` e `adoption.maleDriveUrl` com os links recebidos.
5. Executar testes, build e redeploy.

São aceitas pastas HTTPS no host exato `drive.google.com`, incluindo `/drive/folders/ID`, `/drive/u/0/folders/ID` e o formato antigo `/open?id=ID`. URLs inválidas ou ausentes mantêm o botão “Ver gatinhas” ou “Ver gatinhos” visível e desabilitado, sem URL fictícia ou navegação. Com uma URL válida, somente o botão do respectivo card passa a ser um link, com nova aba, `noopener noreferrer`, hover e foco visível.

Cada pasta funciona independentemente. `src/lib/adoption.ts` mantém a apresentação definitiva da seção e indica se ambas as pastas estão disponíveis para decidir a exibição do atalho do Instagram. A mudança entra no próximo build; não há integração com a API do Drive. A disponibilidade e as condições de adoção continuam sujeitas à confirmação da ONG. A validação sintática não verifica permissões nem conteúdo das pastas; conferir o acesso anônimo após receber os destinos reais.

A ONG pode adicionar, organizar e remover fotos **dentro das mesmas pastas sem rebuild**. Recomenda-se retirar ou atualizar animais já adotados e manter somente informações autorizadas. Não publicar dados de adotantes, prontuários privados ou documentos pessoais. Trocar o endereço de uma pasta exige nova publicação.

### Pix e perfis sociais

- A chave atual é `orfanatodosgatos@gmail.com`: visível e selecionável, com cópia e mensagens acessíveis de sucesso ou orientação manual.
- Alterar `pix.key` somente após confirmação da ONG. Atualizar também os testes que protegem o valor confirmado pelo SDD.
- A Clipboard API é chamada em evento de clique, em HTTPS ou localhost. Em caso de recusa/indisponibilidade, há instrução manual. O site não inicia transferência nem confirma pagamentos.
- `pix.beneficiaryName` e `pix.qrCodeAsset` permanecem nulos. Para adicionar QR, receber o arquivo oficial, conferir os dados com a ONG, salvar localmente e preencher o caminho. Nenhum QR é gerado a partir do e-mail.
- `socials.instagram` e `socials.bazaarInstagram` controlam todos os destinos dos links. Ao mudar um perfil, revisar seu identificador visível na seção Contato e os testes correspondentes.
- A chave Pix **não** é um e-mail de atendimento. Não criar `mailto:` com ela.

### Textos, fotos e marca

O texto institucional base em `content` vem do planejamento e exige aprovação editorial. Os demais títulos e microtextos estão em `src/app/page.tsx`. A história oficial pode substituir o texto base por `editorial.officialHistory`; critérios aprovados podem ser incluídos em `adoption.approvedProcess`. O crédito universitário fica oculto enquanto `editorial.universityCredit` for nulo.

As fotos fornecidas estão em `assets/cat_images/`, com versões WebP em `public/images/gatos/`. Os nomes reais diferem da numeração do briefing: `image03.webp` mostra os dois gatos e aparece no Hero; `image02.webp` mostra o gatinho claro com fundo verde e aparece em Sobre; `image01.webp` é o siamês com fundo bege, disponível como alternativa e não carregado pela página. Os originais foram preservados, sem novas dependências.

Configure `media.hero` ou `media.about` com `{ src: '/images/gatos/arquivo.webp', alt: 'Descrição objetiva do conteúdo autorizado' }`. O Hero preserva a proporção original de 980 × 653 e usa preload; Sobre usa carregamento lazy, enquadramento pelo topo e proporção 5:4 no desktop ou quadrada abaixo de 1024 px. Ao trocar arquivos, atualize também as dimensões em `page.tsx` e confira o enquadramento em `globals.css`. A exportação estática serve os WebP já otimizados, com `images.unoptimized: true` e suporte a `NEXT_PUBLIC_BASE_PATH`. Não utilizar fotos de terceiros como se fossem animais da ONG. Sem imagens configuradas, permanecem as ilustrações neutras.

A logo permanece intacta em `assets/` e `public/brand/`. O ícone usa a mesma imagem quadrada sem distorção. Não substituir a marca sem aprovação. Paleta, foco e pontos de quebra estão em `globals.css`.

WhatsApp, e-mail público, endereço, horários, CNPJ e regras de colaboração estão preparados como nulos. Sua inclusão futura requer validação editorial e ajuste de interface; preencher esses campos isoladamente não cria automaticamente novos canais ou ofertas.

## SEO e deploy

A entrega mantém `editorial.approved: false` e `domain: null`. A homologação tem `noindex`, `robots.txt` bloqueia rastreamento, o sitemap fica vazio e não há canonical ou domínio fictício. Open Graph e Twitter têm título e descrição. A capa local de 1200 × 630 está em `public/brand/og-cover.png`, feita com o logo preservado e as cores do site. Suas tags absolutas são ativadas automaticamente quando `domain` for informado. Para regenerar a capa, editar e executar `node scripts/generate-og.mjs`; não precisa de nova dependência nem de backend.

Antes da publicação institucional:

1. Revisar os dados e textos com a ONG, incluindo origem/autorização das fotos e dados do recebedor Pix. Os links Drive podem continuar pendentes: cada botão permanecerá desabilitado até receber seu destino.
2. Preencher `domain` com a origem HTTPS real, sem subdiretórios.
3. Após aprovação, definir `editorial.approved: true`.
4. Revisar a capa de compartilhamento já configurada em `media.ogCover`. Para substituir, usar arquivo local de 1200 × 630 em `public/`, atualizar o caminho e conferir a prévia.
5. Executar `npm run check`, `npm run build` e `npm run test:e2e`. Atualizar os testes de estado inicial quando dados confirmados substituírem as pendências.
6. Publicar **somente o conteúdo de `out/`**, preservando `_next/` e os demais subdiretórios.

Qualquer hospedagem de arquivos estáticos com HTTPS é suficiente. Configuração de referência para Vercel ou Cloudflare Pages: instalação `npm ci`, build `npm run build`, saída `out`. Selecionar preset estático/“Other” ou “None”, sem runtime SSR, funções ou adaptadores de backend. Configurar o host para servir `index.html` e `404.html`. Por padrão o site usa a raiz do domínio; para subpastas, definir `NEXT_PUBLIC_BASE_PATH` no build conforme abaixo.

### Cloudflare Pages

No painel do Pages, usar o preset **Next.js (Static HTML Export)** (ou equivalente), branch de produção `main`, comando de build `npm run build` e diretório de saída `out`. Não definir `NEXT_PUBLIC_BASE_PATH` quando o site estiver na raiz de um domínio `*.pages.dev` ou de um domínio próprio. O arquivo `.node-version` mantém o ambiente de build no Node 22.14.0, compatível com `package.json`.

O arquivo `public/_headers` é copiado para `out/_headers` durante o build e adiciona cabeçalhos básicos de segurança, cache imutável somente aos bundles versionados de `/_next/static/` e `noindex` aos previews `:version.:project.pages.dev`. A URL principal `:project.pages.dev` pode ser o endereço definitivo gratuito: nesse caso, informá-la em `domain` e ativar `editorial.approved` após aprovação do conteúdo. Se usar domínio próprio, informar essa origem e configurar no painel o redirecionamento do endereço técnico para o oficial. Não é necessário `wrangler.toml`, pasta `functions/`, `_worker.js` ou adaptador do Cloudflare para esta arquitetura estática.

Após o deploy, abrir `/`, `/robots.txt`, `/sitemap.xml`, `/brand/og-cover.png` e uma URL inexistente (deve retornar 404). Conferir a cópia Pix em HTTPS, os links e as âncoras no celular; verificar se o HTML público tem canonical e indexação correspondentes à configuração. Cabeçalhos de `_headers` precisam ser confirmados na hospedagem, pois o servidor local de prévia não os aplica.

Referências oficiais: [Next.js estático no Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) e [regras de cabeçalhos](https://developers.cloudflare.com/pages/configuration/headers/).

Definir a ONG como proprietária da hospedagem, repositório e domínio/DNS. Registrar responsáveis pela manutenção e recuperação de acesso fora do código. Para rollback, republicar a última versão aprovada de `out/` ou reverter a alteração no repositório e reconstruir. Esta entrega **não fez publicação externa nem definiu domínio**.

### Testar no GitHub Pages

O workflow `.github/workflows/pages.yml` instala as dependências, gera o build, executa as verificações e publica somente `out/`. React, Next e Tailwind não precisam de servidor no Pages: o código já chega compilado. Não enviar `node_modules`, `.next` ou `out` para a branch principal.

1. Em **Settings → Pages → Build and deployment → Source**, escolher **GitHub Actions**. A opção “Deploy from a branch → main → /(root)” não compila o código-fonte deste projeto.
2. Enviar os arquivos alterados, incluindo `.github/workflows/pages.yml`, à branch `main`.
3. Na aba **Actions**, acompanhar **Publicar site no GitHub Pages**. Também é possível iniciar por **Run workflow** após o workflow estar em `main`.
4. Após a execução concluir, abrir `https://andrehmeyer.github.io/site-orfanato-dos-gatos-bc/`.

O workflow obtém automaticamente `/site-orfanato-dos-gatos-bc` da configuração do Pages e define `NEXT_PUBLIC_BASE_PATH` durante o build. Logo, fontes, CSS, scripts, ícone, fotos futuras, links de retorno e metadados consideram o prefixo. Não precisa criar segredo ou token pessoal; o deploy usa as permissões declaradas do `GITHUB_TOKEN` automático.

A URL de testes não substitui o domínio institucional em `siteConfig`: as pendências permanecem nulas e o metadado `noindex` continua ativo. O `robots.txt` de um site de projeto fica na subpasta, enquanto crawlers consultam o arquivo da raiz do domínio; para esta homologação, o `noindex` do HTML é a indicação de indexação relevante. A página é publicamente acessível a quem tiver o endereço.

Para reproduzir o build do Pages no PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = '/site-orfanato-dos-gatos-bc'
npm.cmd run build
npm.cmd run preview
# Abrir http://localhost:3000/site-orfanato-dos-gatos-bc/
```

Use o mesmo valor ao rodar `npm.cmd run test:e2e`. Para voltar à raiz, execute `Remove-Item Env:NEXT_PUBLIC_BASE_PATH -ErrorAction SilentlyContinue` e refaça o build. O prefixo é configuração pública de build, não uma credencial. Publicar por GitHub Actions dispensa a etapa Jekyll e um arquivo `.nojekyll`.

## Testes e revisão

```sh
npm run check
npm run build
npx playwright install chromium
npm run test:e2e
```

O Playwright inicia e encerra o servidor estático automaticamente. Nesta entrega o Chromium foi instalado dentro de `.playwright/`; para reutilizá-lo no PowerShell:

```powershell
$env:PLAYWRIGHT_BROWSERS_PATH = "$PWD/.playwright"
npm.cmd run test:e2e
```

Cobertura: URLs válidas/inválidas, galerias pendentes/parciais/completas e primeira etapa correspondente, botões com destinos independentes, links oficiais, Pix exato, repetição, espera/falha/ausência de clipboard, teclado, menu/Escape/foco, âncoras após carregamento direto, rodapé, metadados e ausência de requisições externas. O navegador testa 360/390/430/768/1024/1440 px e também 320 px, texto a 200%, movimento reduzido e navegação sem JavaScript. Os testes de SEO verificam a ativação de canonical, imagem social, robots e sitemap com domínio e aprovação configurados. A análise axe cobre regras WCAG AA; não equivale a certificação completa.

Resultados e limites: [docs/VALIDACAO.md](docs/VALIDACAO.md). O executor local precisa poder iniciar e encerrar seus próprios processos de teste; isso não altera a arquitetura estática.

## Pendências para receber e aprovar com a ONG

- [x] Links das duas pastas Drive recebidos e associados aos respectivos botões de fêmeas/machos.
- [ ] Confirmar acesso anônimo às pastas em modo leitor. **RF-04 permanece pendente de aceite operacional.**
- [ ] Confirmar e documentar a origem e autorização de uso das fotografias atuais, que foram preservadas com textos alternativos.
- [ ] Texto institucional oficial, história/missão e aprovação dos textos base.
- [ ] Etapas e critérios reais de adoção.
- [ ] Confirmação final da chave e nome do beneficiário Pix; QR oficial apenas se desejado.
- [ ] WhatsApp/telefone/e-mail público, somente se a ONG quiser divulgá-los.
- [ ] Endereço, horários e CNPJ, apenas se fornecidos e autorizados.
- [ ] Modalidades confirmadas de doação de itens, voluntariado e regras do bazar, antes de anunciá-las.
- [ ] Aprovação da capa de compartilhamento e do eventual crédito à extensão da UNIVALI.
- [ ] Domínio, hospedagem e responsáveis pela continuidade técnica e editorial.

Sem painel, a ONG mantém os gatos nas pastas; textos, links e identidade do site são mantidos por quem tiver acesso ao código e ao deploy. Não há métricas, depoimentos, histórias individuais, números, regras específicas de adoção ou contatos presumidos.

Referências técnicas: [exportação estática do Next.js](https://nextjs.org/docs/app/guides/static-exports) e [fontes com next/font](https://nextjs.org/docs/app/api-reference/components/font).
