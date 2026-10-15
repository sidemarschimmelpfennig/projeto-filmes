<template>
  <div class="group flex flex-col h-full">
    <!-- Poster Card Container -->
    <NuxtLink
      :to="`/movie/${movie.id}`"
      class="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-[#0f172a] border border-white/[0.08] shadow-lg transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:shadow-emerald-500/15 group-hover:border-emerald-500/30 block"
    >
      <img
        :src="imagePath"
        :alt="movie.title"
        class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        loading="lazy"
      />

      <!-- Dark Gradient Vignette Overlay on Hover -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <!-- Play Button Overlay -->
        <div class="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 ml-0.5">
            <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
        </div>
      </div>

      <!-- Rating Badge (Top Right) -->
      <div class="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-lg backdrop-blur-md bg-black/70 border border-white/10 text-xs font-bold text-emerald-400 flex items-center gap-1 shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5 text-emerald-400">
          <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
        </svg>
        <span>{{ movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A' }}</span>
      </div>
    </NuxtLink>

    <!-- Movie Details -->
    <div class="mt-3 flex flex-col flex-1">
      <NuxtLink :to="`/movie/${movie.id}`">
        <h3
          class="font-semibold text-sm sm:text-base text-slate-100 truncate group-hover:text-emerald-400 transition-colors duration-150"
          :title="movie.title"
        >
          {{ movie.title }}
        </h3>
      </NuxtLink>

      <div class="flex items-center gap-2 mt-1 text-xs text-slate-400">
        <span v-if="movie.release_date" class="px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-300 font-medium">
          {{ movie.release_date.split('-')[0] }}
        </span>
        <span class="truncate text-slate-400">
          {{ genresList() }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieItens",
  props: {
    movie: {
      type: Object,
      required: true,
    },
    genres: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    imagePath() {
      return this.movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
        : "https://placehold.co/500x750?text=Sem+Poster";
    },
  },
  methods: {
    getGenreName(id) {
      if (!this.genres) return "";
      const genre = this.genres.find((g) => g.id === id);
      return genre ? genre.name : "";
    },
    genresList() {
      if (!this.movie.genre_ids) return "";
      return this.movie.genre_ids
        .map((id) => this.getGenreName(id))
        .filter(Boolean)
        .slice(0, 2)
        .join(", ");
    },
  },
};
</script>
