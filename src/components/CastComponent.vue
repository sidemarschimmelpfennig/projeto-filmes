<template>
  <div class="container mx-auto border-b border-gray-600 px-4 py-4">
    <h2 class="text-4xl font-semibold mb-5">Elenco</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="cast in casts" :key="cast.id" class="mr-3">
        <img
          :src="castProfileImage(cast)"
          alt=""
          class="hover:opacity-75 hover:cursor-pointer transition ease-in-out duration-150"
        />
        <span class="text-gray-400">{{ cast.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    casts: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    console.log(this.casts);
  },
  methods: {
    castProfileImage(value) {
      if (value.profile_path) {
        return "https://image.tmdb.org/t/p/w300/" + value.profile_path;
      } else {
        return "https://placehold.co/300x450?text=Not+Found";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
