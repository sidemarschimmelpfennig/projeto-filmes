<template>
  <div class="space-y-12">
    <!-- 1. Hero Discovery Section (Exatamente como o mockup CineScope/SideFilmes) -->
    <section class="relative w-full py-16 sm:py-24 overflow-hidden border-b border-white/[0.08]">
      <!-- Background Posters Mosaic Pattern with Dark Fade -->
      <div class="absolute inset-0 opacity-15 pointer-events-none overflow-hidden flex flex-wrap gap-4 -m-8 filter blur-[1px]">
        <div
          v-for="(bgMovie, idx) in backdropSampleMovies"
          :key="idx"
          class="w-36 sm:w-44 h-56 sm:h-64 rounded-xl bg-cover bg-center flex-shrink-0"
          :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w342${bgMovie.poster_path})` }"
        ></div>
      </div>
      <!-- Dark Radial and Linear Gradient Overlays -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#090d16]/70 via-[#090d16]/90 to-[#090d16]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0,transparent_70%)]"></div>

      <!-- Hero Content -->
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Milhões de Filmes, Séries e Pessoas para Descobrir.
        </h1>
        <p class="text-emerald-400 font-semibold text-lg sm:text-xl">
          Explore já.
        </p>

        <!-- Centered Search Bar -->
        <div class="relative max-w-2xl mx-auto pt-2">
          <form @submit.prevent="submitHeroSearch" class="relative flex items-center">
            <input
              v-model="heroSearchInput"
              type="text"
              class="w-full h-14 pl-6 pr-16 rounded-full bg-slate-900/90 border border-white/15 text-white placeholder-slate-400 text-base shadow-2xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 backdrop-blur-md transition-all duration-200"
              placeholder="Buscar filmes, séries, pessoas..."
            />
            <button
              type="submit"
              class="absolute right-2.5 w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 transition-transform active:scale-95"
              title="Buscar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </form>
        </div>

        <!-- Quick Filter Pills -->
        <div class="flex flex-wrap items-center justify-center gap-2 pt-2 text-sm">
          <button
            @click="setTab('movies')"
            :class="[
              'px-4 py-1.5 rounded-full font-medium transition-all duration-200',
              currentTab === 'movies'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'bg-white/[0.05] hover:bg-white/10 text-slate-300 border border-white/10'
            ]"
          >
            Filmes
          </button>
          <button
            @click="setTab('series')"
            :class="[
              'px-4 py-1.5 rounded-full font-medium transition-all duration-200',
              currentTab === 'series'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'bg-white/[0.05] hover:bg-white/10 text-slate-300 border border-white/10'
            ]"
          >
            Séries
          </button>
          <NuxtLink
            to="/actors"
            class="px-4 py-1.5 rounded-full font-medium bg-white/[0.05] hover:bg-white/10 text-slate-300 border border-white/10 transition-all duration-200"
          >
            Pessoas
          </NuxtLink>
          <NuxtLink
            to="/favorites"
            class="px-4 py-1.5 rounded-full font-medium bg-white/[0.05] hover:bg-white/10 text-slate-300 border border-white/10 transition-all duration-200"
          >
            Favoritos
          </NuxtLink>

          <!-- Categorias dropdown trigger -->
          <div class="relative inline-block text-left" ref="genreDropdown">
            <button
              @click="showGenreMenu = !showGenreMenu"
              class="px-4 py-1.5 rounded-full font-medium bg-white/[0.05] hover:bg-white/10 text-slate-300 border border-white/10 inline-flex items-center gap-1.5 transition"
            >
              <span>{{ selectedGenreId === null ? 'Categorias' : getSelectedGenreName() }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>

            <!-- Categorias Popover Dropdown -->
            <div
              v-if="showGenreMenu"
              class="absolute left-1/2 -translate-x-1/2 mt-2 w-64 rounded-2xl bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 shadow-2xl p-2 z-50 max-h-72 overflow-y-auto grid grid-cols-2 gap-1 text-xs"
            >
              <button
                @click="selectGenre(null)"
                :class="[
                  'px-3 py-1.5 rounded-lg text-left transition',
                  selectedGenreId === null ? 'bg-emerald-500 text-white font-semibold' : 'text-slate-300 hover:bg-white/10'
                ]"
              >
                Todos
              </button>
              <button
                v-for="g in genres"
                :key="g.id"
                @click="selectGenre(g.id)"
                :class="[
                  'px-3 py-1.5 rounded-lg text-left truncate transition',
                  selectedGenreId === g.id ? 'bg-emerald-500 text-white font-semibold' : 'text-slate-300 hover:bg-white/10'
                ]"
              >
                {{ g.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Wide Highlights Banners ("Em Alta") -->
    <section v-if="featuredList.length > 0 && selectedGenreId === null" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          Em Alta no Cinema
        </h2>
        <span class="text-xs text-slate-400">Destaques da semana</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div
          v-for="item in featuredList.slice(0, 4)"
          :key="item.id"
          class="group relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-lg hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
        >
          <img
            :src="item.backdrop_path ? `https://image.tmdb.org/t/p/w780${item.backdrop_path}` : `https://image.tmdb.org/t/p/w500${item.poster_path}`"
            :alt="item.title || item.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out brightness-90"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

          <div class="absolute inset-0 p-4 flex flex-col justify-end">
            <span class="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              {{ item.vote_average ? `★ ${item.vote_average.toFixed(1)}` : 'Destaque' }}
            </span>
            <h3 class="text-base font-bold text-white line-clamp-1 drop-shadow">
              {{ item.title || item.name }}
            </h3>
            <div class="mt-2 flex items-center justify-between">
              <span class="text-xs text-slate-300">
                {{ (item.release_date || item.first_air_date || '').split('-')[0] }}
              </span>
              <NuxtLink
                :to="`/movie/${item.id}`"
                class="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold shadow transition"
              >
                Explorar
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Main Catalog Section with Tabs & Filters -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6" ref="catalogSection">
      <!-- Section Navigation Bar (Tabs like mockup) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <!-- Tabs -->
        <div class="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            @click="setTab('movies')"
            :class="[
              'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200',
              currentTab === 'movies' && selectedGenreId === null
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            ]"
          >
            Filmes Populares
          </button>
          <button
            @click="setTab('top_rated')"
            :class="[
              'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200',
              currentTab === 'top_rated'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            ]"
          >
            Mais Votados
          </button>
          <button
            @click="setTab('series')"
            :class="[
              'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200',
              currentTab === 'series'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-105'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            ]"
          >
            Séries
          </button>
        </div>

        <!-- Current Status & Active filter indicator -->
        <div class="flex items-center gap-3 text-xs text-slate-400">
          <span v-if="selectedGenreId !== null" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Gênero: {{ getSelectedGenreName() }}
            <button @click="selectGenre(null)" class="hover:text-white ml-1">✕</button>
          </span>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
        <div v-for="n in 10" :key="n" class="animate-pulse flex flex-col space-y-3">
          <div class="aspect-[2/3] bg-white/[0.06] rounded-2xl"></div>
          <div class="h-4 bg-white/[0.06] rounded w-3/4"></div>
          <div class="h-3 bg-white/[0.06] rounded w-1/2"></div>
        </div>
      </div>

      <!-- Movies / TV Grid (5 Colunas) -->
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6"
      >
        <MovieItens
          v-for="item in items"
          :key="item.id"
          :movie="formatItem(item)"
          :genres="genres"
        />
      </div>

      <!-- Pagination -->
      <div class="flex justify-center items-center gap-3 pt-6 pb-6">
        <button
          :disabled="currentPage <= 1 || loading"
          class="px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-200 text-sm font-medium hover:bg-white/10 hover:border-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
          @click="changePage(currentPage - 1)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Anterior
        </button>

        <div class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <span class="text-sm font-bold text-white px-2">
            {{ currentPage }}
          </span>
          <span class="text-slate-500 text-sm">/</span>
          <span class="text-sm text-slate-400 px-2">
            {{ totalPages }}
          </span>
        </div>

        <button
          :disabled="currentPage >= totalPages || loading"
          class="px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-200 text-sm font-medium hover:bg-white/10 hover:border-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
          @click="changePage(currentPage + 1)"
        >
          Próximo
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>
    </section>

    <!-- 4. "Pessoas & Celebridades em Alta" (Carrossel / Linha como o mockup) -->
    <section v-if="popularPeople.length > 0" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
      <div class="flex items-center justify-between border-b border-white/[0.08] pb-4">
        <h2 class="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          Pessoas & Celebridades em Alta
        </h2>
        <NuxtLink to="/actors" class="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition">
          Ver todas as pessoas →
        </NuxtLink>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        <div
          v-for="person in popularPeople.slice(0, 6)"
          :key="person.id"
          class="group flex flex-col items-center text-center p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all duration-300"
        >
          <div class="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
            <img
              :src="person.profile_path ? `https://image.tmdb.org/t/p/w300${person.profile_path}` : 'https://placehold.co/300x300?text=Sem+Foto'"
              :alt="person.name"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <span class="mt-3 text-sm font-semibold text-white truncate max-w-full group-hover:text-emerald-400 transition">
            {{ person.name }}
          </span>
          <span class="text-xs text-slate-400 truncate max-w-full mt-0.5">
            {{ getKnownFor(person.known_for) }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      items: [],
      featuredList: [],
      backdropSampleMovies: [],
      genres: [],
      popularPeople: [],
      selectedGenreId: null,
      currentTab: "movies", // 'movies' | 'top_rated' | 'series'
      currentPage: 1,
      totalPages: 1,
      loading: false,
      heroSearchInput: "",
      showGenreMenu: false,
    };
  },
  mounted() {
    this.fetchCatalog();
    this.fetchGenres();
    this.fetchPeople();
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
      if (this.$refs.genreDropdown && !this.$refs.genreDropdown.contains(e.target)) {
        this.showGenreMenu = false;
      }
    },
    async fetchCatalog() {
      this.loading = true;
      try {
        let endpoint = "";
        if (this.currentTab === "movies") {
          endpoint = this.selectedGenreId
            ? `/discover/movie?language=pt-BR&with_genres=${this.selectedGenreId}&page=${this.currentPage}`
            : `/movie/popular?language=pt-BR&page=${this.currentPage}`;
        } else if (this.currentTab === "top_rated") {
          endpoint = `/movie/top_rated?language=pt-BR&page=${this.currentPage}`;
        } else if (this.currentTab === "series") {
          endpoint = this.selectedGenreId
            ? `/discover/tv?language=pt-BR&with_genres=${this.selectedGenreId}&page=${this.currentPage}`
            : `/tv/popular?language=pt-BR&page=${this.currentPage}`;
        }

        const response = await this.$axios.get(endpoint);
        const results = response.data.results || [];
        this.items = results;
        this.totalPages = Math.min(response.data.total_pages || 1, 500);

        if (this.featuredList.length === 0 && results.length > 0) {
          this.featuredList = results.slice(0, 4);
          this.backdropSampleMovies = results.slice(0, 14);
        }
      } catch (error) {
        console.error("Erro ao buscar catálogo:", error.message);
      } finally {
        this.loading = false;
      }
    },
    async fetchGenres() {
      try {
        const response = await this.$axios.get(
          "/genre/movie/list?language=pt-BR"
        );
        this.genres = response.data.genres || [];
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error.message);
      }
    },
    async fetchPeople() {
      try {
        const response = await this.$axios.get(
          "/person/popular?language=pt-BR"
        );
        this.popularPeople = response.data.results || [];
      } catch (error) {
        console.error("Erro ao buscar pessoas:", error.message);
      }
    },
    setTab(tab) {
      this.currentTab = tab;
      this.currentPage = 1;
      this.selectedGenreId = null;
      this.fetchCatalog();
    },
    selectGenre(genreId) {
      this.selectedGenreId = genreId;
      this.showGenreMenu = false;
      this.currentPage = 1;
      this.fetchCatalog();
      this.scrollToCatalog();
    },
    getSelectedGenreName() {
      const g = this.genres.find((item) => item.id === this.selectedGenreId);
      return g ? g.name : "Filmes";
    },
    formatItem(item) {
      return {
        ...item,
        title: item.title || item.name,
        release_date: item.release_date || item.first_air_date,
      };
    },
    getKnownFor(knownFor) {
      if (!knownFor || knownFor.length === 0) return "Ator / Atriz";
      return knownFor[0].title || knownFor[0].name || "Celebridade";
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchCatalog();
        this.scrollToCatalog();
      }
    },
    scrollToCatalog() {
      if (process.client && this.$refs.catalogSection) {
        this.$refs.catalogSection.scrollIntoView({ behavior: "smooth" });
      }
    },
    submitHeroSearch() {
      if (this.heroSearchInput && this.heroSearchInput.trim()) {
        const query = this.heroSearchInput.trim();
        this.$router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    },
  },
};
</script>
