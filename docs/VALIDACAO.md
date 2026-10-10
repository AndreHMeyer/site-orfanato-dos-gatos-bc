# Verificação da entrega

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
