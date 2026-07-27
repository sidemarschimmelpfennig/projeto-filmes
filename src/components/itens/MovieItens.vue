<template>
  <div>
    <router-link :to="`/movie/${movie.id}`">
      <img
        :src="imagePath"
        class="hover:opacity-75 hover:cursor-pointer transition ease-in-out duration-150"
      />
    </router-link>

    <h3>{{ movie.title }}</h3>
    <div class="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="fill-current text-yellow-500 w-4"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        data-name="star"
      >
        <path
          d="M12 2L15 8L22 9L17 14L18 21L12 17L6 21L7 14L2 9L9 8L12 2Z"
          data-name="star"
        />
      </svg>

      {{ (movie.vote_average * 10).toFixed(2) }} % | {{ movie.release_date }}
      <br />
    </div>
    <span class="text-sm text-gray-500">
      {{ genresList() }}
      <!-- Chama a função para mostrar os gêneros -->
    </span>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
    genres: {
      type: Array,
      required: true,
    },
  },
  computed: {
    imagePath() {
      return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
    },
  },
  methods: {
    getGenreName(id) {
      const genre = this.genres.find(g => g.id === id);
      return genre ? genre.name : "";
    },

    genresList() {
      return this.movie.genre_ids
        .map((id, index) => {
          const genreName = this.getGenreName(id);
          if (genreName) {
            return index < this.movie.genre_ids.length - 1
              ? genreName + ","
              : genreName;
          }
          return "";
        })
        .join(" ");
    },
  },
};
</script>

<style lang="scss" scoped></style>
