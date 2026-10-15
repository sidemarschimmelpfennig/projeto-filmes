<template>
  <div v-if="backdropList.length > 0" class="space-y-6">
    <div class="flex items-center gap-3 border-b border-white/[0.08] pb-4">
      <div class="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
      <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Galeria de Imagens</h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="(image, index) in backdropList"
        :key="index"
        class="group relative aspect-video overflow-hidden rounded-2xl bg-slate-900 border border-white/[0.08] shadow-md hover:border-emerald-500/30 transition-all duration-300"
      >
        <img
          :src="backdropsImages(image)"
          alt="Imagem do filme"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImagesComponent",
  props: {
    backdrops: {
      type: [Array, Object],
      default: () => [],
    },
  },
  computed: {
    backdropList() {
      if (Array.isArray(this.backdrops)) {
        return this.backdrops.slice(0, 8);
      }
      return [];
    },
  },
  methods: {
    backdropsImages(value) {
      if (value && value.file_path) {
        return "https://image.tmdb.org/t/p/w500/" + value.file_path;
      }
      return "https://placehold.co/500x281?text=Sem+Imagem";
    },
  },
};
</script>
