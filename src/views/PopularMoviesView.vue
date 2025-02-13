<template>
  <div class="">
    <h2 class="uppercase mt-5 text-yellow-600 text-lg">Filmes em Alta</h2>

    <div
      class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8"
    >
      <movie-itens />
      <movie-itens />
      <movie-itens />
      <movie-itens />
    </div>
  </div>
</template>

<script>
import MovieItens from "@/components/itens/MovieItens.vue";

export default {
  components: {
    MovieItens,
  },
};
</script>

<style lang="scss" scoped></style>
