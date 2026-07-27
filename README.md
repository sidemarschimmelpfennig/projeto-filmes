# Cinema do Detalhe

Projeto de filmes desenvolvido em **Vue.js 3** integrado com a API do **The Movie Database (TMDB)**, utilizando Tailwind CSS para estilização moderna e responsiva.

## 🚀 Tecnologias Utilizadas

- **Vue 3** (Ecosystem: Vue Router & Vuex)
- **Axios** (Integração com a API do TMDB)
- **Tailwind CSS** (Estilização Utilitária)
- **Service Workers / PWA** (Registro offline e cache)

---

## 🛠️ Configuração do Ambiente

1. Crie um arquivo `.env` na raiz do projeto copiando o modelo `.env.example`:
   ```bash
   cp .env.example .env
   ```
2. Adicione suas credenciais da API do TMDB no arquivo `.env`:
   - `VUE_APP_AXIOS_API_KEY`: Sua chave de API do TMDB.
   - `VUE_APP_AXIOS_TOKEN`: Seu token de acesso de leitura (Bearer Token) da API do TMDB.

---

## 💻 Como Rodar o Projeto

### Instalar dependências
```bash
npm install
```

### Executar servidor de desenvolvimento
```bash
npm run serve
```
O projeto estará rodando localmente em `http://localhost:8080/`.

### Gerar build de produção
```bash
npm run build
```

### Executar o linter e formatador de código
```bash
npm run lint
```
