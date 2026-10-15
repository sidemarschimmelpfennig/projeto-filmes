<template>
  <div class="relative" ref="searchContainer">
    <div class="relative flex items-center">
      <input
        v-model="searchQuery"
        type="text"
        class="w-44 sm:w-60 md:w-72 h-10 pl-10 pr-8 rounded-full bg-white/[0.06] border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-500/60 focus:bg-white/[0.1] focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
        placeholder="Buscar filmes, séries, pessoas..."
        @keyup.enter="handleSearch"
      />
      <!-- Search Icon -->
      <div class="absolute left-3.5 pointer-events-none text-slate-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="w-4 h-4"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
      <!-- Clear button -->
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute right-3 text-slate-400 hover:text-white transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Quick Search Results Dropdown -->
    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="searchQuery && searchResults.length > 0"
        class="absolute right-0 top-12 z-50 rounded-2xl bg-[#0f172a]/95 backdrop-blur-xl w-72 sm:w-80 shadow-2xl border border-white/10 max-h-96 overflow-y-auto divide-y divide-white/[0.06]"
      >
        <div
          v-for="movie in searchResults"
          :key="movie.id"
          class="flex items-center p-3 hover:bg-white/10 cursor-pointer transition group"
          @click="goToMovie(movie.id)"
        >
          <img
            class="w-10 h-14 object-cover rounded-lg flex-shrink-0 shadow group-hover:scale-105 transition"
            :src="
              movie.poster_path
                ? 'https://image.tmdb.org/t/p/w92' + movie.poster_path
                : '/images/Coringa.jpg'
            "
            :alt="movie.title"
          />
          <div class="ml-3 overflow-hidden flex-1">
            <span class="text-sm font-medium text-white block truncate group-hover:text-emerald-400 transition">
              {{ movie.title }}
            </span>
            <div class="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span v-if="movie.release_date">
                {{ movie.release_date.split('-')[0] }}
              </span>
              <span v-if="movie.vote_average" class="flex items-center text-amber-400 font-semibold">
                ★ {{ movie.vote_average.toFixed(1) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SearchbarComponent",
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      debounceTimeout: null,
    };
  },
  watch: {
    searchQuery(newVal) {
      if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
      if (!newVal || newVal.trim().length < 2) {
        this.searchResults = [];
        return;
      }
      this.debounceTimeout = setTimeout(() => {
        this.searchMovies(newVal.trim());
      }, 300);
    },
  },
  mounted() {
    if (process.client) {
      document.addEventListener("click", this.handleClickOutside);
    }
  },
  beforeUnmount() {
    if (process.client) {
      document.removeEventListener("click", this.handleClickOutside);
    }
  },
  methods: {
    handleClickOutside(e) {
      if (this.$refs.searchContainer && !this.$refs.searchContainer.contains(e.target)) {
        this.searchResults = [];
      }
    },
    async searchMovies(query) {
      try {
        const response = await this.$axios.get(
          `/search/multi?query=${encodeURIComponent(query)}&language=pt-BR`
        );
        this.searchResults = (response.data.results || [])
          .filter((item) => item.media_type === "movie" || item.media_type === "tv")
          .map((item) => ({
            ...item,
            title: item.title || item.name,
            release_date: item.release_date || item.first_air_date,
          }))
          .slice(0, 7);
      } catch (err) {
        console.error("Erro na busca:", err);
      }
    },
    goToMovie(id) {
      this.searchResults = [];
      this.searchQuery = "";
      this.$router.push(`/movie/${id}`);
    },
    clearSearch() {
      this.searchQuery = "";
      this.searchResults = [];
    },
    handleSearch() {
      if (this.searchResults.length > 0) {
        this.goToMovie(this.searchResults[0].id);
      }
    },
  },
};
</script>
