# ♿ Guia de Acessibilidade - Portal NR-1

## Visão Geral

O Portal NR-1 foi desenvolvido seguindo as melhores práticas de acessibilidade WCAG 2.1 nível AA, garantindo que todos os usuários, incluindo pessoas com deficiências visuais, auditivas, motoras e cognitivas, possam utilizar a plataforma de forma eficiente.

---

## 🎯 Recursos Implementados

### 1. Painel de Acessibilidade Flutuante

**Localização:** Botão fixo no canto inferior esquerdo

**Recursos:**
- ✅ Leitor de tela integrado com síntese de voz
- ✅ Modo alto contraste (#000 fundo / #FFF texto)
- ✅ Controle de tamanho de fonte (4 níveis)
- ✅ Assistente de voz com comandos
- ✅ Indicadores visuais de estado

**Como usar:**
1. Clique no ícone de acessibilidade (♿)
2. Ative/desative recursos conforme necessário
3. Use os botões A+/A- para ajustar fonte
4. Toggle para alto contraste ou leitor de tela

---

### 2. Assistente de Voz IA

**Localização:** Botão flutuante roxo no canto inferior direito

**Funcionalidades:**
- 🎙️ Ativação por clique
- 🔊 Feedback visual e sonoro
- 📢 Narração de elementos
- 🗣️ Comandos por voz (simulado)
- ✨ Animações de estado (ouvindo/falando)

**Como usar:**
1. Clique no ícone do microfone
2. Aguarde o indicador "Ouvindo..."
3. Fale seu comando
4. Receba resposta por voz e visual

---

### 3. Navegação por Teclado

**Atalhos Principais:**

| Tecla | Função |
|-------|--------|
| `Tab` | Navegar para próximo elemento |
| `Shift + Tab` | Navegar para elemento anterior |
| `Enter` | Ativar botão/link |
| `Esc` | Fechar modais/painéis |
| `Setas` | Navegar em listas e menus |
| `Space` | Ativar checkboxes e toggles |

**Indicadores Visuais:**
- Outline azul neon em elementos focados
- Glow de 6px com sombra em focus-visible
- Ordem lógica de navegação (TAB index)

---

### 4. Modo Alto Contraste

**Ativação:** Painel de Acessibilidade > Toggle "Alto Contraste"

**Mudanças:**
- Fundo: #000000 (preto absoluto)
- Texto: #FFFFFF (branco puro)
- Links: #60A5FA (azul acessível)
- Bordas: 2-4px visíveis
- Ícones: brightness/contrast aumentado
- Botões: bordas destacadas

**Proporção de Contraste:** 21:1 (AAA)

---

### 5. Controle de Fonte

**Tamanhos Disponíveis:**
- Pequena: 14px
- Média: 16px (padrão)
- Grande: 18px
- Extra Grande: 22px

**Aplicação:**
- Todas as seções do site
- Gráficos e dashboards
- Formulários e labels
- Menu e navegação

---

### 6. ARIA Labels e Semântica

**Implementado em:**
- `role="banner"` - Header
- `role="navigation"` - Menu principal
- `role="main"` - Conteúdo principal
- `aria-label` - Todos os botões e links
- `aria-current` - Navegação ativa
- `aria-required` - Campos obrigatórios
- `aria-checked` - Toggles e switches
- `aria-expanded` - Painéis expansíveis

---

### 7. Skip Links

**Funcionalidade:** Pular para conteúdo principal

**Ativação:**
1. Pressione `Tab` na página
2. Link "Pular para o conteúdo principal" aparece
3. Pressione `Enter` para ir direto ao conteúdo

---

### 8. Leitura de Tela

**Compatível com:**
- ✅ NVDA (Windows)
- ✅ JAWS (Windows)
- ✅ VoiceOver (Mac/iOS)
- ✅ TalkBack (Android)
- ✅ Narrator (Windows)

**Recursos:**
- Narração automática ao passar o mouse
- Leitura de títulos e cabeçalhos
- Descrição de gráficos e indicadores
- Feedback sonoro em ações
- Alt text em todas as imagens

---

### 9. Formulários Acessíveis

**Melhorias:**
- Labels associados (`htmlFor` + `id`)
- Placeholders descritivos
- Validação com feedback visual/sonoro
- Mensagens de erro claras
- Estados de foco destacados
- Inputs com min-height 44px (touch target)

**Exemplo:**
```tsx
<label htmlFor="email">E-mail</label>
<input
  id="email"
  aria-label="E-mail corporativo"
  aria-required="true"
  aria-invalid={hasError}
/>
```

---

### 10. Gráficos Acessíveis

**Recharts com Acessibilidade:**
- Keys únicas em todos os dados
- Tooltips com informações completas
- Cores com contraste adequado
- Legendas visíveis e descritivas
- Navegação por teclado (futura implementação)

---

## 🎨 Design System Acessível

### Cores e Contraste

**Paleta Principal:**
- Fundo: Slate 950 → #000 (alto contraste)
- Texto: White → #FFF
- Primário: Blue 500 (#3B82F6)
- Acento: Cyan 400 (#22D3EE)
- Erro: Red 500 (#EF4444)
- Sucesso: Green 500 (#10B981)

**Contraste Mínimo:**
- Texto normal: 7:1 (AAA)
- Texto grande: 4.5:1 (AA)
- Componentes UI: 3:1 (AA)

### Tamanhos Interativos

**Touch Targets:**
- Mínimo: 44x44px (WCAG 2.1)
- Recomendado: 48x48px
- Botões grandes: 56x56px+

### Estados Visuais

**Focus:**
```css
outline: 3px solid #60A5FA;
outline-offset: 3px;
box-shadow: 0 0 0 6px rgba(96, 165, 250, 0.2);
```

**Hover:**
```css
transform: scale(1.05);
border-color: #60A5FA;
```

**Active:**
```css
transform: scale(0.95);
```

---

## 📱 Responsividade Acessível

### Breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Adaptações Mobile:
- Botões maiores (min 48px)
- Espaçamento aumentado
- Menu hamburger acessível
- Gestos touch otimizados
- Font-size ajustável mantido

---

## 🚀 Como Testar Acessibilidade

### 1. Navegação por Teclado
1. Desconecte o mouse
2. Use apenas `Tab`, `Enter`, `Esc`
3. Verifique se todos os elementos são acessíveis
4. Ordem lógica de navegação

### 2. Leitor de Tela
1. Ative NVDA/VoiceOver
2. Navegue pela página
3. Escute descrições de elementos
4. Verifique ARIA labels

### 3. Alto Contraste
1. Ative modo alto contraste
2. Verifique legibilidade
3. Teste cores de links
4. Valide bordas e contornos

### 4. Zoom
1. Aumente zoom para 200%
2. Verifique quebra de layout
3. Teste rolagem horizontal
4. Valide legibilidade

### 5. Ferramentas
- axe DevTools (Chrome Extension)
- WAVE Web Accessibility Evaluation Tool
- Lighthouse (Chrome DevTools)
- Screen Reader (NVDA/VoiceOver)

---

## 📊 Conformidade WCAG 2.1

### Nível A ✅
- ✅ 1.1.1 - Conteúdo não textual (Alt text)
- ✅ 1.3.1 - Informação e relacionamentos
- ✅ 2.1.1 - Teclado
- ✅ 2.4.1 - Ignorar blocos (Skip links)
- ✅ 4.1.2 - Nome, função, valor

### Nível AA ✅
- ✅ 1.4.3 - Contraste mínimo (7:1)
- ✅ 1.4.5 - Imagens de texto
- ✅ 2.4.7 - Foco visível
- ✅ 3.2.4 - Identificação consistente
- ✅ 3.3.2 - Labels ou instruções

### Nível AAA ⚠️ (Parcial)
- ⚠️ 1.4.6 - Contraste melhorado (implementado em alto contraste)
- ⚠️ 2.4.8 - Localização (breadcrumbs - não implementado)
- ⚠️ 3.1.3 - Palavras incomuns (não aplicável)

---

## 🔧 Componentes Acessíveis

### AccessibleButton
```tsx
<AccessibleButton
  variant="primary"
  ariaLabel="Abrir dashboard"
  onHoverSpeak="Abrir painel de controle"
>
  Ver Dashboard
</AccessibleButton>
```

### Toggles
```tsx
<button
  role="switch"
  aria-checked={isActive}
  aria-label="Ativar modo escuro"
/>
```

### Inputs
```tsx
<input
  id="email"
  aria-label="E-mail"
  aria-required="true"
  aria-invalid={error}
  aria-describedby="email-error"
/>
```

---

## 📚 Recursos Adicionais

### Documentação:
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)

### Ferramentas:
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

---

## 🎯 Roadmap Futuro

- [ ] Modo dislexia (fonte OpenDyslexic)
- [ ] Navegação por voz real (Web Speech API)
- [ ] Descrição áudio de gráficos
- [ ] Modo leitura (simplificado)
- [ ] Tradutor de Libras (avatar 3D)
- [ ] Temas personalizáveis
- [ ] Atalhos customizáveis

---

**Desenvolvido com ♿ e ❤️ para inclusão digital**

Portal NR-1 - Acessível, Moderno, Profissional
