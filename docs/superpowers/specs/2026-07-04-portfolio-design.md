# Portfólio pessoal — João Augusto Cantel

Data: 2026-07-04

## Objetivo

Criar o site de portfólio pessoal do João, web designer/desenvolvedor, para apresentar seu perfil profissional, especialidades, processo de trabalho e projetos (placeholder por enquanto). Site estático, sem backend, sem coleta de dados.

## Decisões

| Decisão | Escolha |
|---|---|
| Modo/stack | Modo Moderno (HTML/CSS/JS + GSAP, ScrollTrigger, Lenis, Splitting.js via CDN, sem build tools) |
| Estrutura de páginas | One-page com navegação por âncoras |
| Projetos | Placeholders (3–4 cards de exemplo, marcados para substituição futura) |
| Contato | Sem formulário. Apenas links diretos (e-mail, WhatsApp, GitHub, LinkedIn) |
| Analytics / LGPD | Nenhum. Sem cookies, sem rastreamento, sem banner, sem página de privacidade |
| Identidade visual | Provisória — paleta escura neutra + 1 accent, tipografia técnica, tudo em variáveis CSS para facilitar troca futura |
| Arquitetura de conteúdo | 100% estático em HTML semântico (sem arrays JS renderizando conteúdo), priorizando SEO e simplicidade de edição manual |

## Estrutura de arquivos

```
portifolio/
├── index.html
├── /assets
│   ├── /css/style.css
│   ├── /js/script.js
│   ├── /img          (placeholders de projeto, foto/avatar se houver)
│   └── /icons        (favicon em vários tamanhos, ícones sociais SVG)
├── robots.txt
└── sitemap.xml
```

Sem `/api` (não há formulário) e sem `privacidade.html` (sem coleta de dados).

## Seções da página (ordem no scroll)

1. **Header/Nav** — fixo, nome "João Augusto Cantel", links âncora para Sobre / Especialidades / Processo / Projetos / Contato, menu hambúrguer no mobile.

2. **Hero**
   - Título: "Sites profissionais desenvolvidos com design, código e inteligência artificial"
   - Subtítulo: "Desenvolvo sites institucionais e landing pages modernas, responsivas e alinhadas aos objetivos de empresas e prestadores de serviços."
   - Botões: "Conheça meus projetos" (âncora para #projetos) e "Solicite um orçamento" (âncora para #contato)
   - Efeito: texto do título com reveal letra-a-letra (Splitting.js) + fade/slide no subtítulo e botões

3. **Sobre mim** (`#sobre`)
   - Título de seção: "Sobre mim"
   - Corpo: texto da "Bio principal" do perfil (3 parágrafos completos)

4. **Especialidades** (`#especialidades`)
   - Grid de cards, um por item da lista "Especialidades" do perfil (14 itens): Criação de sites institucionais, Desenvolvimento de landing pages, Desenvolvimento com WordPress e Elementor, Desenvolvimento front-end com HTML/CSS/JS, Criação de layouts responsivos, Reformulação e modernização de sites, Estruturação de páginas e conteúdo, Integração com WhatsApp, Configuração de formulários, Publicação e configuração de sites em hospedagens, Configuração de domínio e DNS, SEO básico/on-page/local, Produção de imagens e elementos visuais com IA, Desenvolvimento assistido por Claude Code e Codex.
   - Cada card: ícone (placeholder simples, ex. inicial ou ícone genérico SVG) + texto da especialidade.

5. **Tecnologias e ferramentas** (`#ferramentas`)
   - 4 blocos/colunas com tags, usando exatamente as listas do perfil:
     - **Desenvolvimento**: WordPress, Elementor, HTML, CSS, JavaScript, Java, Git, GitHub, VS Code, Antigravity
     - **Inteligência artificial**: Claude Code, OpenAI Codex, criação e refinamento de prompts, análise e geração de código, estruturação de projetos, identificação e correção de problemas, produção de imagens com IA, criação de banners e ativos visuais
     - **Publicação e infraestrutura**: hospedagem de sites, configuração de domínio, DNS, publicação em public_html, migração de sites, formulários, SMTP e serviços de e-mail, TurboCloud, Locaweb
     - **Conteúdo e otimização**: estruturação de títulos H1/H2/H3, organização de páginas de serviços, criação de CTAs, textos alternativos para imagens, SEO local, integração com WhatsApp, Yoast SEO, organização de conteúdo para negócios locais

6. **Diferencial profissional** (`#diferencial`)
   - Bloco de destaque (ex: citação/blockquote estilizado) com a frase de posicionamento: "Uno design, desenvolvimento e inteligência artificial para criar sites profissionais, responsivos e alinhados aos objetivos de cada negócio."
   - Abaixo, o texto completo da seção "Diferencial profissional" do perfil (parágrafos + lista de etapas: levantamento de informações, planejamento da estrutura, organização do conteúdo, desenvolvimento, responsividade, testes, formulários, hospedagem, domínio, publicação, manutenção).

7. **Processo de desenvolvimento** (`#processo`)
   - Timeline vertical (ou horizontal em desktop) com 6 etapas numeradas, animando em sequência com ScrollTrigger:
     1. Compreensão do negócio
     2. Planejamento
     3. Conteúdo
     4. Desenvolvimento
     5. Responsividade e revisão
     6. Publicação
   - Cada etapa com título + descrição curta (extraídos da seção "Processo de desenvolvimento" do perfil).

8. **Segmentos de experiência** (`#segmentos`)
   - Nuvem/grid de tags com os segmentos do perfil: oficinas e auto centers, serviços automotivos, clínicas veterinárias, residenciais para idosos, empresas de cuidado continuado, marmorarias, empresas de mármores e granitos, empresas de toldos e coberturas, corte e dobra de metais, empresas industriais, prestadores de serviços, negócios locais, agências de marketing.

9. **Projetos** (`#projetos`)
   - Grid com 3–4 cards placeholder: imagem placeholder (retângulo com ícone ou cor sólida), nome fictício do projeto (ex: "Projeto Exemplo 1"), tags de tecnologia genéricas, comentário HTML `<!-- TODO: substituir por projeto real -->` acima de cada card.

10. **Formação** (`#formacao`)
    - Texto: "Programador Full Stack em Java" + lista de tecnologias da seção "Formação e base técnica" do perfil (lógica de programação, Java, front-end, back-end, HTML, CSS, JavaScript, TypeScript, Angular, Ionic, Node.js, bancos de dados, APIs, Git e GitHub), como tags ou lista simples.

11. **Contato** (`#contato`)
    - Título convidando a entrar em contato
    - Botões/links diretos:
      - E-mail: `joao@indexa.co` (`mailto:`)
      - WhatsApp: placeholder `href="#"` com comentário `<!-- TODO: adicionar link do WhatsApp -->`
      - GitHub: placeholder `href="#"` com comentário `<!-- TODO: adicionar link do GitHub -->`
      - LinkedIn: placeholder `href="#"` com comentário `<!-- TODO: adicionar link do LinkedIn -->`

12. **Footer**
    - Texto da "Bio curta" do perfil
    - Repetição dos links de contato (ícones)
    - Copyright com ano dinâmico (JS) — "© 2026 João Augusto Cantel"

## Sistema visual provisório

Tudo declarado em `:root` no `style.css`, nomeado semanticamente para facilitar troca futura de identidade:

```css
:root {
  --color-bg: #0d0f12;
  --color-bg-alt: #15181c;
  --color-text: #f2f3f5;
  --color-text-muted: #a3a9b3;
  --color-accent: #3d8bfd;
  --color-border: #24282e;

  --font-heading: 'Space Grotesk', sans-serif; /* trocável */
  --font-body: 'Inter', sans-serif; /* trocável */

  --radius: 8px;
  --spacing-section: clamp(4rem, 8vw, 8rem);
}
```

Fontes carregadas via Google Fonts (placeholder, fácil de trocar depois). Nenhum valor de cor/fonte é hardcoded fora dessas variáveis.

## Animações (bibliotecas via CDN)

- **Lenis**: smooth scroll na página toda
- **GSAP + ScrollTrigger**: fade/slide reveal ao entrar na viewport para cada seção; animação sequencial dos itens da timeline de processo
- **Splitting.js**: efeito letra-a-letra no `<h1>` do hero
- Hover sutil (transform/opacity) em cards e botões — sem magnetic buttons
- Todas as animações respeitam `prefers-reduced-motion: reduce` (desativa ou reduz movimento)

## SEO

- Meta tags completas (title, description, viewport, charset)
- Open Graph (og:title, og:description, og:image, og:type=website)
- Schema.org `Person` (não `LocalBusiness`, por ser portfólio pessoal) com nome, jobTitle, url, sameAs (links sociais quando preenchidos)
- Um único `<h1>` na página (o título do hero)
- Hierarquia de headings consistente (`h2` por seção, `h3` para itens internos quando aplicável)
- `alt` text em todas as imagens (incluindo placeholders de projeto)
- `robots.txt` e `sitemap.xml` na raiz

## Testes

- Live Server local (já em uso pelo usuário)
- Responsividade testada em 320px, 768px, 1024px, 1440px
- Testar em Chrome, Firefox, Edge
- Lighthouse ≥ 85 em Performance (meta do Modo Moderno, por causa das animações)
- Validar que animações não travam em mobile
- Testar com `prefers-reduced-motion` ativado

## Fora de escopo (explicitamente adiado)

- Identidade visual final (cores/fontes definitivas) — usuário decidirá depois, bastando editar as variáveis CSS
- Projetos reais no portfólio — serão adicionados depois pelo usuário
- Links reais de WhatsApp/GitHub/LinkedIn — usuário fornecerá depois
- Formulário de contato, backend PHP, SMTP
- Analytics, cookies, política de privacidade
- Deploy/publicação em hospedagem (fluxo manual via cPanel já documentado no processo padrão, será feito quando o site estiver pronto)
