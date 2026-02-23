# Caixa Perto - MVP

MVP web app de gamificação educacional para beneficiários Caixa.

## Características

- 12 rotas completas com navegação fluida
- Sistema de pontuação e recompensas
- Persistência de dados em localStorage
- UI mobile-first responsiva
- Dev Panel para simular cenários de erro
- Componentes reutilizáveis

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React (ícones)

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
# URL base da API de conteúdo (opcional)
VITE_CONTENT_API_BASE_URL=https://api.exemplo.com
```

**Nota:** Se `VITE_CONTENT_API_BASE_URL` não estiver definida, o app funcionará no modo offline com fallback.

## Como rodar

### 1. Instalar dependências

```bash
npm install
```

### 2. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

O app estará disponível em `http://localhost:5173` e iniciará na rota `/popup`.

### 3. Build para produção

```bash
npm run build
```

### 4. Preview do build

```bash
npm run preview
```

## Estrutura do projeto

```
src/
├── components/
│   ├── ui/           # Componentes base (Button, TopBar, etc)
│   ├── blocks/       # Componentes compostos (TrailCard, RewardCard, etc)
│   └── DevPanel.tsx  # Painel de desenvolvimento
├── pages/            # 12 páginas da aplicação
├── state/            # Gerenciamento de estado (localStorage)
├── data/             # Dados mockados
└── App.tsx           # Router principal
```

## Rotas

1. `/popup` - Tela inicial de boas-vindas
2. `/trail` - Visualização da trilha educativa
3. `/step-1` - Primeira etapa (vídeo)
4. `/mission-1` - Primeira missão (quiz)
5. `/points-1` - Comemoração +20 pontos
6. `/step-2` - Segunda etapa (vídeo)
7. `/mission-2` - Segunda missão (quiz)
8. `/points-2` - Comemoração +20 pontos
9. `/rewards` - Lista de recompensas
10. `/reward/:id` - Detalhes da recompensa
11. `/redeem-success` - Confirmação de resgate
12. `/profile` - Perfil do usuário

## Dev Panel

Painel de desenvolvimento fixo no canto inferior direito com toggles para simular cenários:

- **Offline**: Simula falta de conexão em `/rewards` e resgates (exibe "Sem internet no momento.")
- **Redeem Fail**: Simula erro ao resgatar recompensas (exibe "Não foi possível concluir agora. Tente novamente.")
- **Video Fail**: Simula falha ao carregar vídeos em `/step-1` e `/step-2` (exibe "Não foi possível carregar o vídeo. Você pode continuar mesmo assim.")

As configurações são persistidas em localStorage e requerem refresh da página para aplicar as mudanças.

### Como usar o Dev Panel

1. Clique no ícone de engrenagem (⚙️) no canto inferior direito
2. Clique nos toggles para ativar/desativar cada cenário
3. A página recarregará automaticamente com as novas configurações

## Sistema de pontuação

- Pontos iniciais: 0
- +20 pontos ao completar etapa 1 (`/points-1`)
- +20 pontos ao completar etapa 2 (`/points-2`)
- +10 pontos bônus ao acertar 3/3 perguntas em cada quiz
- Score = 100 + pontos acumulados
- Níveis:
  - 0-119: Iniciante
  - 120-159: Aprendiz
  - 160+: Avançado

## Recompensas

- **Desconto em parceiros** (40 pontos)
- **Cashback de R$ 5** (60 pontos)
- **Recarga de R$ 10** (80 pontos)

## Dados persistidos

O app utiliza localStorage para persistir:

- Pontos acumulados
- Etapas completadas
- Recompensas resgatadas
- Resultados dos quizzes (respostas e acertos)
- Configurações do Dev Panel

Para resetar, limpe o localStorage:

```javascript
localStorage.clear();
```

## Sistema de Quiz

### Missões Interativas

As missões `/mission-1` e `/mission-2` agora incluem quizzes educativos de múltipla escolha.

### Funcionamento

1. **3 Perguntas**: Cada missão possui 3 perguntas sobre educação financeira
2. **Feedback Imediato**: Ao confirmar resposta, aparece indicação visual de acerto/erro
3. **Explicação**: Cada pergunta inclui explicação educativa após resposta
4. **Progresso Visual**: Barra de progresso mostra pergunta atual (1/3, 2/3, 3/3)
5. **Persistência**: Respostas são salvas em localStorage
6. **Pontuação**:
   - Missão é concluída independente de acertos
   - Bônus de +10 pontos ao acertar todas (3/3)
   - Resumo final mostra quantidade de acertos

### Dados Mockados

Os quizzes estão em `src/data/quizzes.ts`:

- `quizMission1`: Quiz sobre organização de gastos
- `quizMission2`: Quiz sobre planejamento financeiro

### Tipos TypeScript

```typescript
type QuizOption = {
  id: string;
  label: string;
};

type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation?: string;
};

type Quiz = {
  id: string;
  title: string;
  questions: QuizQuestion[];
};
```

### Componente Reutilizável

O `QuizRunner` (`src/components/blocks/QuizRunner.tsx`) é reutilizável:

```typescript
<QuizRunner
  quiz={quizMission1}
  onComplete={(correctCount) => {
    // lógica de conclusão
  }}
/>
```

### Evolução Futura: API Real

Para integrar com API externa, criar endpoint:

```
GET /api/quizzes/:quizId
```

Retornando o formato `Quiz` com perguntas e opções. O componente `QuizRunner` já está preparado para receber dados externos.

## Integração de Vídeo

### API de Conteúdo

O app integra com uma API externa para buscar conteúdo de vídeo com URLs assinadas e expiração.

#### Endpoints Esperados

##### GET /api/trails/:trailId

Retorna informações da trilha e seus steps com vídeos.

**Exemplo de Resposta:**

```json
{
  "id": "organize-gastos",
  "title": "Organize seus Gastos",
  "steps": [
    {
      "id": "step-1",
      "title": "Como aproveitar seus benefícios",
      "description": "Assista ao vídeo curto e aprenda dicas simples",
      "video": {
        "id": "video-123",
        "title": "Benefícios Caixa",
        "url": "https://storage.exemplo.com/videos/video-123.mp4?signature=abc&expires=1234567890",
        "expiresAt": "2026-02-23T10:00:00Z",
        "mimeType": "video/mp4",
        "provider": "s3"
      }
    },
    {
      "id": "step-2",
      "title": "Planejamento financeiro simples",
      "description": "Mais dicas práticas para organizar suas finanças",
      "video": {
        "id": "video-456",
        "title": "Planejamento Financeiro",
        "url": "https://storage.exemplo.com/videos/video-456.mp4?signature=def&expires=1234567890",
        "expiresAt": "2026-02-23T10:00:00Z",
        "mimeType": "video/mp4",
        "provider": "s3"
      }
    }
  ]
}
```

##### POST /api/videos/:videoId/signed-url

Renova a URL assinada de um vídeo quando expira.

**Exemplo de Resposta:**

```json
{
  "id": "video-123",
  "url": "https://storage.exemplo.com/videos/video-123.mp4?signature=xyz&expires=1234567899",
  "expiresAt": "2026-02-23T11:00:00Z",
  "mimeType": "video/mp4"
}
```

### Funcionamento

1. **Carregamento Inicial**: Ao acessar `/step-1` ou `/step-2`, o app busca a trilha via `GET /api/trails/organize-gastos`
2. **Reprodução**: O elemento `<video>` carrega a URL assinada retornada
3. **Expiração**: Se o vídeo falhar por URL expirada (detectado automaticamente), o app tenta renovar via `POST /api/videos/:id/signed-url`
4. **Fallback**: Se a renovação falhar ou API estiver indisponível, mostra mensagem permitindo continuar
5. **Dev Panel**: Toggle `videoFail` força o fallback sem chamar a API

### Tipos TypeScript

```typescript
type VideoAsset = {
  id: string;
  title?: string;
  url: string;
  expiresAt: string;
  mimeType?: string;
  provider?: string;
};

type Step = {
  id: string;
  title: string;
  description: string;
  video: VideoAsset;
};

type Trail = {
  id: string;
  title: string;
  steps: Step[];
};
```
