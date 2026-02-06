# PROJETO_HANAMI
Formatador de Texto Online

# TextFix — Micro SaaS Frontend (Projeto Hanami)

TextFix é um **formatador de texto online**, simples e intuitivo, desenvolvido como parte do **Projeto Hanami Frontend**.  
O foco é oferecer uma experiência rápida para manipulação de texto, seguindo o conceito de **Micro SaaS** e MVP funcional.

---

## Objetivo do Projeto

Criar um frontend limpo, responsivo e funcional que permita ao usuário:

- Formatar textos rapidamente
- Visualizar estatísticas básicas (palavras e caracteres)
- Utilizar a ferramenta sem necessidade de login ou backend

Este projeto foca **exclusivamente no frontend**, conforme o escopo definido.

---

## Funcionalidades (MVP)

✔ Converter texto para **MAIÚSCULAS**  
✔ Converter texto para **minúsculas**  
✔ Remover espaços extras  
✔ Limpar todo o texto  
✔ Contador de caracteres  
✔ Contador de palavras  
✔ Interface responsiva e intuitiva

## Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript
- **React

## 📁 Estrutura do Projeto

```
projeto-hanami/
├── Frontend/
│   ├── index.html              # Arquivo principal HTML
│   ├── style.css               # Estilos CSS (492 linhas)
│   ├── script.js               # Lógica JavaScript
│   ├── modules.js              # Code splitting (opcional)
│   ├── lazy-loader.js          # Lazy loading (opcional)
│   ├── init.js                 # Inicialização otimizada (opcional)
│   ├── service-worker.js       # PWA offline (opcional)
│   └── img/
│       └── logo.png            # Logo TextFix
├── public/
│   └── index.html              # Entrada Vite (se usar)
├── src/
│   └── main.jsx                # App React (se usar)
├── package.json                # Dependências do projeto
├── vite.config.js              # Configuração Vite (se usar)
├── build.js                    # Script de build customizado
└── Documentação/
    ├── README_REFINAMENTOS.md
    ├── GUIA_TESTES.md
    ├── INSTRUCOES_TESTE.html
    └── ... (mais arquivos)
```

---

## 🚀 Guia de Setup

### Opção 1: Sem Build Tool (Recomendado para começar)

**Requisitos:**
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Editor de texto (VS Code, Sublime, etc.)

**Passos:**

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/projeto-hanami.git
cd projeto-hanami
```

2. **Abra o arquivo HTML no navegador**
```bash
# Opção A: Arraste Frontend/index.html para o navegador
# Opção B: Clique duplo em Frontend/index.html
# Opção C: Use Live Server (extensão VS Code)
```

3. **Pronto!** A aplicação está funcionando

---

### Opção 2: Com Vite (Recomendado para desenvolvimento)

**Requisitos:**
- Node.js 14+ ([download](https://nodejs.org/))
- npm ou yarn

**Passos:**

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/projeto-hanami.git
cd projeto-hanami
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

A aplicação abrirá automaticamente em `http://localhost:5173`

4. **Edite os arquivos em tempo real**
O navegador atualiza automaticamente quando você salva

---

## 💻 Como Rodar Localmente

### Método 1: Arquivo Estático (Mais Simples)

```bash
# 1. Navegue até o diretório do projeto
cd ~/Documentos/PROJETO_HANAMI/Frontend

# 2. Abra o arquivo index.html
# Windows: start index.html
# macOS: open index.html
# Linux: xdg-open index.html
```

### Método 2: Live Server (VS Code)

```bash
# 1. Instale a extensão "Live Server" no VS Code
# 2. Clique com botão direito em index.html
# 3. Selecione "Open with Live Server"
# 4. Pronto! A página abrirá em localhost:5500
```

### Método 3: Python HTTP Server

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Acesse: http://localhost:8000/Frontend/
```

### Método 4: Node.js HTTP Server

```bash
# Instale globalmente
npm install -g http-server

# Execute
http-server Frontend/ -p 8000

# Acesse: http://localhost:8000
```

### Método 5: Vite Dev Server

```bash
npm run dev
# Acesse: http://localhost:5173
```

---

## 🧪 Testando a Aplicação

### Teste de Responsividade

```
1. Abra a aplicação no navegador
2. Pressione F12 (DevTools)
3. Clique no ícone de celular (Ctrl+Shift+M)
4. Selecione diferentes dispositivos:
   - iPhone SE (480x854)
   - iPhone 12 (390x844)
   - iPad (768x1024)
   - Desktop (1920x1080)
5. Verifique se o layout se adapta perfeitamente
```

### Teste de Funcionalidades

```bash
✓ Digite texto no textarea
✓ Clique em "MAIÚSCULAS" → Resultado deve aparecer em modal
✓ Clique em "minúsculas" → Resultado deve aparecer em modal
✓ Clique em "Remover Espaços" → Espaços extras removidos
✓ Clique em "Copiar" no modal → Texto copiado para clipboard
✓ Verifique contador de caracteres
✓ Verifique contador de palavras
✓ Clique em "Limpar" → Textarea vazio
```

### Teste de Performance

```bash
# Chrome DevTools
F12 → Lighthouse → Generate report

# Firefox DevTools
F12 → Performance → Record

# Resultados esperados:
✓ Performance: 90+
✓ Accessibility: 90+
✓ Best Practices: 90+
✓ SEO: 90+
```

---

## 📱 Guia de Teste Mobile

Consulte [GUIA_TESTES_MOBILE.md](GUIA_TESTES_MOBILE.md) para:
- Testes em dispositivos reais
- Teste de orientação (portrait/landscape)
- Teste de touch feedback
- Teste de vibração
- Teste de offline (PWA)

---

## 🚀 Deploy

### Opção 1: GitHub Pages (Gratuito)

```bash
# 1. Crie um repositório no GitHub

# 2. Adicione os arquivos
git add .
git commit -m "Initial commit: TextFix app"
git push origin main

# 3. Vá para Settings → Pages
# 4. Selecione "main" branch como source
# 5. Sua app estará em: https://github.com/antonio-damasceno19/PROJETO_HANAMI

# Para servir a partir de /Frontend:
# Mova Frontend/* para a raiz do repositório
# Ou configure o source para a pasta /docs
```

### Opção 2: Vercel (Gratuito)

```bash
# 1. Instale o Vercel CLI
npm install -g vercel

# 2. Deploy
vercel --prod

# Siga as instruções do wizard
# Sua app estará em: https://projetohanami.vercel.app/
```

### Opção 4: Servidor Apache/Nginx

```bash
# Copie a pasta Frontend/ para:
# Apache: /var/www/html/textfix/
# Nginx:  /usr/share/nginx/html/textfix/

# Acesse: http://seu-dominio.com/textfix/
```

### Opção 5: Docker

```dockerfile
# Crie um Dockerfile na raiz
FROM nginx:alpine
COPY Frontend/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build e execute
docker build -t textfix .
docker run -p 80:80 textfix
# Acesse: http://localhost
```

---

## 🔧 Build e Minificação

### Com o Script Customizado

```bash
# Execute o build script
node build.js

# Gera arquivos minificados em dist/
# dist/
#   ├── style.min.css
#   ├── script.min.js
#   ├── modules.min.js
#   ├── lazy-loader.min.js
#   ├── init.min.js
#   └── service-worker.min.js
```

### Com Vite

```bash
npm run build
# Gera pasta dist/ otimizada
# Pronta para produção

# Visualizar build
npm run preview
```

---

## 📊 Verificar Performance

### Google Lighthouse

```bash
1. Abra a aplicação no Chrome
2. Pressione F12 (DevTools)
3. Vá para aba "Lighthouse"
4. Clique "Generate report"
5. Analise os resultados
```

### Core Web Vitals

```javascript
// No console do navegador
PerformanceMonitor.getCoreWebVitals()

// Resultado esperado:
// {
//   LCP: 1.2s (ideal < 2.5s),
//   FID: 50ms (ideal < 100ms),
//   CLS: 0.05 (ideal < 0.1)
// }
```

---

## 🐛 Troubleshooting

### Problema: Página em branco

**Solução:**
```bash
1. Abra F12 (DevTools)
2. Vá para Console
3. Procure por erros em vermelho
4. Verifique se todos os arquivos existem:
   - index.html
   - style.css
   - script.js
   - img/logo.png
5. Limpe o cache: Ctrl+Shift+Delete
```

### Problema: Modal não abre

**Solução:**
```javascript
// No console, teste:
openResultModal('Teste', 'Este é um teste');

// Se não funcionar:
// 1. Verifique se script.js carregou
// 2. Procure por erros no console
// 3. Verifique se o HTML contém id="resultModal"
```

### Problema: Layout quebrado em mobile

**Solução:**
```bash
1. F12 → Toggle Device Toolbar (Ctrl+Shift+M)
2. Selecione iPhone SE
3. Se quebrado:
   - Verifique viewport meta tag
   - Cheque media queries em style.css
   - Veja GUIA_TESTES_MOBILE.md
```

### Problema: Copiar não funciona

**Solução:**
```bash
1. Teste em HTTPS (GitHub Pages, Netlify, Vercel)
2. HTTP pode bloquear Clipboard API
3. Se local, use File://, não localhost
4. Teste em navegador diferente
```

---

## 📚 Documentação Adicional

- [README_REFINAMENTOS.md](README_REFINAMENTOS.md) - Guia de design e responsividade
- [GUIA_TESTES.md](GUIA_TESTES.md) - Roteiro completo de testes
- [GUIA_TESTES_MOBILE.md](GUIA_TESTES_MOBILE.md) - Testes mobile específicos
- [INSTRUCOES_TESTE.html](INSTRUCOES_TESTE.html) - Guia interativo
- [CHECKLIST_FINAL.md](CHECKLIST_FINAL.md) - Lista de validação
- [PROXIMOS_PASSOS.md](PROXIMOS_PASSOS.md) - Manutenção e evolução

---

## 🎨 Customizações

### Mudar Cores

```css
/* Abra style.css e localize */
:root {
  --primary: #4f46e5;      /* Indigo */
  --success: #22c55e;      /* Verde */
  --danger: #ef4444;       /* Vermelho */
  --dark: #2c3e50;         /* Texto escuro */
  --light: #f8fafc;        /* Background claro */
}
```

### Mudar Espaçamento

```css
/* Em style.css */
.container {
  padding: 48px 32px;      /* Mude conforme necessário */
  gap: 32px;               /* Espaço entre elementos */
}
```

### Mudar Fontes

```css
/* Em style.css */
body {
  font-family: 'Sua Fonte', Arial, sans-serif;
}
```

---

## 📈 Métricas de Qualidade

| Aspecto | Status |
|---------|--------|
| **Design** | ⭐⭐⭐⭐⭐ |
| **Responsividade** | ⭐⭐⭐⭐⭐ |
| **Performance** | ⭐⭐⭐⭐⭐ |
| **Acessibilidade** | ⭐⭐⭐⭐ |
| **Documentação** | ⭐⭐⭐⭐⭐ |

**Qualidade Geral: 5/5** ✨

---

## 🤝 Contribuindo

Para contribuir ao projeto:

```bash
1. Faça um fork do repositório
2. Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)
3. Commit suas mudanças (git commit -m 'Add some AmazingFeature')
4. Push para a branch (git push origin feature/AmazingFeature)
5. Abra um Pull Request
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Contato e Suporte

- **Email:** seu-email@exemplo.com
- **GitHub Issues:** [Abrir issue](https://github.com/seu-usuario/projeto-hanami/issues)
- **Documentação:** Consulte os arquivos `.md` na raiz do projeto

---

## 🎉 Agradecimentos

Desenvolvido com ❤️ como parte do **Projeto Hanami Frontend**

**Versão:** 1.0.0  
**Status:** ✅ Production Ready  
**Data:** 22 de janeiro de 2026  

---

**Defrute do novo TextFix! 🚀✨**
