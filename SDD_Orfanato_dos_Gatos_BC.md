# SDD — Site Institucional Orfanato dos Gatos BC

**Documento:** Software Design Document (Especificação Funcional, UX/UI e Técnica)  
**Versão:** 1.0 — especificação para implementação do MVP  
**Data-base:** 09/10/2026  
**Projeto:** Projeto Comunitário de Extensão Universitária — UNIVALI  
**Produto:** Site público institucional do Orfanato dos Gatos BC  
**Idioma e localidade:** Português do Brasil (pt-BR); Balneário Camboriú, Santa Catarina  
**Responsabilidade de execução:** Agente de desenvolvimento sob revisão da equipe universitária  
**Estado do documento:** Aprovado como proposta técnica para desenvolvimento; conteúdo institucional e links pendentes precisam de validação da ONG antes da publicação final.

> **Instrução para o agente:** este documento é a fonte de verdade da implementação solicitada. **Não invente fatos institucionais, métricas, regras de adoção, chave Pix alternativa, contatos, fotos nem URLs de Drive.** Trate os itens marcados como pendentes como configurações nulas, com comportamento de interface definido neste documento. Entregue uma experiência visual elaborada, acessível e funcional, não apenas uma estrutura genérica de seções.

---

## 1. Visão geral e contexto

### 1.1 Contexto do projeto

O Orfanato dos Gatos BC é a organização de Balneário Camboriú/SC beneficiada pelo projeto de extensão universitária. O documento de planejamento acadêmico descreve a atuação da instituição no acolhimento, cuidado, recuperação e encaminhamento de gatos para adoção responsável. O problema prioritário escolhido pelo grupo foi a necessidade de organizar e divulgar informações sobre os gatos e aumentar o alcance das ações da ONG.

Outras alternativas foram consideradas no diagnóstico — controle interno de vacinação e projeto de gatificação — mas **não integram o escopo deste site**. A ONG solicitou explicitamente uma forma de consultar gatos separados por sexo. Para não criar um sistema administrativo e banco de dados, adotou-se a navegação para **duas pastas públicas em modo leitor do Google Drive**, mantidas pela própria instituição.

### 1.2 Proposta de valor

Uma presença digital única, clara, confiável e acolhedora, que permita a qualquer visitante:

1. Entender o propósito e o trabalho da ONG.
2. Encontrar gatos para adoção, separados entre fêmeas e machos.
3. Descobrir como prosseguir com uma adoção, pelos canais oficiais.
4. Apoiar financeiramente a ONG por Pix.
5. Acessar o Instagram principal e o Instagram do bazar solidário.

### 1.3 Objetivo do produto

Criar um **site institucional responsivo e predominantemente estático, com página única**, focado em informação, adoção responsável, doação e direcionamento para canais externos, com baixa complexidade de operação após a entrega.

### 1.4 Públicos

- **Visitantes principais:** moradores de Balneário Camboriú e região com interesse em adoção.
- **Visitantes secundários:** apoiadores, doadores, voluntários em potencial e pessoas que desejam conhecer/divulgar a ONG.
- **Responsáveis pela ONG:** mantenedores das pastas no Drive, titulares dos canais oficiais e validadores do conteúdo.
- **Equipe universitária:** responsável pela construção, publicação, documentação e entrega.

### 1.5 Princípios de produto

- Primeiro conteúdo e clareza; animações e decoração em segundo plano.
- Acolhimento emocional sem infantilização visual.
- Informações verdadeiras e validadas; **sem lorem ipsum na entrega**.
- **Sem CMS, sem painel de administração, sem banco de dados e sem login.**
- Fluxos de adoção e contribuição objetivos; visitantes não devem procurar por links importantes.
- Conteúdo acessível em celular e conexões móveis.
- Manutenção por alterações pontuais em configuração e arquivos; fotos e listagem dos gatos gerenciadas fora do site.

## 2. Fonte, confirmação e pendências

### 2.1 Dados confirmados para implementação

| Campo | Valor / decisão | Origem |
|---|---|---|
| Nome exibido | Orfanato dos Gatos BC | Planejamento acadêmico e conversa |
| Região | Balneário Camboriú — SC | Planejamento acadêmico |
| Chave Pix (tipo e-mail) | `orfanatodosgatos@gmail.com` | Informada diretamente pelo solicitante |
| Instagram principal | `https://www.instagram.com/orfanatodosgatosbc/` | Informado diretamente pelo solicitante |
| Instagram do bazar | `https://www.instagram.com/bazar_orfanatodosgatos` | Informado diretamente pelo solicitante |
| Marca | Logo do gato dentro de casinha, cores coral e verde | Arquivo de imagem enviado |
| Navegação dos gatos | Separação fêmeas/machos, acessadas por pastas no Google Drive | Demanda transmitida pela ONG |
| Arquitetura | Site estático sem banco/contas/painel | Definição de escopo |
| Prioridade principal | Divulgação de adoção e da causa, doações e contato | Documento e conversa |

### 2.2 Dados ainda pendentes — NÃO adivinhar

| Campo | Estado | Tratamento na versão de desenvolvimento |
|---|---|---|
| Link da pasta de gatas/fêmeas | Pendente | Card visível, estado “Link em preparação”, **sem botão inativo fingindo ser funcional**; link alternativo para Instagram claramente identificado |
| Link da pasta de gatos/machos | Pendente | Mesma regra acima |
| Fotos reais dos gatos e da ONG | Pendentes | Componentes com fundos/ilustrações neutras e acessíveis; inserir fotos finais somente após autorização |
| Descrição oficial, história, missão e números | Pendentes | Usar texto institucional curto baseado exclusivamente no planejamento, marcado para aprovação editorial; não inventar datas/números/casos |
| WhatsApp / telefone / e-mail de contato público | Pendente | Não criar botão de WhatsApp, número fictício ou `mailto:` com a chave Pix; Instagram é o canal público disponível |
| Etapas/requisitos efetivos da adoção | Pendentes | Explicação genérica não normativa; **não atribuir exigências específicas** à ONG sem validação |
| Nome do recebedor da conta Pix | Pendente | Não exibir; orientar conferência do beneficiário no app bancário |
| QR Code Pix oficial | Pendente | Não mostrar QR genérico ou falso; opção de incluir arquivo validado depois |
| Endereço físico, horários, CNPJ, domínio | Pendentes | Não exibir valores presumidos |
| Doações de itens, voluntariado e regras do bazar | Pendentes | Exibir como formas de colaboração apenas se confirmadas; caso contrário, incentivar contato via Instagram |

**Regra de publicação:** links de Drive e permissões corretas são obrigatórios para declarar o requisito de consulta por sexo concluído. Enquanto não recebidos, o site pode ser desenvolvido e mostrado em homologação com estados honestos de indisponibilidade; o Pix e os links sociais confirmados já podem funcionar.

## 3. Escopo e requisitos

### 3.1 Escopo do MVP (P0)

| ID | Requisito | Prioridade | Critério principal |
|---|---|---|---|
| RF-01 | Página inicial única com âncoras de navegação | P0 | Todas as seções navegáveis no desktop e celular |
| RF-02 | Identidade visual derivada do logo | P0 | Verde/coral com contraste correto e uso do logo original |
| RF-03 | Apresentação institucional | P0 | Seção Sobre com texto não especulativo |
| RF-04 | Área de adoção com seleção “Fêmeas” / “Machos” | P0 | Cada card abre a pasta **correspondente** quando configurada |
| RF-05 | Orientação básica de adoção responsável | P0 | Explicação simples e CTA para canal oficial |
| RF-06 | Doação Pix | P0 | Chave visível + copiar + mensagem de sucesso/erro acessível |
| RF-07 | Instagram principal | P0 | Link externo correto e identificável |
| RF-08 | Instagram do bazar | P0 | Card próprio e link externo correto |
| RF-09 | Rodapé institucional e navegação | P0 | Links repetidos e identificação da ONG |
| RF-10 | Layout responsivo e acessível | P0 | Sem overflow horizontal, navegação teclado, contraste AA |
| RF-11 | Configuração centralizada | P0 | Dados atualizáveis em arquivo único, sem backend |
| RF-12 | SEO básico, metadados, favicon e compartilhamento | P0 | Título/descrição corretos, OG local após aprovação |
| RF-13 | Static export e deploy sem servidor | P0 | `next build` gera `out/` sem dependências dinâmicas |

### 3.2 Melhoria opcional somente após MVP (P1)

- Botão fixo discreto “Doe via Pix” no celular, se não atrapalhar o conteúdo.
- Animações suaves de entrada com `prefers-reduced-motion` respeitado, sem dependência de biblioteca pesada.
- QR Code Pix **apenas se fornecido e validado pela instituição**.
- Fotografias adicionais, depoimentos ou indicadores **apenas mediante conteúdo fornecido e autorizado**.
- Página adicional de transparência ou perguntas frequentes **apenas com conteúdo aprovado**.

### 3.3 Fora de escopo (não implementar)

- Autenticação, sessão, cadastro/login de visitantes, dashboard administrativo.
- Banco de dados, Supabase, Firebase, PostgreSQL, APIs próprias ou CMS.
- Cadastro, edição e filtros dinâmicos de gatos no site.
- Filtros adicionais a sexo (idade, raça, porte, saúde etc.).
- Fluxo de solicitação/aprovação de adoção dentro do site.
- Formulário de contato ou coleta de dados pessoais.
- Gateway de pagamento, acompanhamento de doações, conciliação, recorrência.
- Loja virtual, catálogo de produtos ou checkout do bazar.
- Importação automática de fotos/dados de Drive ou API do Instagram.
- Mapa, endereço, localização em tempo real ou contatos não autorizados.
- Contadores fictícios de resgates, depoimentos simulados, “disponível agora” sem fonte atualizada.
- Tema escuro na V1.

## 4. Arquitetura de informação

### 4.1 Formato

**Uma rota pública `/`**, organizada em seções com âncoras. Não construir páginas avulsas a menos que requisito futuro aprovado exija. Rotas de erro/404 inerentes ao framework são aceitas.

### 4.2 Menu principal

Ordem no desktop:

1. **Início** → `#inicio`
2. **Sobre** → `#sobre`
3. **Adoção** → `#adocao`
4. **Como adotar** → `#como-adotar`
5. **Como ajudar** → `#ajude`
6. **Contato** → `#contato`
7. **CTA destacado:** “Doar via Pix” → `#doar`

No celular: marca à esquerda, controle de menu acessível à direita, painel com as mesmas opções e CTA para doação. Ações de menu fecham o painel; Escape fecha; `aria-expanded` reflete o estado. Usar âncoras e `scroll-margin-top` para compensar o cabeçalho fixo. **Bazar** é um bloco destacado dentro de “Como ajudar”; também pode aparecer como link secundário no rodapé.

### 4.3 Ordem das seções

`Header` → `Hero` → `Sobre` → `Gatos para adoção` → `Como adotar` → `Doações/Pix` → `Bazar solidário` → `Acompanhe/Contato` → `Footer`.

### 4.4 Fluxos do usuário

**Fluxo A: adoção:** acessar site → clique “Conhecer os gatos” → seção com cards de fêmeas/machos → escolher sexo → abrir pasta de Drive em nova aba → visualizar conteúdo → retornar ao site e abrir Instagram para orientação sobre adoção.

**Fluxo B: doação:** acessar site → clicar “Doar via Pix” → localizar chave → copiar → abrir aplicativo bancário e realizar pagamento → conferir o recebedor antes de confirmar. **O site não informa confirmação de pagamento, não executa transferência e não sabe se houve doação.**

**Fluxo C: apoio/bazar:** acessar “Como ajudar” → ver cartão “Bazar solidário” → abrir `bazar_orfanatodosgatos` no Instagram.

**Fluxo D: conhecer a ONG:** ler Hero e Sobre → abrir Instagram principal → acompanhar atualizações e contatar a ONG por canal externo.

## 5. Especificação detalhada da interface e dos textos

### 5.1 Cabeçalho (`#inicio`)

- Fundo branco ou branco quente; borda inferior discreta; comportamento `sticky` sem ocupar demasiada altura.
- Marca com logo no lado esquerdo e nome acessível “Orfanato dos Gatos BC”.
- Navegação em linha no desktop; hamburger com rótulo “Abrir menu”/“Fechar menu” no celular.
- Botão “Doar via Pix” com fundo verde profundo e texto branco.
- `focus-visible` óbvio; nenhuma barra cobrindo títulos após navegação por âncoras.

### 5.2 Hero

- Layout duas colunas a partir de 1024 px: texto à esquerda, fotografia real/área de imagem à direita; empilhado no celular com prioridade para o título.
- Microetiqueta: “Balneário Camboriú • SC”.
- H1 sugerido: **“Todo gatinho merece um lar cheio de amor.”**
- Texto base sugerido (sujeito à aprovação): “Conheça o trabalho do Orfanato dos Gatos BC e descubra como apoiar gatos que precisam de cuidado, carinho e uma nova oportunidade.”
- CTA primário: “Conhecer os gatos” → `#adocao`.
- CTA secundário: “Fazer uma doação” → `#doar`.
- Área visual: fotografia real da ONG quando recebida; até lá, layout de imagem neutro com ilustração leve relacionada à marca (não simular foto de gato real da instituição).
- Sem contadores não comprovados ou carrossel pesado.

### 5.3 Sobre (`#sobre`)

- Título sugerido: **“Cuidando de vidas, transformando histórias.”**
- Texto inicial prudente, a ser validado com a ONG: “O Orfanato dos Gatos BC atua no acolhimento e cuidado de gatos em situação de vulnerabilidade, buscando oferecer a eles melhores condições e a oportunidade de encontrar um novo lar.”
- Complemento possível: “O apoio da comunidade é parte importante desse trabalho.”
- Uma foto real da instituição em formato paisagem ou retrato editorial após autorização.
- Não exibir fundação, endereço, quantidade de animais, estrutura, equipe ou serviços específicos sem confirmação.

### 5.4 Adoção (`#adocao`)

- Eyebrow: “Adoção responsável”.
- H2: **“Seu novo melhor amigo pode estar esperando por você.”**
- Texto curto: “Conheça os gatos divulgados pela ONG. Escolha uma categoria para abrir a pasta correspondente no Google Drive.”
- Dois cartões equivalentes, mesma hierarquia e tamanho:
  - **Fêmeas:** título “Conheça as fêmeas”; descrição “Veja as gatinhas divulgadas para adoção.”; CTA “Ver fêmeas no Drive” + ícone de link externo.
  - **Machos:** título “Conheça os machos”; descrição “Veja os gatinhos divulgados para adoção.”; CTA “Ver machos no Drive” + ícone de link externo.
- Ordenação: fêmeas antes de machos; não usar botão toggle como se fosse filtro interno.
- Quando URL válida estiver presente: tornar o card/CTA navegável com `target="_blank"`, `rel="noopener noreferrer"`, texto e aviso para leitores de tela de que abre nova aba.
- Quando URL ausente: mostrar o card sem navegação falsa, com etiqueta discreta “Link em preparação”. Abaixo dos cards, exibir “Enquanto organizamos as pastas, acompanhe os animais pelo Instagram da ONG” e botão real para Instagram. Não renderizar link com `href="#"`.
- Rodapé da seção: “A disponibilidade e as condições de adoção devem ser confirmadas diretamente com a ONG.”
- Sem fotos/nomes de gatos específicos nesta página no MVP.

### 5.5 Como adotar (`#como-adotar`)

- H2: **“Como dar o próximo passo?”**
- Quatro cartões com ícones da Lucide, números e linhas curtas:
  1. “Conheça os gatos” — “Explore as pastas para conhecer os animais divulgados.”
  2. “Converse com a ONG” — “Entre em contato pelos canais oficiais para tirar dúvidas.”
  3. “Receba orientações” — “A instituição explicará os critérios e próximos passos da adoção.”
  4. “Adote com responsabilidade” — “Prepare-se para cuidar do seu novo companheiro.”
- **Não escrever “entrevista obrigatória”, “visita”, “taxa”, “documentos exigidos” ou condições de moradia específicas** enquanto a ONG não confirmar.
- CTA “Falar com a ONG no Instagram” → Instagram principal. Quando chegar canal oficial de WhatsApp, o contato pode ser substituído ou complementado.

### 5.6 Doações (`#ajude` e `#doar`)

- Área visual de destaque, fundo verde bem claro ou bloco com cartão branco interno.
- H2: **“Sua ajuda faz parte dessa história.”**
- Descrição: “Contribua com o trabalho do Orfanato dos Gatos BC por meio da chave Pix informada pela instituição.”
- Identificador: “Chave Pix (e-mail)”.
- Valor **exato** exibido, selecionável e fácil de ler: `orfanatodosgatos@gmail.com`.
- Botão de ação com ícone: “Copiar chave Pix”.
- Sucesso: texto anunciado em região `aria-live="polite"`: “Chave Pix copiada!”; ícone de confirmação opcional; não apresentar “Pagamento realizado”.
- Falha/indisponibilidade de clipboard: “Não foi possível copiar automaticamente. Selecione a chave Pix acima e copie manualmente.” A chave permanece selecionável; nunca ocultá-la atrás de modal.
- Instrução: “No aplicativo do seu banco, escolha Pix, cole a chave e confira os dados do recebedor antes de confirmar a doação.”
- QR Code: não renderizar até ONG fornecer/validar o QR ou payload Pix oficial; **não construir QR genérico apenas com o texto do e-mail, nem simular QR Code**.
- Nenhum valor mínimo, recorrência, comprovante de pagamento ou chave secundária.
- Não usar o e-mail Pix automaticamente como endereço de atendimento por e-mail.
- Design: destaque visual para a chave e botão; responsivo em telas de 320 px, com quebra de linha adequada e sem corte do e-mail.

### 5.7 Bazar solidário (subseção de `#ajude`)

- Bloco visual próprio e simples, separado do cartão Pix.
- H3/H2 conforme hierarquia: **“Conheça também nosso bazar.”**
- Texto sugerido: “Acompanhe as novidades do bazar do Orfanato dos Gatos no Instagram.”
- CTA: “Visitar Instagram do bazar” → `https://www.instagram.com/bazar_orfanatodosgatos`.
- Não criar vitrine, preços, estoque, calendário de funcionamento ou promessas sobre destinação de valores não confirmadas.
- Ícone externo do Instagram e indicação acessível de nova aba.

### 5.8 Acompanhe/Contato (`#contato`)

- Título sugerido: **“Acompanhe de perto cada história.”**
- Texto: “Confira as atualizações e novidades do Orfanato dos Gatos BC em seu perfil oficial.”
- Botão: “Seguir no Instagram” → `https://www.instagram.com/orfanatodosgatosbc/`.
- Texto de região: “Balneário Camboriú – SC”.
- Futuramente, contato telefônico/WhatsApp poderá aparecer apenas quando confirmado; não mostrar placeholder como número de telefone no site público.

### 5.9 Rodapé

- Logo com descrição acessível, nome da ONG e breve frase “Cuidado, acolhimento e novas oportunidades para gatos.”
- Repetir os links âncora principais e links externos de Instagram principal e bazar.
- Localização em nível municipal: “Balneário Camboriú – SC”.
- Rodapé de créditos: opção neutra “Site desenvolvido em projeto de extensão universitária da UNIVALI”, sujeita à aprovação institucional; **não fazer parecer que a UNIVALI é mantenedora formal da ONG**.
- Ano dinâmico no build ou ano de publicação; não inventar CNPJ.
- Não acrescentar banners de cookies ou política de privacidade fictícia; se houver analytics/formulários futuros, reavaliar obrigações antes de publicar.

## 6. Direção de arte e design system

### 6.1 Conceito

Identidade **acolhedora, atual, organizada e confiável**. Verde da marca e coral combinados a superfícies neutras; visual editorial com fotos reais, grandes respiros, ícones discretos e cards suaves. Evitar estética de aplicativo corporativo, excesso de elementos infantis, patinhas em todas as áreas ou animações chamativas.

### 6.2 Origem das cores

A imagem original fornecida é um logo com fundo branco e dois tons marcantes. Tons predominantes aproximados observados na imagem: verde próximo a `#74B7A6`, coral próximo a `#F18B87`. Os tokens abaixo são uma paleta de UI **derivada e ajustada**, não uma alegação de códigos oficiais da marca.

| Token | HEX | Uso |
|---|---|---|
| `brand.green` | `#77B5A4` | Detalhes, ilustrações e superfícies suaves |
| `brand.coral` | `#ED8C89` | Elementos afetivos/decorativos e destaques não textuais |
| `primary` | `#285F53` | Botões principais, links e títulos destacados |
| `primary.hover` | `#204D43` | Hover dos botões principais |
| `accent.dark` | `#A7474B` | Texto/botões coral com contraste suficiente |
| `text.primary` | `#24312D` | Corpo dos textos |
| `text.muted` | `#52645C` | Textos secundários |
| `background` | `#FAF9F6` | Fundo geral da página |
| `surface` | `#FFFFFF` | Header e cartões |
| `surface.green` | `#E9F4EF` | Fundo suave da adoção/Pix |
| `surface.coral` | `#F9ECEA` | Fundo suave de cards/apoio |
| `border` | `#DDE7E1` | Bordas discretas |
| `focus` | `#285F53` | Anel de foco + offset branco |

**Regras de contraste:** texto branco sobre `primary` apresenta contraste estimado ~7,36:1, e sobre `accent.dark` ~5,76:1. **Não usar texto branco sobre `brand.green` (~2,35:1) ou `brand.coral` (~2,41:1)**. Essas cores claras servem a fundos e elementos gráficos. Validar contrastes finais nas composições implementadas com WCAG 2.2 AA.

**Distribuição estética de referência:** cerca de 70% neutros, 20% verdes, 10% coral; é diretriz visual, não regra matemática rígida.

### 6.3 Tipografia

- Títulos: **Plus Jakarta Sans** (`next/font/google`), pesos 600–700.
- Corpo, botões, menus e labels: **Inter** (`next/font/google`), pesos 400–600.
- Fallbacks `system-ui, sans-serif`.
- Fontes servidas localmente pela otimização do Next, não por `<link>` externo em runtime.
- Escala sugerida:
  - `display`: `clamp(2.5rem, 5.2vw, 4.75rem)`, `line-height: 1.08`.
  - `h2`: `clamp(2rem, 3.6vw, 3.25rem)`, `line-height: 1.15`.
  - `h3`: `clamp(1.25rem, 2vw, 1.6rem)`, `line-height: 1.25`.
  - `body`: 1rem–1.125rem, `line-height: 1.65`.
  - `small`: pelo menos 0.875rem quando conteúdo importante.
- H1 único por página; demais títulos em ordem sem pular níveis desnecessariamente.

### 6.4 Layout e espaçamento

- `max-width` do conteúdo: 1200 px; `padding-inline`: 20 px mobile, 32 px tablet, 40 px desktop.
- Espaçamento vertical das seções: 72–104 px desktop, 56–72 px mobile.
- Grade: 12 colunas como base no desktop, empilhamento natural no celular; Hero 6/6 ou 5/7.
- Cards: raio 18–24 px, borda fina e sombra discreta opcional. Não aplicar sombras pesadas.
- Botões: altura mínima 44 px, ideal 48–52 px; raio 12–14 px; `cursor` e estados claros.
- Imagens: cantos 20–28 px; proporções consistentes; object-fit cover; imagem hero priorizada no carregamento.
- Quebra no celular: texto do Pix deve poder quebrar sem overflow (`overflow-wrap: anywhere`).
- Evitar largura fixa desnecessária e elementos sobrepostos ao menu.

### 6.5 Responsividade

| Tamanho de viewport | Esperado |
|---|---|
| 320–374 px | Um único fluxo vertical, texto sem cortes, Pix quebrável e botões largos |
| 375–767 px | Menu mobile, hero empilhado, cards de adoção em coluna |
| 768–1023 px | Ajustes de espaçamento, adoção com uma ou duas colunas conforme legibilidade |
| >=1024 px | Menu horizontal, hero em duas colunas, cards de adoção lado a lado |
| >=1440 px | Conteúdo centralizado em 1200 px, sem linhas excessivamente largas |

Implementar e testar 320, 375, 768, 1024 e 1440 px. Nenhum overflow horizontal. Sem botões próximos demais para uso por toque.

### 6.6 Componentes e estados

- **PrimaryButton:** fundo verde profundo, texto branco, hover mais escuro, `focus-visible`, estado disabled sem parecer link ativo.
- **SecondaryButton:** borda verde profundo, fundo transparente/branco, hover sutil.
- **ExternalLink:** seta `ArrowUpRight` ou `ExternalLink`; abertura em nova aba com `rel` seguro.
- **SectionHeading:** eyebrow opcional, título, descrição com largura de leitura limitada.
- **InfoCard:** ícone + título + descrição, borda discreta.
- **AdoptionCard:** variação disponível/pendente; usar descrição textual e CTA correto.
- **PixCard:** chave visível, cópia acessível, feedback e orientação; só este pequeno componente precisa de interatividade de cliente.
- **MobileNavigation:** abre/fecha via botão; navegação por teclado; desabilitar scroll de fundo somente se indispensável.
- **SectionWrapper:** espaços, âncora e cor de fundo opcionais.

### 6.7 Fotos e marca

- Arquivo anexado no pacote: `assets/logo-original.png` (447×447 px, fundo branco).
- O agente deve incorporar **esse arquivo original** ao projeto em `public/brand/logo-original.png`; não buscar outro logo na internet, não alterar proporções e não gerar uma marca substituta.
- Por ter fundo branco, renderizar preferencialmente em superfície branca. Uma eventual versão transparente deve ser produzida/revisada separadamente e nunca substituir o original sem aprovação.
- Fotografias de terceiros ou imagens aleatórias de gatos **não devem ser apresentadas como animais da ONG**. Enquanto as fotos oficiais não chegam, utilizar blocos gráficos abstratos, elementos simples baseados na casinha/gato do logo ou placeholders neutros com texto claro.
- Alt da marca: “Orfanato dos Gatos BC”. Alt de fotos reais: descrever objetivamente o conteúdo, após receber o material.

### 6.8 Movimento e microinterações

- Transições CSS de 150–250 ms para hover e foco.
- Movimentações discretas: elevação de 2–4 px dos cards, mudança leve de sombra e borda, sem zoom exagerado.
- Scroll suave apenas quando `prefers-reduced-motion` permitir.
- Se houver animação de entrada, aplicar com moderação e não ocultar conteúdo para usuários sem JavaScript.
- Não usar carrossel automático nem partículas.

## 7. Arquitetura técnica

### 7.1 Stack obrigatória

- **Next.js** com **App Router**.
- **React** e **TypeScript**.
- **Tailwind CSS**, versão estável compatível com a versão instalada do Next.
- **Lucide React** para ícones.
- `next/font/google` para Plus Jakarta Sans e Inter.
- **Exportação estática** (`output: 'export'`).
- Hospedagem compatível com assets estáticos; preferência operacional a definir entre Vercel e Cloudflare Pages.

> Não forçar versões fictícias ou incompatíveis. No bootstrap, selecionar versões estáveis atuais, travar no lockfile e documentar versões usadas no README. Não instalar biblioteca só para scroll, clipboard, estado simples de menu ou animações básicas.

### 7.2 Decisões arquiteturais

**ADR-01 — Estático:** não haverá backend. O build produzirá HTML, CSS, JavaScript e imagens em `out/`.

**ADR-02 — Drive como catálogo:** o site **não consulta nem indexa** o Drive; apenas aponta para pastas específicas com links configurados. Atualizações internas das pastas não exigem rebuild do site. **Trocar o URL da pasta** ainda exige alteração de configuração e novo deploy.

**ADR-03 — Pix informativo:** o site oferece cópia da chave, sem operação de pagamento ou captura de comprovantes.

**ADR-04 — Social por hyperlinks:** Instagram principal e bazar serão links externos simples, sem SDK/API, embed de feed ou rastreamento.

**ADR-05 — Conteúdo versionado:** textos e links mantidos em arquivos locais de configuração/conteúdo no Git, sem CMS.

**ADR-06 — Interatividade mínima:** priorizar Server Components estáticos; componentes Client somente para menu mobile e botão Pix.

**ADR-07 — Imagens e static export:** `next/image` pode ser usado para imagens locais com `images: { unoptimized: true }` em `next.config.ts`, pois o otimizador padrão depende de servidor e não está disponível em static export. Otimizar manualmente os arquivos WebP/AVIF em tamanhos adequados antes de adicionar ao repositório. Não buscar assets em runtime.

### 7.3 Estrutura de diretórios sugerida

```text
orfanato-dos-gatos-bc/
├── public/
│   ├── brand/
│   │   └── logo-original.png
│   ├── images/
│   │   └── (fotos autorizadas quando recebidas)
│   ├── favicon.ico ou icon.png
│   └── og-cover.png (quando aprovado)
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx (opcional)
│   │   └── robots.ts (se compatível com o build estático)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── MobileNavigation.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── AdoptionSection.tsx
│   │   │   ├── AdoptionStepsSection.tsx
│   │   │   ├── DonateSection.tsx
│   │   │   ├── BazaarSection.tsx
│   │   │   └── ContactSection.tsx
│   │   └── ui/
│   │       ├── ButtonLink.tsx
│   │       ├── SectionHeading.tsx
│   │       ├── AdoptionCard.tsx
│   │       └── PixCopyButton.tsx
│   ├── config/
│   │   └── site.ts
│   └── lib/
│       └── external-links.ts (se útil)
├── tests/
│   └── (testes essenciais)
├── next.config.ts
├── package.json
├── README.md
└── (configs padrão TypeScript/Tailwind/lint)
```

**Não criar diretórios ou camadas sem necessidade.** Os nomes acima são sugestão de organização, não obrigação de reproduzi-los literalmente.

### 7.4 Configuração centralizada — contrato proposto

```ts
// src/config/site.ts
export interface SiteConfig {
  name: string;
  shortName: string;
  location: string;
  pix: {
    keyType: 'email';
    key: string;
    beneficiaryName: string | null;
    qrCodeAsset: string | null;
  };
  socials: {
    instagram: string;
    bazaarInstagram: string;
  };
  adoption: {
    femaleDriveUrl: string | null;
    maleDriveUrl: string | null;
  };
  contact: {
    whatsappNumber: string | null;
    email: string | null;
  };
  domain: string | null;
}

export const siteConfig: SiteConfig = {
  name: 'Orfanato dos Gatos BC',
  shortName: 'Orfanato dos Gatos',
  location: 'Balneário Camboriú – SC',
  pix: {
    keyType: 'email',
    key: 'orfanatodosgatos@gmail.com',
    beneficiaryName: null,
    qrCodeAsset: null,
  },
  socials: {
    instagram: 'https://www.instagram.com/orfanatodosgatosbc/',
    bazaarInstagram: 'https://www.instagram.com/bazar_orfanatodosgatos',
  },
  adoption: {
    femaleDriveUrl: null,
    maleDriveUrl: null,
  },
  contact: {
    whatsappNumber: null,
    email: null,
  },
  domain: null,
};
```

**Regras do contrato:**

- Todas as seções leem suas URLs e chave Pix da configuração, sem duplicar strings espalhadas no JSX.
- `null` significa **não confirmado**: não renderizar endereço/contato inventado.
- Se a pasta tiver URL inválida ou não pertencer a `drive.google.com`, tratar como indisponível na interface e registrar aviso de desenvolvimento sem expor stack trace ao usuário. Aceitar URLs oficiais de compartilhamento do Google Drive (`https://drive.google.com/drive/folders/...` e variações válidas), com validação de protocolo HTTPS e host por URL parser.
- Strings fornecidas como dados devem ser renderizadas como texto React, nunca como HTML arbitrário.
- Não há segredo: chave Pix e Instagram são deliberadamente públicos; não colocar segredos bancários, tokens do Drive ou credenciais em arquivos/client bundle.

### 7.5 Configuração do build

```ts
// next.config.ts — adaptar à versão instalada
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
```

- Comando de desenvolvimento: `npm run dev`.
- Build: `npm run build`; verificar diretório `out/`.
- Static export não é compatível com Server Actions, APIs dinâmicas e outras funcionalidades que dependam de servidor. Não adicioná-las.
- A hospedagem precisa servir corretamente os arquivos estáticos produzidos; configurar domínio só quando disponibilizado pela ONG.

## 8. Google Drive — manutenção dos gatos

### 8.1 Estrutura recomendada

```text
Gatos disponíveis para adoção/
├── Fêmeas/
│   ├── Nome da gata 01/
│   │   ├── foto-01.jpg
│   │   └── informacoes.pdf  (opcional, sem dados privados)
│   └── ...
└── Machos/
    ├── Nome do gato 01/
    │   ├── foto-01.jpg
    │   └── informacoes.pdf  (opcional, sem dados privados)
    └── ...
```

Subpastas e fichas são **sugestão operacional**, não exigência do site. A ONG pode escolher a estrutura que melhor conseguir manter.

### 8.2 Permissões

- Criar as duas pastas sob uma conta controlada pela instituição, de preferência não pessoal de aluno.
- Em cada pasta destinada ao público: `Acesso geral → Qualquer pessoa com o link → Leitor`.
- Testar URL em janela anônima, sem autenticação Google.
- Não usar permissões de editor ou permitir que visitantes alterem pastas.
- Não inserir documentos privados, dados de adotantes, prontuários completos nem informações pessoais de colaboradores.
- Lembrar que a identidade/e-mail do proprietário pode ficar visível no compartilhamento em determinadas interfaces/configurações do Drive; usar uma conta apropriada da instituição.
- Confirmar que cada botão abre a pasta do sexo correto.

### 8.3 Regras de atualização

- Inclusão/remoção/organização de gatos: realizada pela ONG dentro das pastas; **não exige alteração do site**.
- Mudança do link da pasta: alterar `src/config/site.ts`, executar build e publicar nova versão.
- Disponibilidade atualizada: responsabilidade da ONG; o site deve exibir nota informando necessidade de confirmação.
- Não usar “tempo real”, “atualizado automaticamente” ou “todos disponíveis” sem fonte e processo que sustentem essas afirmações.

## 9. Pix — comportamento completo

### 9.1 Casos principais

| Caso | Ação | Resultado esperado |
|---|---|---|
| P-01 | Carregar seção de doação | Exibe chave `orfanatodosgatos@gmail.com` sem abreviação |
| P-02 | Clicar “Copiar chave Pix” em contexto seguro | Copia **exatamente** a chave, sem espaços extras; informa sucesso |
| P-03 | Clipboard API indisponível/negada | Não trava; informa falha e permite selecionar/copiar a chave |
| P-04 | Clicar várias vezes | Repetível, sem alterar a chave |
| P-05 | Navegação por teclado | Botão focável, Enter/Espaço operam e feedback é anunciado |
| P-06 | Usuário faz doação fora do site | Site não afirma pagamento concluído |

### 9.2 Implementação indicada

- `navigator.clipboard.writeText(siteConfig.pix.key)` executado **somente em evento de clique** num Client Component.
- `try/catch` com estado de feedback e `role="status"` / `aria-live="polite"`.
- Se necessário, oferecer seleção manual da chave (`input readOnly` com conteúdo visível ou texto selecionável).
- Não pedir valor doado e não capturar informações bancárias.
- Ao adicionar QR Code futuro, usar somente recurso oficial autorizado pela ONG e verificar correspondência da chave/dados do recebedor.

## 10. Segurança, LGPD e acessibilidade

### 10.1 Privacidade

- O MVP não coleta dados pessoais, não registra formulários e não mantém contas.
- **Não adicionar Google Analytics, Meta Pixel, SDK do Instagram, cookies de rastreamento ou scripts terceiros** sem decisão posterior e revisão de privacidade.
- Links para serviços de terceiros devem ser claramente identificados; ao acessar Drive/Instagram, visitantes passam a usar as políticas dessas plataformas.
- Caso sejam acrescentados cookies não essenciais ou tratamento de dados, elaborar políticas e consentimento conforme necessário antes de disponibilizar.
- Não incluir e-mail Pix como contato institucional sem autorização.

### 10.2 Segurança

- Todos os links externos em HTTPS e, quando nova aba, `target="_blank" rel="noopener noreferrer"`.
- URLs do Drive validadas como domínio oficial; não montar URLs a partir de entradas do visitante.
- Sem armazenamento de credenciais, tokens ou informações sensíveis.
- Não usar `dangerouslySetInnerHTML` com conteúdo editável/desconhecido.
- Dependências revisadas, lockfile versionado, nenhuma API de pagamento.
- No rodapé ou texto Pix, orientar a conferência dos dados do destinatário dentro do aplicativo bancário.

### 10.3 Acessibilidade (meta: WCAG 2.2 AA)

- Semântica: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`; um H1.
- Link “Pular para conteúdo” acessível por teclado.
- Botões são `<button>`; links são `<a>`; não usar `<div onClick>`.
- Estados de foco visíveis (ao menos 2 px com offset).
- Ícones decorativos com `aria-hidden`; ações apenas com ícones exigem `aria-label`.
- Feedback do Pix em live region.
- Menu mobile com rótulo, controle de estado e fechamento acessível.
- Contraste mínimo 4.5:1 para texto normal, 3:1 para texto grande e componentes essenciais.
- Textos ajustáveis com zoom 200%, sem cortes; alvos de toque confortáveis.
- Respeitar `prefers-reduced-motion`.
- Imagens com alt contextual; imagens decorativas podem ter `alt=""`.

## 11. SEO, performance e metadados

### 11.1 SEO

- `lang="pt-BR"` no elemento HTML.
- Título sugerido: `Orfanato dos Gatos BC | Adoção, cuidado e solidariedade`.
- Meta description sugerida: `Conheça o Orfanato dos Gatos BC, veja como encontrar gatos para adoção em Balneário Camboriú e saiba como apoiar a ONG com doações via Pix.`
- URL canônica **somente após definição de domínio real**; nunca usar domínio fictício em `canonical` ou `metadataBase`.
- Open Graph e Twitter card com título/descrição; imagem local somente depois de validada/criada pela equipe usando marca autorizada.
- Favicon próprio derivado/recortado **sem distorcer o logo**.
- `robots.txt` e sitemap estáticos coerentes com a hospedagem e domínio publicado. Não cadastrar rotas inexistentes.
- Evitar exagero de palavras-chave e conteúdo enganoso.

### 11.2 Performance

- Priorizar imagens locais, compactadas e com dimensões definidas.
- Preferir WebP/AVIF adequados, manter o logo original como recurso e oferecer variações otimizadas somente se aprovadas.
- Reservar espaço para imagens para evitar layout shift.
- Não introduzir dependências só para efeitos visuais ou botões simples.
- Orçamento recomendado em condições de teste de campo simulado: Lighthouse mobile com performance >=90, acessibilidade >=95, SEO >=90, reconhecendo variação por ambiente/execução.
- Metas Core Web Vitals de referência: LCP <=2,5 s, CLS <=0,1, INP <=200 ms em percentil de campo, quando dados reais existirem. Não alegar que foram atingidas sem medições.

## 12. Testes e critérios de aceite

### 12.1 Critérios de aceite por funcionalidade (Given/When/Then)

**CA-01 — Navegação.** Dado que a página carregou, quando o visitante clica em item de menu, então a seção correta fica visível sem ser coberta pelo header.

**CA-02 — Mobile.** Dado viewport 375 px, quando abre e seleciona item do menu, então o painel fecha e navega; Escape fecha o menu sem perder foco de forma confusa.

**CA-03 — Adoção feminina.** Dado link válido de Drive configurado, quando clicar no card “Fêmeas”, então abre em nova aba a pasta feminina em modo leitor, sem pedir login.

**CA-04 — Adoção masculina.** Dado link válido de Drive configurado, quando clicar no card “Machos”, então abre em nova aba a pasta masculina em modo leitor, sem pedir login.

**CA-05 — Sem URLs de Drive.** Dado URL nula, quando carregar adoção, então mostra indicação transparente de pendência, não há link quebrado/`#` falso, e o botão alternativo aponta para Instagram principal.

**CA-06 — Pix copiar.** Dado navegador com clipboard permitido, quando clicar “Copiar chave Pix”, então clipboard contém `orfanatodosgatos@gmail.com` e interface confirma cópia, sem alegar pagamento.

**CA-07 — Pix falha.** Dado clipboard negado, quando copiar, então aparece orientação de cópia manual sem erro fatal.

**CA-08 — Instagram oficial.** Quando clicar em CTA social, então o link é `https://www.instagram.com/orfanatodosgatosbc/`.

**CA-09 — Bazar.** Quando clicar no CTA de bazar, então o link é `https://www.instagram.com/bazar_orfanatodosgatos`.

**CA-10 — Responsividade.** Ao testar 320/375/768/1024/1440 px, então não existe rolagem horizontal, sobreposição indevida ou chave Pix truncada.

**CA-11 — Sem invenção.** Dado campos pendentes, então não aparecem fotos fictícias apresentadas como da ONG, WhatsApp, endereço, CNPJ, nomes, números ou regras inventados.

**CA-12 — Exportação estática.** Ao executar `npm run build`, a compilação finaliza com sucesso e gera `out/`; o site roda servido como arquivos estáticos.

**CA-13 — Acessibilidade.** A página pode ser percorrida por teclado, controles possuem nome acessível, contrastes são verificados e Pix anuncia feedback.

**CA-14 — Links e segurança.** Links externos usam HTTPS e atributos seguros; não existem segredos no bundle.

**CA-15 — SEO.** `title`, `description`, pt-BR, metadados de compartilhamento válidos e favicon presente.

### 12.2 Plano de testes

- **Automatizados mínimos:** validação de configuração/URLs, cópia Pix (sucesso e falha), estados dos links de adoção e hrefs de Instagram.
- **E2E (Playwright se adotado):** teste de fluxo de menu, clique nas âncoras, modal/menu mobile, CTAs e viewport pequeno. Não exigir teste E2E de conclusão de doação bancária.
- **Manuais:** Chrome, Firefox, Safari/iOS (quando disponível), teclado, zoom 200%, Lighthouse e verificação de permissões Drive por janela anônima.
- **Revisão editorial:** responsável da ONG valida história, regras, fotografias, chave Pix e contato antes da publicação.

## 13. Plano de implementação para o agente

**Ordem de execução recomendada:**

1. Criar projeto Next.js App Router + TS + Tailwind, com ESLint; configurar `output: 'export'` e `images.unoptimized`.
2. Importar `assets/logo-original.png` no repositório e configurar design tokens, fontes, reset, largura e responsividade.
3. Criar configuração central `site.ts` com valores conhecidos e `null` nos pendentes.
4. Criar componentes de layout/header, navegação mobile e footer, com semântica e âncoras.
5. Implementar Hero, Sobre, Adoção, Como adotar, Pix, Bazar e Instagram/Contato com conteúdo prudente e hierarquia visual profissional.
6. Implementar cópia Pix robusta, estados de Drive configurado/pendente e links externos seguros.
7. Ajustar mobile-first, foco, contraste, movimento reduzido e placeholders de mídia honestos.
8. Completar SEO, favicon, eventual 404 e README de manutenção.
9. Executar lint, typecheck, testes, build e revisão visual nos cinco tamanhos.
10. Entregar código, evidências do build e checklist de itens pendentes para publicação.

### 13.1 Entregáveis obrigatórios do agente

- Repositório ou pasta com código-fonte completo e executável.
- `README.md` com instalação, comandos, arquitetura, deploy e atualização dos links/chave Pix/fotos.
- Site inicial visualmente acabado, sem imagens aleatórias atribuídas à ONG.
- Arquivo de configuração com valores confirmados e campos nulos preparados.
- Build estático gerado com sucesso.
- Testes essenciais (ou explicação explícita de limitações) e lista do que está pendente da ONG.
- Nenhuma funcionalidade extra não solicitada que adicione manutenção recorrente.

### 13.2 Definição de pronto (MVP de engenharia)

Uma pessoa consegue clonar o projeto, executar `npm install` e `npm run dev`, navegar entre todas as seções, copiar a chave Pix, abrir ambos os Instagrams, visualizar estados honestos das pastas ainda não configuradas, abrir as pastas após preencher URLs válidas, executar build estático sem erros e publicar os arquivos gerados em hospedagem estática.

**Definição de pronto para publicação institucional:** além do item anterior, a ONG aprova os textos, fotografias e dados públicos, os links de Drive passam no teste anônimo, o recebimento Pix é revisado e o deploy é feito em domínio/URL definitiva.

## 14. Cronograma do projeto acadêmico (referência)

O planejamento entregue pela equipe prevê:

| Etapa | Período previsto |
|---|---|
| Validação do protótipo | 08/10–10/10/2026 |
| Preparação para desenvolvimento | 11/10–15/10/2026 |
| Desenvolvimento | 16/10–25/10/2026 |
| Inserção de conteúdo | 21/10–27/10/2026 |
| Testes | 28/10–02/11/2026 |
| Validação final com ONG | 03/11–05/11/2026 |
| Ajustes finais | 06/11–11/11/2026 |
| Publicação | 12/11–14/11/2026 |
| Entrega à instituição | 15/11–17/11/2026 |

Essas são **datas planejadas**, não comprovação de execução. O SDD mantém o escopo enxuto para caber na janela de desenvolvimento.

## 15. Riscos e mitigação

| Risco | Consequência | Mitigação |
|---|---|---|
| ONG ainda sem pastas Drive | Principal fluxo incompleto | Configuração `null` + UI honesta; obter URLs com antecedência; teste anônimo |
| Drive com permissão restrita | Adotante não visualiza gatos | Testar sem login e ajustar para “Qualquer pessoa com o link → Leitor” |
| Fotos e textos não disponíveis | Site pouco autêntico | Placeholders neutros apenas durante desenvolvimento; checklist editorial |
| Pix incorreto/desatualizado | Pagamento ao destinatário errado | Confirmar chave, nome de recebedor e, se houver, QR oficial antes do deploy |
| Código complexo para prazo curto | Atraso/manutenção | Sem banco, API, CMS, autenticação ou integrações dinâmicas |
| Site desatualizado após entrega | Informação ruim para adotantes | Manual simples, pasta Drive mantida pela ONG e nota de confirmação |
| Falta de proprietário de hospedagem | Site sair do ar após semestre | Hospedar sob conta institucional definida pela ONG, com acesso de continuidade |
| Dados privados publicados no Drive | Exposição indevida | Revisão humana dos arquivos e permissões antes de compartilhar |

## 16. Operação e entrega para a ONG

### 16.1 Manual mínimo

1. Como adicionar, atualizar e remover fotos dos gatos em cada pasta.
2. Como confirmar se as pastas continuam acessíveis no modo anônimo.
3. Como solicitar correção de conteúdo do site e quem mantém o repositório.
4. Como conferir a chave Pix publicada e atualizar a configuração quando necessário.
5. Onde encontrar os dois perfis sociais e como comunicar alterações futuras.
6. Quem será dono da conta da hospedagem, DNS e repositório ao fim da disciplina.

### 16.2 Observação de manutenção

Sem painel de administração, a ONG atualiza sozinha **os gatos nas pastas**, mas **não necessariamente os textos e links do site**. Para estes, deverá existir um responsável técnico ou roteiro de alteração e redeploy. Esse trade-off deve ser comunicado sem prometer autonomia total que o produto não possui.

## 17. Referências e materiais-base

### Materiais do próprio projeto

- **Planejamento do Projeto Comunitário de Extensão Universitária** — documento fornecido pelo solicitante, sete páginas, UNIVALI, 2026. Fundamenta entidade, justificativa, objetivos, público e cronograma.
- **Logo original da ONG** — imagem enviada pelo solicitante, incluída no pacote em `assets/logo-original.png`.
- **Dados confirmados pelo solicitante** — chave Pix e links dos dois perfis do Instagram, conforme seção 2.

### Documentação técnica externa (para consulta do agente)

- Next.js — Static Exports: https://nextjs.org/docs/app/guides/static-exports
- Next.js — `next/font`: https://nextjs.org/docs/app/api-reference/components/font
- Google Drive — compartilhamento de pastas e arquivos: https://support.google.com/drive/answer/2494822?hl=pt-BR
- WCAG 2.2: https://www.w3.org/TR/WCAG22/