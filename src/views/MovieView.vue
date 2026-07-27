<template>
  <div class="h-full teste">
    <div class="container mx-auto flex mt-20 border-b border-gray-600 pb-2">
      <img :src="imagePath" class="w-64" />
      <div class="ml-24">
        <h1 class="text-4xl font-semibold te mb-2">{{ movie.title }}</h1>
        <span class="text-gray-500 text-sm flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 text-yellow-500 fill-current mr-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>

          {{ movie.vote_average * 10 }}% |
          {{ dateFormatter(movie.release_date) }}
        </span>
        <span class="ml-2">
          <span v-for="(item, index) in movie.genres" :key="index">
            {{ item.name }}
            <span v-if="index < movie.genres.length - 1"> , </span>
          </span>
        </span>
        <p class="mt-5">
          {{ movie.overview }}
        </p>
        <div class="mt-5">
          <span class="mt-5 semi-bold">Elenco e Direção: </span>
          <div class="flex">
            <div v-for="(crew, index) in crews" :key="index">
              <div v-if="index < 2" class="flex flex-col mt-5 mr-5">
                <span>{{ crew.name }}</span>
                <span class="text-gray-500">{{ crew.job }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex mt-5">
          <a
            :href="youtubeVideo"
            target="blank"
            class="bg-yellow-600 px-5 py-2 rounded-sm mr-3 inline-flex text-black"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
              />
            </svg>
            Trailer</a
          >
          <a
            href="#"
            class="bg-yellow-600 px-5 py-2 rounded-sm mr-3 inline-flex text-black"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 text-red-600 solid fill-red-600 hover:fill-none"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            Desfavoritar</a
          >
        </div>
      </div>
    </div>
    <CastComponent :casts="casts" />
    <ImagesComponent :backdrops="backdrops" />
  </div>
</template>

<script>
import CastComponent from "@/components/CastComponent.vue";
import ImagesComponent from "@/components/ImagesComponent.vue";

export default {
  components: {
    CastComponent,
    ImagesComponent,
  },
  data() {
    return {
      backdrops: {},
      movie: {
        videos: {
          results: [],
        },
      },
      poster_path: "",
      casts: [],
      crews: [],
    };
  },
  computed: {
    imagePath() {
      return `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
    },
    youtubeVideo() {
      // Verifica se a lista de vídeos tem pelo menos um item
      if (this.movie.videos.results.length > 0) {
        return `https://www.youtube.com/embed/${this.movie.videos.results[0].key}`;
      }
      return null; // Retorna null se não houver vídeos
    },
  },
  mounted() {
    this.getMovieDetails(this.$route.params.id);
  },

  methods: {
    async getMovieDetails(idMovie) {
      try {
        const response = await this.$axios.get(
          `/movie/${idMovie}?append_to_response=videos,images,credits&language=pt-BR`
        );
        const responseAll = await this.$axios.get(
          `/movie/${idMovie}?append_to_response=videos,images,credits`
        );
        this.movie = response.data;
        this.backdrops = responseAll.data.images.backdrops.filter(
          obj => obj.iso_639_1 == undefined || obj.iso_639_1 === "pt"
        );
        this.casts = response.data.credits.cast;
        this.crews = response.data.credits.crew;
        console.log(responseAll);
      } catch (error) {
        console.error(error);
      }
    },
    dateFormatter(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("pt-BR", options);
    },
  },
};
</script>

<style lang="scss" scoped>
.teste {
  height: 100vh;
}
</style>
