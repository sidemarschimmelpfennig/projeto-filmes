<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
    <div class="flex items-center justify-between border-b border-white/[0.08] pb-4">
      <div class="flex items-center gap-3">
        <div class="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
        <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Resultados para: <span class="text-emerald-400">"{{ query }}"</span>
        </h1>
      </div>
      <span class="text-xs text-slate-400">
        {{ results.length }} resultados encontrados
      </span>
    </div>

    <!-- Skeletons -->
    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
      <div v-for="n in 10" :key="n" class="animate-pulse flex flex-col space-y-3">
        <div class="aspect-[2/3] bg-white/[0.06] rounded-2xl"></div>
        <div class="h-4 bg-white/[0.06] rounded w-3/4"></div>
      </div>
    </div>

    <!-- Empty -->
    <div v-else-if="results.length === 0" class="text-center py-20 space-y-4">
      <h3 class="text-lg font-semibold text-white">Nenhum resultado encontrado</h3>
      <p class="text-sm text-slate-400">Tente buscar por outro termo ou nome de filme.</p>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
      <MovieItens
        v-for="item in results"
        :key="item.id"
        :movie="formatItem(item)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchPage",
  data() {
    return {
      results: [],
      loading: true,
    };
  },
  computed: {
    query() {
      return this.$route.query.q || "";
    },
  },
  watch: {
    "$route.query.q": {
      immediate: true,
      handler(newQuery) {
        if (newQuery) {
          this.search(newQuery);
        }
      },
    },
  },
  methods: {
    async search(q) {
      this.loading = true;
      try {
        const response = await this.$axios.get(
          `/search/multi?query=${encodeURIComponent(q)}&language=pt-BR`
        );
        this.results = (response.data.results || []).filter(
          (item) => item.media_type === "movie" || item.media_type === "tv"
        );
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
    formatItem(item) {
      return {
        ...item,
        title: item.title || item.name,
        release_date: item.release_date || item.first_air_date,
      };
    },
  },
};
</script>
