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
public/images/                Reservado para imagens autorizadas
src/config/site.ts            Dados, textos institucionais base e navegação
src/lib/links.ts               Validação de pastas Drive e domínio
src/app/page.tsx               Seções da página única
src/app/globals.css            Tokens, layout, responsividade e acessibilidade
src/app/layout.tsx             Fontes e metadados
src/app/robots.ts, sitemap.ts  Metadados exportados no build
src/components/               Menu, Pix, adoção e elementos visuais
tests/                        Testes de configuração, componentes e navegador
scripts/preview.mjs            Servidor local de arquivos para revisão
docs/VALIDACAO.md              Evidências e limites da verificação
docs/screenshots/             Revisão visual nas cinco larguras
out/                          Artefato estático gerado
```

Uma rota de conteúdo `/`, com âncoras Início, Sobre, Adoção, Como adotar, Como ajudar, Doar e Contato. Bazar integra Como ajudar. A rota 404 e os arquivos de metadados são saídas do framework.

Os componentes são renderizados no build; somente menu e botão Pix usam estado no cliente. Não há banco de dados, backend, login, painel, formulários, APIs externas, analytics, embeds, cookies de rastreamento ou armazenamento de dados dos visitantes. Drive e Instagram são hyperlinks. Plus Jakarta Sans e Inter são obtidas por `next/font/google` durante o build e servidas localmente em produção: o build inicial exige acesso aos servidores de fontes, mas a página não consulta Google Fonts em runtime.

## Dados e manutenção

Edite **`src/config/site.ts`**. `null` significa informação ainda não confirmada. Não preencher com dados de exemplo.

### Pastas de adoção

1. A ONG deve criar/controlar uma pasta para fêmeas e outra para machos.
2. Configurar **Acesso geral → Qualquer pessoa com o link → Leitor** em cada pasta.
3. Testar os links em janela anônima, sem conta Google. Confirmar sexo correto e ausência de permissão de edição.
4. Preencher `adoption.femaleDriveUrl` e `adoption.maleDriveUrl` com os links recebidos.
5. Executar testes, build e redeploy.

São aceitas pastas HTTPS no host exato `drive.google.com`, incluindo `/drive/folders/ID`, `/drive/u/0/folders/ID` e o formato antigo `/open?id=ID`. URLs inválidas ou ausentes preservam “Link em preparação”, sem botão inativo nem link falso, e acesso alternativo ao Instagram. A validação sintática não verifica permissões nem conteúdo das pastas; a checagem anônima é obrigatória.

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

Salve fotos autorizadas e otimizadas em WebP/AVIF em `public/images/` e configure `media.hero` ou `media.about` com `{ src: '/images/arquivo.webp', alt: 'Descrição objetiva do conteúdo autorizado' }`. Use proporção próxima a 560 × 490, preferencialmente até 1120 px de largura. Os componentes reservam espaço e usam dimensões explícitas. Não utilizar fotos de terceiros como se fossem animais da ONG. Sem imagens aprovadas, permanecem as ilustrações neutras, identificadas como ilustração.

A logo permanece intacta em `assets/` e `public/brand/`. O ícone usa a mesma imagem quadrada sem distorção. Não substituir a marca sem aprovação. Paleta, foco e pontos de quebra estão em `globals.css`.

WhatsApp, e-mail público, endereço, horários, CNPJ e regras de colaboração estão preparados como nulos. Sua inclusão futura requer validação editorial e ajuste de interface; preencher esses campos isoladamente não cria automaticamente novos canais ou ofertas.

## SEO e deploy

A entrega mantém `editorial.approved: false` e `domain: null`. A homologação tem `noindex`, `robots.txt` bloqueia rastreamento, o sitemap fica vazio e não há canonical ou domínio fictício. Open Graph e Twitter já têm título e descrição; a imagem social está pendente de aprovação.

Antes da publicação institucional:

1. Concluir a lista de homologação abaixo, incluindo os dois links Drive e a revisão da chave Pix.
2. Preencher `domain` com a origem HTTPS real, sem subdiretórios.
3. Após aprovação, definir `editorial.approved: true`.
4. Se houver capa social validada, colocar o arquivo em `public/` e definir `media.ogCover` com caminho local iniciado por `/`. O domínio real permite gerar o endereço absoluto de compartilhamento.
5. Executar `npm run check`, `npm run build` e `npm run test:e2e`. Atualizar os testes de estado inicial quando dados confirmados substituírem as pendências.
6. Publicar **somente o conteúdo de `out/`**, preservando `_next/` e os demais subdiretórios.

Qualquer hospedagem de arquivos estáticos com HTTPS é suficiente. Configuração de referência para Vercel ou Cloudflare Pages: instalação `npm ci`, build `npm run build`, saída `out`. Selecionar preset estático/“Other” ou “None”, sem runtime SSR, funções ou adaptadores de backend. Configurar o host para servir `index.html` e `404.html`. Por padrão o site usa a raiz do domínio; para subpastas, definir `NEXT_PUBLIC_BASE_PATH` no build conforme abaixo.

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

Cobertura: URLs válidas/inválidas, destinos por sexo, links oficiais, Pix exato, repetição, falha/ausência de clipboard, teclado, menu/Escape/foco, âncoras, metadados e ausência de requisições externas. O navegador testa 320/375/768/1024/1440 px, texto a 200%, movimento reduzido e navegação sem JavaScript. A análise axe cobre regras WCAG AA; não equivale a certificação completa.

Resultados e limites: [docs/VALIDACAO.md](docs/VALIDACAO.md). O executor local precisa poder iniciar e encerrar seus próprios processos de teste; isso não altera a arquitetura estática.

## Pendências para receber e aprovar com a ONG

- [ ] Links das duas pastas Drive, correspondência fêmeas/machos e acesso anônimo em modo leitor. **RF-04 permanece pendente de aceite operacional.**
- [ ] Fotografias reais autorizadas e descrições alternativas.
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
