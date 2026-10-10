# Verificação da entrega

## Revisão final para Cloudflare Pages — 10/10/2026

Esta seção registra a revisão atual. Os registros abaixo dela são históricos e não descrevem o comportamento atual dos cards. As alterações que já existiam no diretório foram preservadas.

### Ajustes realizados

- Botões de adoção “Ver gatinhas” e “Ver gatinhos”, mantendo os artigos, fundos, títulos e ícones dos cards. Sem destino válido, o botão nativamente desabilitado preserva o visual definitivo; com destino válido, torna-se um link HTTPS em nova aba segura, com hover e foco. Cada pasta funciona independentemente.
- `src/lib/adoption.ts` mantém os textos definitivos da seção e da primeira etapa, independentemente do estado das duas URLs existentes em `siteConfig`. Não cria outra configuração de links nem consulta o Drive. Mantém o aviso de confirmar disponibilidade e condições com a ONG.
- Corrigida a sobreposição do menu com texto ampliado: a 200%, o cabeçalho media cerca de 164 px, mas o painel iniciava em 79 px. O painel agora começa abaixo do header; `ResizeObserver` mantém a margem das âncoras de acordo com a altura real. Sem novas dependências ou componentes.
- Pix: feedback de espera durante a cópia, sem conservar uma mensagem de sucesso anterior enquanto a nova operação está pendente. Rejeição e indisponibilidade continuam oferecendo cópia manual; chave e orientação bancária preservadas.
- SEO: título e descrição sugeridos, capa local 1200 × 630 com logo e cores existentes. `scripts/generate-og.mjs` usa React/Next já instalados, somente para gerar o PNG antes da publicação; não participa do JavaScript do navegador.
- Mantidos `domain: null` e `editorial.approved: false`: sem domínio inventado, canonical ou URL de imagem absoluta; `noindex`, robots bloqueado e sitemap vazio até a configuração oficial. Testada também a ativação dos metadados em memória, com domínio de fixture e aprovação.
- `_headers` deixa de impedir permanentemente a indexação do `pages.dev` principal, que pode ser o endereço definitivo gratuito. Previews continuam com `noindex`. Configuração estática do Next já estava correta e foi preservada.
- Removido uso depreciado de `priority` na marca e seletores CSS sem elementos correspondentes. Fotografias WebP, proporções, Hero com preload, Sobre com lazy loading, fontes locais no runtime e arquitetura de página única preservados.
- README atualizado para documentar os botões, seus estados de link, manutenção, SEO e publicação no Cloudflare.

### Comandos e resultados

Principais arquivos desta revisão:

| Arquivos | Finalidade |
| --- | --- |
| `src/config/site.ts`, `src/lib/adoption.ts` | Metadados, capa e derivação central dos textos de disponibilidade |
| `src/components/AdoptionCard.tsx` | Botões específicos, estados independentes e descrição acessível |
| `src/components/MobileNavigation.tsx`, `src/app/globals.css` | Altura real do cabeçalho, painel mobile, âncoras e estados visuais |
| `src/components/PixCopyButton.tsx` | Feedback de operação pendente, sucesso e falha |
| `src/app/page.tsx`, `src/app/layout.tsx` | Uso dos textos derivados, carregamento da marca e metadados da imagem |
| `scripts/generate-og.mjs`, `public/brand/og-cover.png` | Fonte reproduzível e arte PNG estática de compartilhamento |
| `public/_headers` | Indexação de previews sem bloquear o endereço definitivo gratuito |
| `tests/interactions.test.tsx`, `tests/links.test.ts`, `tests/setup.ts`, `tests/seo.test.ts`, `tests/e2e/*.spec.ts` | Regressão funcional, configuração, acessibilidade e responsividade |
| `README.md`, `docs/VALIDACAO.md`, `docs/screenshots/` | Instruções atualizadas, resultados e evidências |

Não houve reconstrução de componentes ou mudança de arquitetura. Os únicos novos módulos de produção são o helper de textos e o gerador executado manualmente para a imagem social.

| Verificação executada | Resultado |
| --- | --- |
| `npm.cmd run check` | ESLint sem avisos, TypeScript sem erros e **42 testes** Vitest aprovados em quatro arquivos |
| `node scripts/generate-og.mjs` | PNG 1200 × 630 gerado e revisado visualmente |
| `npm.cmd run build` | Sucesso, sem avisos do Next; exportação final em `out/` |
| `npm.cmd run test:e2e` | **27 cenários aprovados**; um cenário interrompido por erro local de gravação da captura de 768 px |
| `npm.cmd run test:e2e -- --grep 'layout e navegação em 768px'` | Cenário repetido integralmente e aprovado; **28 cenários distintos validados** no conjunto |
| Inspeção HTTP da exportação | `/`, `/robots.txt`, `/sitemap.xml` e `/brand/og-cover.png`: 200 e tipos corretos; URL inexistente: 404 |
| Assets | Imagens, favicon, CSS, fontes e scripts carregados sem erro; nenhuma requisição externa no carregamento da página |
| Estrutura estática | HTML principal/404, robots, sitemap, `_headers`, imagem social e `_next/` presentes; sem Functions, Worker ou backend |

O último build inclui a remoção de seletores CSS sem uso. Os cenários de menu, Pix, âncoras, teclado e acessibilidade foram executados após a correção do cabeçalho. A repetição de 768 px usou a exportação final. A única falha da última rodada geral foi `UNKNOWN: unknown error, open ...768-inicio.png`; o cenário passou na repetição sem alterar suas verificações.

Uma rodada anterior identificou o problema real do menu ampliado, um seletor de teste ambíguo entre as duas marcas e um acesso de tipagem incorreto no novo teste de Twitter Cards; todos foram corrigidos e revalidados. O aviso `NO_COLOR`/`FORCE_COLOR` do executor de testes refere-se apenas à cor do terminal.

Ambiente: Windows, Node 22.14.0, npm 10.9.2. Chromium local em `.playwright/` (`PLAYWRIGHT_BROWSERS_PATH`); o Browser integrado retornou indisponível. Build com heap de 512 MB, `CIRCLE_NODE_TOTAL=2` e `RAYON_NUM_THREADS=2`; verificações de código com heap de 384 MB. São limites temporários da execução, sem alterações na configuração de produção. Prévia estática final em `http://localhost:4177/`. O encerramento automático de dois servidores de teste ficou pendente no Windows; foram encerrados apenas esses processos, e a rodada final reutilizou um servidor local iniciado separadamente.

### Responsividade, interações e acessibilidade

- Revisão real em **360, 390, 430, 768, 1024 e 1440 px**, mais 320 px. Capturas de todas as seções inspecionadas; sem overflow horizontal, sobreposição normal, fotos distorcidas ou rostos/orelhas cortados. Cards e botões consistentes; etapas em uma, duas ou quatro colunas conforme o espaço.
- Menu: clique, Enter/Espaço, Tab, Escape com retorno de foco, clique fora, mudança de breakpoint e fechamento após escolher seção. Painel e destino de âncora conferidos também com texto a 200%.
- Navegação: destinos diretos com hash em documentos novos, todas as entradas do menu, ações do Hero e todos os links internos do rodapé. Movimento reduzido e conteúdo/navegação sem JavaScript conferidos.
- Adoção: nenhuma, uma ou ambas as pastas configuradas, descrições correspondentes, estados habilitados/desabilitados e destinos separados. Abertura das pastas em nova aba por clique e teclado usa fixtures interceptadas localmente, sem fornecer URLs fictícias ao site.
- Pix: área de transferência real do Chromium contém `orfanatodosgatos@gmail.com`; repetição, Enter/Espaço, ausência de clipboard e orientação manual. Espera e rejeição verificadas também nos testes de componente.
- Axe: **zero violações nas regras A/AA selecionadas**, incluindo WCAG 2.2 AA, na página a 375/1440 px, nos cards habilitados a 360/1440 px e nos dois estados parciais a 360 px. Verificados foco visível, link de pular conteúdo, um único h1 e textos alternativos.
- Preservadas as fotos existentes: Hero 980 × 653, 78.910 bytes; Sobre 547 × 806, 17.636 bytes. A capa social tem 121.095 bytes e não é carregada na página. Logo e favicon mantêm o mesmo SHA-256 já registrado abaixo.

Evidências: [mobile 360 px](screenshots/360-pagina.png), [390 px](screenshots/390-pagina.png), [430 px](screenshots/430-pagina.png), [tablet](screenshots/768-pagina.png), [1024 px](screenshots/1024-pagina.png), [desktop](screenshots/1440-pagina.png), [menu a 200%](screenshots/375-menu-texto-200.png), [somente fêmeas](screenshots/360-galeria-parcial-female.png), [somente machos](screenshots/360-galeria-parcial-male.png) e [capa social](../public/brand/og-cover.png).

### Limites e pendências externas

- Não houve deploy. Após publicar, conferir aplicação dos cabeçalhos Cloudflare, HTTPS, 404, metadados absolutos e cópia Pix no endereço real. A prévia local serve os arquivos, mas não aplica `_headers`.
- Faltam URLs oficiais e permissões de leitura anônima das pastas Drive. Isso não impede publicar os botões desabilitados.
- Definir o endereço definitivo em `siteConfig.domain` e, após aprovação editorial, ativar `siteConfig.editorial.approved` e reconstruir para permitir indexação.
- Registrar confirmação de origem/autorização das fotografias atuais e aprovação dos textos e da capa pela ONG. Não foram substituídas fotos ou inventados dados institucionais.
- Conferir os dados do recebedor com a ONG; nenhuma transferência ou QR Pix foi criado. Telefone, endereço postal e demais dados não fornecidos continuam ausentes, sem bloquear as funções existentes.
- Instagram oficial, bazar e Maps têm os destinos fornecidos/preservados, aviso de nova aba e atributos seguros. A tentativa de abrir esses serviços pela ferramenta de consulta retornou `Cache miss`/URL inacessível; conteúdo e disponibilidade externa precisam de conferência manual. Não foi afirmado acesso remoto bem-sucedido.
- Safari/iOS, Firefox, leitores de tela, dispositivos físicos, Lighthouse e métricas de campo não foram executados. Axe e inspeção visual não equivalem a certificação integral WCAG.
- Build em subdiretório do GitHub Pages não foi repetido nesta revisão; o alvo atual é Cloudflare na raiz. O registro anterior abaixo documenta a verificação histórica desse caminho.

## Registro histórico: refinamento visual — 10/10/2026

Revisão incremental dos componentes existentes, preservando Next.js, TypeScript, Tailwind, exportação estática, paleta, fotos, textos das quatro etapas, chave Pix, perfis oficiais e coordenadas do Maps. Nenhuma dependência adicionada.

- Adoção: CTA “Ver gatinhas”/“Ver gatinhos” com ícone de link externo, foco visível, hover discreto e nova aba segura quando há destino válido. Sem destino, o CTA permanece desabilitado e a alternativa pelo Instagram continua disponível. Os textos da seção permanecem definitivos em todos os estados.
- Título “Como funciona a adoção?”, preservando subtítulo e etapas.
- Contato: botões com larguras iguais, coluna centralizada, localização próxima às rotas e orientação de visita abaixo do botão.
- Espaçamentos: tokens de seção em 96 px no desktop, 72 px no tablet e 60 px no mobile; cards em 24/20 px. Hero e rodapé mantêm suas necessidades específicas.
- Hero: link da causa com contraste e feedback melhores; fotos, enquadramentos e alinhamento preservados.
- Navegação: sticky header, rolagem suave e movimento reduzido preservados; margem de âncora também aplicada ao destino do link de pular conteúdo.

| Verificação atual | Resultado |
| --- | --- |
| `npm run lint` | Passou sem avisos |
| `npm run typecheck` | Passou |
| `npm test -- --maxWorkers=1` | 36 testes passaram |
| `npm run build` | Passou; seis páginas geradas estaticamente e artefato `out/` confirmado |
| Chromium/Playwright | 21 cenários distintos validados: execução geral e reexecução dos sete cenários de âncoras/cards após correção da expectativa de fim de página |
| 360, 390, 768, 1024, 1440 px; adicional de 320 px | Sem overflow horizontal; capturas revisadas, fotos preservadas, cards empilhados no mobile e Contato alinhado |
| URLs com hash | Cada destino carregado em documento novo; títulos visíveis abaixo do header, menu e rodapé funcionais |
| Cards com URLs válidas | Componente real renderizado em página isolada; foco por Tab, clique no título e abertura por Enter em nova aba; destinos de teste interceptados localmente |
| Pix | Chave exata na área de transferência, repetição, Enter/Espaço, erro e alternativa manual preservados |
| Acessibilidade | Axe sem violações nas regras selecionadas; verificação da página em 375/1440 px e dos cards disponíveis em 360/1440 px |
| Reflow e movimento | Texto a 200%, movimento reduzido e navegação sem JavaScript aprovados |
| Recursos locais | Imagens, CSS, fontes, scripts, ícone e 404 carregados na exportação; nenhuma chamada externa na carga |

O teste de âncora considera o limite natural de rolagem perto do rodapé: quando não há conteúdo suficiente abaixo do Contato para alinhá-lo ao topo, verifica o fim da página e a visibilidade do título. Não foi adicionado espaço vazio para forçar esse alinhamento.

As verificações usaram a exportação em `http://localhost:4173/`. Por limitação de memória do Windows, lint/TypeScript/testes rodaram com heap de 384 MB; o build usou 512 MB, `CIRCLE_NODE_TOTAL=2` (um worker de geração) e `RAYON_NUM_THREADS=2`. São ajustes temporários de execução, sem mudanças na configuração de produção. O navegador integrado estava indisponível; foi usado o Chromium já instalado em `.playwright/`.

Arquivos alterados nesta revisão: `src/components/AdoptionCard.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `tests/interactions.test.tsx`, `tests/e2e/site.spec.ts`, `README.md`, este relatório e capturas em `docs/screenshots/`. Alterações locais anteriores em fotos e configuração foram preservadas.

Evidências visuais: [Hero em 360 px](screenshots/360-inicio.png), [adoção pendente em 390 px](screenshots/390-adocao.png), [galerias disponíveis e foco em 360 px](screenshots/360-galerias-disponiveis.png), [galerias disponíveis em 1440 px](screenshots/1440-galerias-disponiveis.png), [Contato mobile](screenshots/360-contato.png) e [Contato tablet](screenshots/768-contato.png).

Limites: URLs reais do Drive continuam nulas, portanto acesso e permissões das pastas dependem do fornecimento desses links. Firefox, Safari/iOS, leitores de tela e dispositivos físicos não foram testados. Não houve publicação nem transferência Pix. A validação do subdiretório Pages abaixo é o registro anterior; esta revisão executou o build na raiz.

## Registro anterior da entrega

Data de referência do projeto: 09/10/2026. Verificação sobre os arquivos exportados em `out/`, servidos localmente sem runtime Next.js.

## Evidências

| Verificação | Resultado |
| --- | --- |
| `npm run build` | Passou; rotas e metadados prerenderizados, `out/` gerado |
| `npm run lint` | Passou, sem avisos |
| `npm run typecheck` | Passou |
| `npm test` | 33 testes passaram, incluindo caminhos de publicação |
| `npm run test:e2e` | 13 testes Chromium passaram no subdiretório do Pages |
| 320, 375, 768, 1024, 1440 px | Sem overflow horizontal; menu e âncoras funcionais |
| Texto a 200% em 375 px | Sem overflow ou conteúdo cortado após ajuste de reflow |
| Axe em 375 e 1440 px | Zero violações nas regras WCAG A/AA selecionadas, incluindo WCAG 2.2 AA |
| Pix | Clipboard contém exatamente `orfanatodosgatos@gmail.com`; Enter/Espaço e repetição verificados |
| Clipboard ausente/negado | Orientação de cópia manual; chave permanece visível |
| Sem JavaScript | Conteúdo estático, navegação alternativa e instrução manual do Pix |
| Requisições na carga da página | Nenhuma chamada para outra origem; fontes, marca e scripts locais |
| Metadados | pt-BR, título, descrição, OG, Twitter e favicon; sem canonical fictício |
| Marca | SHA-256 idêntico entre original, cópia pública e ícone |

SHA-256 da logo: `2369C1760C0EA566EA2996AEA07D154E2A59C31DD5FEF38F3B932552A1B38279`.

O fluxo verificado vai da navegação aos dados locais e links externos, e do clique Pix à área de transferência e ao feedback acessível. Não há API, banco ou fluxo de pagamento a testar. Os links dos Instagrams correspondem exatamente aos fornecidos, com HTTPS, nova aba, aviso acessível e `noopener noreferrer`.

## Preparação para GitHub Pages

- Build estático validado com `NEXT_PUBLIC_BASE_PATH=/site-orfanato-dos-gatos-bc`.
- Build também validado com prefixo vazio; `out/` foi deixado na configuração padrão da raiz para a prévia local.
- Os 13 testes de navegador foram executados em `http://localhost:4173/site-orfanato-dos-gatos-bc/`, simulando o caminho público do repositório.
- Verificados logo, ícone, CSS, scripts, imagens carregadas, retorno da página 404, ausência de respostas de erro, navegação e Pix no subdiretório.
- `.github/workflows/pages.yml` usa as Actions oficiais para instalar, compilar, verificar e publicar o artefato `out/`. O prefixo vem dos metadados do Pages.
- As verificações locais passaram; o workflow remoto ainda depende de enviar os arquivos a `main` e selecionar **GitHub Actions** em Settings → Pages.
- Nesta revisão, o Windows apresentou cerca de 1 GB de memória virtual livre. O build foi validado com heap de 512 MB e um worker de geração, por variáveis temporárias da execução; nenhum limite adicional foi imposto ao workflow remoto.

## Capturas

Cada largura possui capturas do início, do destino de adoção e da página inteira em `docs/screenshots/`:

- [Início 320 px](screenshots/320-inicio.png), [375 px](screenshots/375-inicio.png), [768 px](screenshots/768-inicio.png), [1024 px](screenshots/1024-inicio.png), [1440 px](screenshots/1440-inicio.png).
- [Página completa em 375 px](screenshots/375-pagina.png) e [1440 px](screenshots/1440-pagina.png).
- [Texto ampliado a 200%](screenshots/375-texto-200.png).

## Aceite dos requisitos P0

- RF-01–03, RF-05–11 e RF-13: implementados e verificados nos limites descritos.
- RF-04: estados e validação de destinos implementados; testes usam URLs de fixture apenas em memória. As URLs reais seguem nulas. O aceite de acesso às pastas correspondentes sem login **depende dos links e permissões da ONG**.
- RF-12: título, descrição, idioma, favicon e metadados textuais presentes. Canonical, sitemap público e imagem social serão finalizados com domínio e arte aprovados. Homologação não indexável.

## Limites e homologação humana

- Não foram fornecidos links de Drive; não foi possível verificar conteúdo ou acesso anônimo das pastas reais.
- Pix testado quanto à exibição/cópia; nenhuma transferência iniciada e nenhuma validação bancária do recebedor.
- Fotos, história oficial, contatos, regras e demais dados exigem aprovação da ONG; consultar o README.
- Chromium executado localmente. Firefox, Safari/iOS, leitores de tela e dispositivos físicos não executados nesta entrega.
- Axe e revisão visual não constituem certificação completa WCAG. O teste de 200% amplia o tamanho do texto; não é medição em dispositivo físico.
- Lighthouse e métricas de campo (LCP, CLS e INP) não medidos; nenhuma pontuação ou meta de performance é alegada.
- Nenhum deploy público. A titularidade da hospedagem, domínio e manutenção ainda precisa ser definida pela ONG.
