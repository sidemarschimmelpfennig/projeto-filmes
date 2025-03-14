<template>
  <div class="container mx-auto border-b border-gray-600 px-4 py-4">
    <h2 class="text-4xl font-semibold mb-5">Imagens</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="image in backdrops" :key="image.id" class="mr-3 mt-3">
        <img
          :src="backdropsImages(image)"
          alt=""
          class="hover:opacity-75 hover:cursor-pointer transition ease-in-out duration-150"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backdrops: {
      type: Object,
      required: true,
    },
  },
  data() {},
  methods: {
    backdropsImages(value) {
      if (value.file_path) {
        return "https://image.tmdb.org/t/p/w300/" + value.file_path;
      } else {
        return "https://placehold.co/300x450?text=Not+Found";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
