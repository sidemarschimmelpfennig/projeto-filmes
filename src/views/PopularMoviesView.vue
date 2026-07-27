<template>
  <div class="">
    <h2 class="uppercase mt-5 text-yellow-600 text-lg">Filmes em Alta</h2>

    <div
      class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8"
    >
      <movie-itens
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :genres="genres"
      />
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
    };
  },
  mounted() {
    this.fetchMovies();
    this.fetchGenres();
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await this.$axios.get("/movie/popular?language=pt-BR");
        this.movies = response.data.results;
      } catch (error) {
        console.log(error.message);
      }
    },
    async fetchGenres() {
      try {
        const response = await this.$axios.get("/genre/movie/list");
        this.genres = response.data.genres;
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
