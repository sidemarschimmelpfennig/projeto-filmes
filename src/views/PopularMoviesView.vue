<template>
  <div class="px-4 py-6">
    <!-- Categoria seleção -->
    <div class="mb-8">
      <h3
        class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3"
      >
        Categorias
      </h3>
      <div class="flex flex-wrap gap-2">
        <button
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition duration-150 ease-in-out border',
            selectedGenreId === null
              ? 'bg-yellow-600 border-yellow-600 text-white shadow-lg shadow-yellow-600/30'
              : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white',
          ]"
          @click="selectGenre(null)"
        >
          Todos
        </button>
        <button
          v-for="genre in genres"
          :key="genre.id"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition duration-150 ease-in-out border',
            selectedGenreId === genre.id
              ? 'bg-yellow-600 border-yellow-600 text-white shadow-lg shadow-yellow-600/30'
              : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white',
          ]"
          @click="selectGenre(genre.id)"
        >
          {{ genre.name }}
        </button>
      </div>
    </div>

    <h2 class="uppercase mt-5 text-yellow-600 text-lg mb-6 font-semibold">
      {{ selectedGenreId === null ? "Filmes em Alta" : getSelectedGenreName() }}
    </h2>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
    >
      <movie-itens
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :genres="genres"
      />
    </div>

    <!-- Paginação -->
    <div class="flex justify-center items-center gap-4 mt-12 mb-8">
      <button
        :disabled="currentPage <= 1"
        class="px-4 py-2 rounded bg-gray-800 border border-gray-700 text-gray-300 font-medium hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        @click="changePage(currentPage - 1)"
      >
        Anterior
      </button>
      <span class="text-gray-400 font-medium">
        Página {{ currentPage }} de {{ totalPages }}
      </span>
      <button
        :disabled="currentPage >= totalPages"
        class="px-4 py-2 rounded bg-gray-800 border border-gray-700 text-gray-300 font-medium hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
        @click="changePage(currentPage + 1)"
      >
        Próximo
      </button>
    </div>
  </div>
</template>

<script>
import MovieItens from "@/components/itens/MovieItens.vue";

export default {
  components: {
    MovieItens,
  },
  data() {
    return {
      movies: [],
      genres: [],
      selectedGenreId: null,
      currentPage: 1,
      totalPages: 1,
    };
  },
  mounted() {
    this.fetchMovies();
    this.fetchGenres();
  },
  methods: {
    async fetchMovies() {
      try {
        let url = `/movie/popular?language=pt-BR&page=${this.currentPage}`;
        if (this.selectedGenreId !== null) {
          url = `/discover/movie?language=pt-BR&with_genres=${this.selectedGenreId}&page=${this.currentPage}`;
        }
        const response = await this.$axios.get(url);
        this.movies = response.data.results;
        this.totalPages = Math.min(response.data.total_pages, 500);
      } catch (error) {
        console.log(error.message);
      }
    },
    async fetchGenres() {
      try {
        const response = await this.$axios.get(
          "/genre/movie/list?language=pt-BR"
        );
        this.genres = response.data.genres;
      } catch (error) {
        console.log(error.message);
      }
    },
    selectGenre(genreId) {
      this.selectedGenreId = genreId;
      this.currentPage = 1;
      this.fetchMovies();
    },
    getSelectedGenreName() {
      const genre = this.genres.find(g => g.id === this.selectedGenreId);
      return genre ? genre.name : "Filmes";
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchMovies();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
