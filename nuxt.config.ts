// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  experimental: {
    appManifest: false,
  },
  app: {
    head: {
      title: 'SideFilmes - Milhões de Filmes, Séries e Pessoas para Descobrir',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'SideFilmes - Explore milhões de filmes, séries, atores e descubra novidades.' },
        { name: 'theme-color', content: '#090d16' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.VUE_APP_API_BASE_URL || process.env.NUXT_PUBLIC_API_BASE_URL || 'https://api.themoviedb.org/3',
      tmdbApiKey: process.env.VUE_APP_AXIOS_API_KEY || process.env.NUXT_PUBLIC_TMDB_API_KEY || '',
      tmdbToken: process.env.VUE_APP_AXIOS_TOKEN || process.env.NUXT_PUBLIC_TMDB_TOKEN || '',
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  css: ['~/assets/css/tailwind.css'],
})
