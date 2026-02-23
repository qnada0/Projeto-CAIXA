# Estrutura de Arquivos - Caixa Perto MVP

## Raiz

- `.env` - Variáveis de ambiente para configuração da aplicação
- `.gitignore` - Arquivos ignorados pelo Git
- `eslint.config.js` - Configuração do ESLint para linting
- `package.json` - Dependências e scripts do projeto
- `package-lock.json` - Lock file das dependências
- `tsconfig.json` - Configuração do TypeScript
- `tsconfig.app.json` - Configuração TS para aplicação
- `tsconfig.node.json` - Configuração TS para Node
- `vite.config.ts` - Configuração do Vite
- `tailwind.config.js` - Configuração do Tailwind CSS
- `postcss.config.js` - Configuração do PostCSS
- `index.html` - Arquivo HTML raiz
- `README.md` - Documentação principal do projeto

## src/

Diretório principal da aplicação

### src/App.tsx

Router principal com todas as 12 rotas da aplicação e configuração do BrowserRouter

### src/main.tsx

Ponto de entrada da aplicação React, renderiza App em #root

### src/index.css

Estilos globais e customizações do Tailwind CSS

### src/vite-env.d.ts

Tipos TypeScript para Vite e variáveis de ambiente

## src/pages/

12 páginas da aplicação

- `Popup.tsx` - Tela inicial de boas-vindas (/popup)
- `Trail.tsx` - Visualização da trilha educativa (/trail)
- `Step1.tsx` - Primeira etapa com vídeo (/step-1)
- `Mission1.tsx` - Primeira missão com quiz (/mission-1)
- `Points1.tsx` - Comemoração +20 pontos etapa 1 (/points-1)
- `Step2.tsx` - Segunda etapa com vídeo (/step-2)
- `Mission2.tsx` - Segunda missão com quiz (/mission-2)
- `Points2.tsx` - Comemoração +20 pontos etapa 2 (/points-2)
- `Rewards.tsx` - Lista de recompensas disponíveis (/rewards)
- `RewardDetail.tsx` - Detalhes e resgate de uma recompensa (/reward/:id)
- `RedeemSuccess.tsx` - Confirmação de resgate bem-sucedido (/redeem-success)
- `Profile.tsx` - Perfil do usuário com pontos, nível e recompensas (/profile)

## src/components/

Componentes reutilizáveis organizados por tipo

### src/components/ui/

Componentes base de UI pequenos e reutilizáveis

- `Button.tsx` - Botão com variantes (primary, secondary, ghost) e propriedades de estilo
- `TopBar.tsx` - Barra superior com título e botão voltar
- `InputField.tsx` - Campo de input com label e estilos padronizados
- `InlineAlert.tsx` - Alerta inline com tipos (error, success, warning, offline)
- `Progress.tsx` - Barra de progresso visual

### src/components/blocks/

Componentes compostos que usam componentes UI

- `TrailCard.tsx` - Card exibindo trilha com progresso
- `RewardCard.tsx` - Card de recompensa com ícone, título e pontos
- `PointsBanner.tsx` - Banner destacado mostrando pontos acumulados
- `ScoreWidget.tsx` - Widget de pontuação com nível e progresso para próximo nível

### src/components/

- `DevPanel.tsx` - Painel flutuante de desenvolvimento com toggles para offline/redeemFail/videoFail

## src/state/

Gerenciamento de estado e persistência

- `store.ts` - Gerenciador de estado global com localStorage, funções para pontos, etapas completadas, recompensas resgatadas e flags de desenvolvimento

## src/data/

Dados mockados da aplicação

- `rewards.ts` - Lista de 3 recompensas com ID, título, descrição, pontos e ícone

## src/.bolt/

Configuração interna do Bolt

- `config.json` - Arquivo de configuração do Bolt
- `prompt` - Prompt de contexto do projeto

---

## Resumo da Arquitetura

**Total de arquivos: 40+**

- **Pages**: 12 rotas conforme especificação
- **UI Components**: 5 componentes base reutilizáveis
- **Block Components**: 4 componentes compostos
- **State**: 1 arquivo centralizando localStorage
- **Data**: 1 arquivo com dados mockados
- **Helpers**: Dev Panel para testing

Todos os arquivos seguem padrão de nomeação PascalCase (componentes) e estão bem organizados por responsabilidade.
