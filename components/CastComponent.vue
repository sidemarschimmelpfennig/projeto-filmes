<template>
  <div v-if="casts && casts.length > 0" class="space-y-6">
    <div class="flex items-center gap-3 border-b border-white/[0.08] pb-4">
      <div class="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
      <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Elenco Principal</h2>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
      <div
        v-for="cast in casts.slice(0, 12)"
        :key="cast.id"
        class="group flex flex-col bg-[#0f172a]/60 rounded-2xl overflow-hidden border border-white/[0.08] shadow-md hover:border-emerald-500/30 transition-all duration-200"
      >
        <div class="aspect-[2/3] overflow-hidden bg-slate-900">
          <img
            :src="castProfileImage(cast)"
            :alt="cast.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div class="p-3 flex flex-col flex-1">
          <span class="text-white font-semibold text-xs sm:text-sm truncate group-hover:text-emerald-400 transition-colors">
            {{ cast.name }}
          </span>
          <span class="text-slate-400 text-xs truncate mt-0.5">
            {{ cast.character || "Personagem" }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CastComponent",
  props: {
    casts: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    castProfileImage(value) {
      if (value.profile_path) {
        return "https://image.tmdb.org/t/p/w300/" + value.profile_path;
      }
      return "https://placehold.co/300x450?text=Sem+Foto";
    },
  },
};
</script>
