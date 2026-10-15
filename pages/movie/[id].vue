<template>
  <div class="space-y-12 pb-16">
    <!-- Movie Hero Section with Backdrop Blur -->
    <div class="relative w-full overflow-hidden bg-slate-950 border-b border-white/[0.08]">
      <!-- Background Blurred Backdrop Image -->
      <div
        v-if="movie.backdrop_path"
        class="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-20 scale-110"
        :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }"
      ></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start">
        <!-- Poster with Shadow -->
        <div class="w-56 sm:w-64 md:w-72 lg:w-80 flex-shrink-0">
          <img
            :src="imagePath"
            :alt="movie.title"
            class="w-full aspect-[2/3] object-cover rounded-2xl shadow-2xl shadow-black/80 border border-white/10"
          />
        </div>

        <!-- Details Info -->
        <div class="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
          <!-- Back Link -->
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-4 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Voltar para o catálogo
          </NuxtLink>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            {{ movie.title }}
          </h1>

          <p v-if="movie.tagline" class="text-sm italic text-emerald-400 mt-1 font-medium">
            "{{ movie.tagline }}"
          </p>

          <!-- Badges & Release Info -->
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4 text-sm text-slate-300">
            <span class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
              ★ {{ movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A' }}
            </span>

            <span v-if="movie.release_date" class="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 text-xs text-slate-200">
              {{ dateFormatter(movie.release_date) }}
            </span>

            <span v-if="movie.runtime" class="text-xs text-slate-400">
              {{ Math.floor(movie.runtime / 60) }}h {{ movie.runtime % 60 }}min
            </span>

            <div class="flex flex-wrap gap-1.5 ml-1">
              <span
                v-for="genre in movie.genres"
                :key="genre.id"
                class="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-xs font-medium"
              >
                {{ genre.name }}
              </span>
            </div>
          </div>

          <!-- Overview -->
          <div class="mt-6">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Sinopse
            </h3>
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {{ movie.overview || "Nenhuma sinopse disponível em português para este filme." }}
            </p>
          </div>

          <!-- Crew -->
          <div v-if="crews.length > 0" class="mt-6 w-full">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Elenco & Direção Principal
            </h3>
            <div class="flex flex-wrap justify-center md:justify-start gap-6">
              <div
                v-for="(crew, index) in crews.slice(0, 4)"
                :key="index"
                class="flex flex-col text-left"
              >
                <span class="font-semibold text-white text-sm">{{ crew.name }}</span>
                <span class="text-slate-400 text-xs">{{ crew.job }}</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap items-center gap-4 mt-8">
            <a
              v-if="youtubeVideo"
              :href="youtubeVideo"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold inline-flex items-center gap-2 shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
              Assistir Trailer
            </a>

            <button
              class="px-6 py-3 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 text-white font-semibold inline-flex items-center gap-2 transition-all duration-200 hover:scale-105"
              @click="toggleFavorite"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                :class="[
                  'w-5 h-5 transition-colors',
                  isFavorite ? 'text-rose-500 fill-rose-500' : 'text-slate-300'
                ]"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              {{ isFavorite ? "Favorito" : "Favoritar" }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cast & Gallery -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <CastComponent :casts="casts" />
      <ImagesComponent :backdrops="backdrops" />
    </div>
  </div>
</template>

<script>
export default {
  name: "MoviePage",
  data() {
    return {
      backdrops: [],
      movie: {
        videos: {
          results: [],
        },
      },
      casts: [],
      crews: [],
      isFavorite: false,
    };
  },
  computed: {
    imagePath() {
      return this.movie && this.movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
        : "https://placehold.co/500x750?text=Sem+Poster";
    },
    youtubeVideo() {
      if (
        this.movie &&
        this.movie.videos &&
        this.movie.videos.results &&
        this.movie.videos.results.length > 0
      ) {
        return `https://www.youtube.com/watch?v=${this.movie.videos.results[0].key}`;
      }
      return null;
    },
  },
  mounted() {
    this.getMovieDetails(this.$route.params.id);
    this.checkFavorite();
  },
  methods: {
    async getMovieDetails(idMovie) {
      if (!idMovie) return;
      try {
        const response = await this.$axios.get(
          `/movie/${idMovie}?append_to_response=videos,images,credits&language=pt-BR`
        );
        const responseAll = await this.$axios.get(
          `/movie/${idMovie}?append_to_response=videos,images,credits`
        );
        this.movie = response.data;
        if (responseAll.data.images && responseAll.data.images.backdrops) {
          this.backdrops = responseAll.data.images.backdrops.filter(
            (obj) => obj.iso_639_1 == undefined || obj.iso_639_1 === "pt"
          );
        }
        if (response.data.credits) {
          this.casts = response.data.credits.cast || [];
          this.crews = response.data.credits.crew || [];
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes do filme:", error);
      }
    },
    dateFormatter(date) {
      if (!date) return "";
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("pt-BR", options);
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      if (process.client) {
        try {
          const favorites = JSON.parse(localStorage.getItem("movie_favorites") || "[]");
          if (this.isFavorite) {
            if (!favorites.includes(this.movie.id)) favorites.push(this.movie.id);
          } else {
            const index = favorites.indexOf(this.movie.id);
            if (index > -1) favorites.splice(index, 1);
          }
          localStorage.setItem("movie_favorites", JSON.stringify(favorites));
        } catch (e) {
          console.error(e);
        }
      }
    },
    checkFavorite() {
      if (process.client && this.$route.params.id) {
        try {
          const favorites = JSON.parse(localStorage.getItem("movie_favorites") || "[]");
          this.isFavorite = favorites.includes(Number(this.$route.params.id));
        } catch (e) {
          console.error(e);
        }
      }
    },
  },
};
</script>
