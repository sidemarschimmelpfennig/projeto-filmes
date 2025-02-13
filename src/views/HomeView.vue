<template>
  <div class="container mx-auto">
    <PopularMoviesView />
  </div>
</template>

<script>
import PopularMoviesView from "@/views/PopularMoviesView.vue";

export default {
  name: "HomeView",
  components: {
    PopularMoviesView,
  },
};
</script>

<style scoped lang="scss"></style>
