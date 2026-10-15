<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
    <div class="flex items-center justify-between border-b border-white/[0.08] pb-4">
      <div class="flex items-center gap-3">
        <div class="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
        <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Meus Favoritos
        </h1>
      </div>
      <span class="text-xs text-slate-400">
        {{ favoriteMovies.length }} {{ favoriteMovies.length === 1 ? 'filme salvo' : 'filmes salvos' }}
      </span>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && favoriteMovies.length === 0" class="text-center py-20 space-y-4">
      <div class="w-16 h-16 mx-auto rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-white">Nenhum favorito adicionado ainda</h3>
      <p class="text-sm text-slate-400 max-w-sm mx-auto">
        Navegue pelo catálogo e clique em "Favoritar" para salvar seus filmes preferidos aqui.
      </p>
      <NuxtLink
        to="/"
        class="inline-flex px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 transition"
      >
        Explorar Filmes
      </NuxtLink>
    </div>

    <!-- Loading -->
    <div v-else-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
      <div v-for="n in 5" :key="n" class="animate-pulse flex flex-col space-y-3">
        <div class="aspect-[2/3] bg-white/[0.06] rounded-2xl"></div>
        <div class="h-4 bg-white/[0.06] rounded w-3/4"></div>
      </div>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
      <MovieItens
        v-for="movie in favoriteMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "FavoritesPage",
  data() {
    return {
      favoriteMovies: [],
      loading: true,
    };
  },
  mounted() {
    this.loadFavorites();
  },
  methods: {
    async loadFavorites() {
      this.loading = true;
      if (process.client) {
        try {
          const ids = JSON.parse(localStorage.getItem("movie_favorites") || "[]");
          if (ids.length === 0) {
            this.favoriteMovies = [];
            this.loading = false;
            return;
          }
          const requests = ids.map((id) =>
            this.$axios.get(`/movie/${id}?language=pt-BR`).catch(() => null)
          );
          const responses = await Promise.all(requests);
          this.favoriteMovies = responses
            .filter((r) => r && r.data)
            .map((r) => ({
              ...r.data,
              genre_ids: (r.data.genres || []).map((g) => g.id),
            }));
        } catch (e) {
          console.error(e);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>
