# Teste Rápido - Caixa Perto MVP

## ⚡ Como Testar em 5 Minutos

### 1. Iniciar a aplicação

```bash
npm run dev
```

Abre em `http://localhost:5173`

### 2. Fluxo Completo (sem Dev Panel)

```
Homepage (/popup)
  → Click "Começar agora"
  → /trail (vê progresso)
  → Click "Iniciar trilha"
  → /step-1 (vê vídeo placeholder)
  → Click "Ir para a missão"
  → /mission-1 (escolhe resposta)
  → Click "Concluir missão"
  → /points-1 (ganha +20 pts)
  → Click "Continuar"
  → /step-2 (vê vídeo placeholder)
  → Click "Ir para a missão"
  → /mission-2 (escolhe resposta)
  → Click "Concluir missão"
  → /points-2 (ganha +20 pts = 40 total)
  → Click "Ver recompensas"
  → /rewards (vê 3 recompensas)
  → Click em uma recompensa
  → /reward/:id (detalhes)
  → Click "Resgatar"
  → /redeem-success (sucesso!)
  → Click "Ver meu perfil"
  → /profile (vê pontos, nível, recompensa resgatada)
```

### 3. Testar Dev Panel (Offline)

```
1. Click ⚙️ (engrenagem, canto inferior direito)
2. Click no toggle "Offline"
3. Página recarrega
4. Navigate para /rewards
5. Ver mensagem "Sem internet no momento."
6. Click no toggle "Offline" novamente para desativar
```

### 4. Testar Dev Panel (Video Fail)

```
1. Click ⚙️
2. Click no toggle "Video Fail"
3. Página recarrega
4. Navigate para /step-1
5. Ver mensagem "Não foi possível carregar o vídeo..."
6. Clicar "Ir para a missão" mesmo assim funciona
```

### 5. Testar Dev Panel (Redeem Fail)

```
1. Click ⚙️
2. Click no toggle "Redeem Fail"
3. Página recarrega
4. Ganhe pontos (faça o fluxo completo até /points-2)
5. Navigate para /rewards
6. Click em uma recompensa
7. Click "Resgatar"
8. Ver mensagem de erro "Não foi possível concluir agora"
9. Click "Tentar de novo"
```

### 6. Testar Persistência

```
1. Complete o fluxo completo
2. F5 (refresh da página)
3. Pontos ainda estão lá ✓
4. Recompensas resgatadas continuam ✓
5. Dev flags continuam ✓

Ou pela DevTools:
  → F12 → Application → localStorage
  → Ver chave "caixa-perto-state"
  → Todos os dados persistem
```

### 7. Testar Reset

```
1. F12 → Console
2. Digite: localStorage.clear()
3. Pressione Enter
4. F5 (refresh)
5. Tudo volta ao padrão ✓
```

## ✅ Checklist de Teste

### Navegação

- [ ] /popup → /trail → /step-1 → /mission-1 → /points-1
- [ ] /points-1 → /step-2 → /mission-2 → /points-2
- [ ] /points-2 → /rewards
- [ ] /rewards → /reward/:id
- [ ] /reward/:id → /redeem-success → /profile
- [ ] Voltar funciona em todas as páginas
- [ ] Nenhuma rota 404

### Pontos

- [ ] Começa em 0
- [ ] Após /points-1: 20 pontos
- [ ] Após /points-2: 40 pontos
- [ ] Score = 100 + pontos
- [ ] Nível muda corretamente

### Recompensas

- [ ] 3 recompensas listadas
- [ ] Partner Discount bloqueado até 40 pts
- [ ] Cashback bloqueado até 60 pts
- [ ] Topup bloqueado até 80 pts
- [ ] Pode resgatar quando tem pontos

### Dev Panel

- [ ] ⚙️ abre/fecha
- [ ] Offline bloqueia /rewards
- [ ] Video Fail mostra alerta em /step-1 e /step-2
- [ ] Redeem Fail gera erro ao tentar resgatar
- [ ] Toggles persistem após reload

### UI

- [ ] Responsivo em mobile (420px)
- [ ] Cards com rounded-2xl
- [ ] Botões com h-12
- [ ] Layout centralizado
- [ ] Cores consistentes

## 🐛 Debug Console

Se algo não funcionar:

```javascript
// Ver estado atual
JSON.parse(localStorage.getItem('caixa-perto-state'));

// Ver dev flags
JSON.parse(localStorage.getItem('caixa-perto-state')).devFlags;

// Reset completo
localStorage.clear();

// Ver todas as rotas
// Verificar App.tsx para lista de <Route>
```

## 📊 Performance

- CSS: 3.45 kB (gzip)
- JS: 64.27 kB (gzip)
- Tempo de load: < 1s
- FCP: < 500ms

## ✨ Recursos Extra

- Todos os componentes padronizados
- Sem bibliotecas extras (só lucide-react)
- TypeScript 100% tipado
- localStorage automático
- Dev panel não interfere com produção

---

**Tempo estimado:** 5-10 minutos para teste completo
**Status:** Pronto para demonstração
