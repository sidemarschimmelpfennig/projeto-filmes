<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
    <div class="flex items-center gap-3 border-b border-white/[0.08] pb-4">
      <div class="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
      <h1 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
        Pessoas & Celebridades em Alta
      </h1>
    </div>

    <!-- Skeleton Loading -->
    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
      <div v-for="n in 10" :key="n" class="animate-pulse flex flex-col space-y-3">
        <div class="aspect-[2/3] bg-white/[0.06] rounded-2xl"></div>
        <div class="h-4 bg-white/[0.06] rounded w-3/4"></div>
        <div class="h-3 bg-white/[0.06] rounded w-1/2"></div>
      </div>
    </div>

    <!-- Actors Grid -->
    <div
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6"
    >
      <div
        v-for="actor in actors"
        :key="actor.id"
        class="group flex flex-col h-full bg-[#0f172a]/60 rounded-2xl overflow-hidden border border-white/[0.08] shadow-lg hover:border-emerald-500/30 hover:scale-[1.02] transition-all duration-300"
      >
        <div class="relative aspect-[2/3] overflow-hidden bg-slate-900">
          <img
            :src="
              actor.profile_path
                ? 'https://image.tmdb.org/t/p/w500' + actor.profile_path
                : 'https://placehold.co/500x750?text=Sem+Foto'
            "
            :alt="actor.name"
            class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div class="p-3.5 flex flex-col flex-1">
          <span class="text-sm sm:text-base text-white font-semibold block truncate group-hover:text-emerald-400 transition-colors">
            {{ actor.name }}
          </span>
          <div class="text-xs text-slate-400 mt-1 line-clamp-2">
            {{ getKnownForList(actor.known_for) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActorsPage",
  data() {
    return {
      actors: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchActors();
  },
  methods: {
    async fetchActors() {
      this.loading = true;
      try {
        const response = await this.$axios.get(
          "/person/popular?language=pt-BR"
        );
        this.actors = response.data.results || [];
      } catch (error) {
        console.error("Erro ao buscar atores:", error.message);
      } finally {
        this.loading = false;
      }
    },
    getKnownForList(knownFor) {
      if (!knownFor) return "";
      return knownFor.map((m) => m.title || m.name).join(", ");
    },
  },
};
</script>
