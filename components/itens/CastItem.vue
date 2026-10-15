<template>
  <div class="cast-item"></div>
</template>

<script>
export default {
  name: "CastItem",
  props: {
    cast: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped></style>
