<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
    <div class="flex items-center justify-between border-b border-white/[0.08] pb-4">
      <div class="flex items-center gap-3">
        <div class="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
        <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Séries Populares
        </h1>
      </div>
      <span class="text-xs text-slate-400">
        Página {{ currentPage }} de {{ totalPages }}
      </span>
    </div>

    <!-- Skeletons -->
    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
      <div v-for="n in 10" :key="n" class="animate-pulse flex flex-col space-y-3">
        <div class="aspect-[2/3] bg-white/[0.06] rounded-2xl"></div>
        <div class="h-4 bg-white/[0.06] rounded w-3/4"></div>
      </div>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
      <MovieItens
        v-for="show in shows"
        :key="show.id"
        :movie="formatShow(show)"
      />
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center gap-3 pt-6 pb-6">
      <button
        :disabled="currentPage <= 1 || loading"
        class="px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-200 text-sm font-medium hover:bg-white/10 hover:border-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
        @click="changePage(currentPage - 1)"
      >
        Anterior
      </button>
      <span class="text-sm font-bold text-white px-3">
        {{ currentPage }} / {{ totalPages }}
      </span>
      <button
        :disabled="currentPage >= totalPages || loading"
        class="px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-200 text-sm font-medium hover:bg-white/10 hover:border-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
        @click="changePage(currentPage + 1)"
      >
        Próximo
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SeriesPage",
  data() {
    return {
      shows: [],
      currentPage: 1,
      totalPages: 1,
      loading: true,
    };
  },
  mounted() {
    this.fetchShows();
  },
  methods: {
    async fetchShows() {
      this.loading = true;
      try {
        const response = await this.$axios.get(
          `/tv/popular?language=pt-BR&page=${this.currentPage}`
        );
        this.shows = response.data.results || [];
        this.totalPages = Math.min(response.data.total_pages || 1, 500);
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
    formatShow(show) {
      return {
        ...show,
        title: show.name,
        release_date: show.first_air_date,
      };
    },
    changePage(p) {
      if (p >= 1 && p <= this.totalPages) {
        this.currentPage = p;
        this.fetchShows();
        if (process.client) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    },
  },
};
</script>
