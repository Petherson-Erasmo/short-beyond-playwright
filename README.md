# short-beyond-playwright

Testes de API e E2E com Playwright para um encurtador de links.

Este projeto foi criado como parte do Bootcamp "Playwright Além da Interface" do Fernando Papito. O objetivo é praticar testes de API REST (auth e links) usando Playwright Test, com dados dinâmicos via Faker e fixtures/serviços para melhor organização.

> 🎬 **Quer ver a aplicação funcionando?** Confira a [demonstração em vídeo](#-demonstração-em-vídeo) no final deste README mostrando a aplicação rodando e os testes sendo executados.

## Sumário
- Visão Geral
- Stack
- Requisitos
- Instalação
- Configuração (.env)
- Como Rodar os Testes
- Estrutura do Projeto
- Convenções
- Troubleshooting
- Roadmap
- Créditos e Licença

## Visão Geral
Cenários contemplados:
- Auth: registro de usuário e validações (e-mail inválido, e-mail duplicado)
- Links: encurtar link, remover link, tratar erros (id inexistente)
- Health: verificação online da API

## Stack
- Node.js + NPM
- Playwright Test (^1.55)
- @faker-js/faker (dados randômicos)

## Pré-requisitos
- Node.js 18+ (recomendado)
- API alvo rodando localmente (padrão): `http://localhost:3333`
- Windows 10/11 (64-bit)
- WSL 2 habilitado
- Pelo menos 4GB de RAM disponível

## Instalação
```powershell
npm install
```

## Configuração (.env)
Crie um arquivo `.env` na raiz com, por exemplo:
```
BASE_API=http://localhost:3333
AUTH_DEFAULT_PASSWORD=senha123
```
O `playwright.config.js` lê `BASE_API` e define `use.baseURL`. Os serviços usam caminhos relativos (ex.: `/api/auth/login`).
- Porta/URL: se sua API não está em `3333`, ajuste as URLs nos serviços ou use variável de ambiente.

## Como Rodar os Testes
- Todos os testes:
```powershell
npm run test
```
- UI do Playwright:
```powershell
npx run test:ui
```
- Um arquivo/cenário específico:
```powershell
npx playwright test playwright/e2e/links/post.spec.js -g "Deve encurtar um novo link"
```
- Relatório HTML: gerado em `playwright-report/`
- Relatório DOT:
```powershell
npm run report:dot
```
- Relatório LIST:
```powershell
npm run report:list
```

Dicas:
- Use `--debug` para modo depuração.
- Use `--project` caso configure múltiplos projetos no `playwright.config.js`.

## Estrutura do Projeto
```
playwright/
  e2e/
    auth/
      register.spec.js
    links/
      post.spec.js
      delete.spec.js
    health.spec.js
  support/
    services/
      auth.js
      links.js
    factories/
      user.js           # se aplicável
    fixtures.js         # se aplicável
playwright.config.js
```

## Convenções
- Descrição de cenários em PT-BR ("Deve …", "Não deve …").
- Mensagens de validação: quando o backend variar aspas/pontuação, prefira `toMatch(/regex/)` ao invés de comparação literal.
- Pré-condições: crie usuários/links no início do cenário quando necessário.
- Serviços/fixtures auxiliam a reuso e clareza dos testes.

## Créditos e Licença
- Bootcamp: "Playwright Além da Interface" — Fernando Papito
- Licença: MIT (ajuste conforme necessário)

## Executando a API local com Podman (Windows)
Siga o tutorial oficial do time para instalação e configuração do Podman no Windows:

Guia: https://swift-check-0f0.notion.site/Tutorial-Instala-o-do-Podman-no-Windows-266fd793866580f88486c1441f9d3286

> 💡 O que é o Podman?
**Podman** é uma ferramenta para criar e executar containers (como caixas isoladas que contêm aplicações), similar ao Docker. A grande diferença é que o Podman **não precisa de um serviço central rodando no computador nem de permissões de administrador**, o que torna tudo mais seguro e simples para testar no seu próprio computador.
> 
> 
> O Podman funciona com o conceito de **PODs** - imagine um POD como um "grupinho" de containers que trabalham juntos e compartilham recursos como rede e armazenamento. É como ter vários aplicativos que precisam conversar entre si organizados em uma mesma "sala virtual". Isso facilita muito quando você tem sistemas mais complexos que dependem de vários componentes funcionando em conjunto.
> 
> **Em resumo**: Podman = containers mais seguros + organização em grupos (PODs) + sem complicações de instalação.
> 

---

## 📋 Passo a Passo

### 1️⃣ Habilitar WSL 2

**Abra o PowerShell como Administrador:**

```powershell
# Habilitar WSL e Máquina Virtual
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# Reiniciar o computador
Restart-Computer
```

**Após reiniciar:**

```powershell
wsl --set-default-version 2
```

---

### 2️⃣ Instalar Distribuição Linux

```powershell
wsl --install -d Ubuntu
```

> ⚠️ Importante: Configure usuário e senha quando solicitado
> 

---

### 3️⃣ Baixar e Instalar Podman Desktop

1. **Acesse:** https://podman.io/getting-started/installation
2. **Baixe** o Podman Desktop para Windows
3. **Execute** o instalador `.exe` como Administrador
4. **Siga** as instruções de instalação padrão

---

### 4️⃣ Configuração Inicial

1. **Abra** o Podman Desktop
2. **Na primeira execução**, ele irá:
    - ✅ Detectar o WSL 2
    - ✅ Configurar a máquina virtual automaticamente
    - ✅ Inicializar o ambiente Podman

---

### 5️⃣ Verificar Instalação

**No PowerShell ou Terminal:**

```bash
podman --version
podman info
```

**Teste com container:**

```bash
podman run hello-world
```

---

## 🚀 Comandos Essenciais

| Comando | Descrição |
| --- | --- |
| `podman ps` | Listar containers ativos |
| `podman images` | Listar imagens |
| `podman run -it ubuntu bash` | Executar container interativo |
| `podman stop <container-id>` | Parar container |
| `podman rm <container-id>` | Remover container |

---

## ✨ Dicas

> 💡 Dica Principal: O Podman usa os mesmos comandos do Docker - apenas substitua docker por podman
> 

> 🎯 Interface Gráfica: O Podman Desktop oferece uma interface amigável para gerenciar containers, imagens e volumes
>
---

## 🎬 Demonstração em vídeo

Confira abaixo a demonstração da aplicação funcionando e os testes sendo executados com Playwright:

<video src="video/demonstracao.mp4" controls autoplay loop muted playsinline style="max-width:100%;"></video>