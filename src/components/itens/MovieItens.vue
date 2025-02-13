<template>
  <div>
    <router-link to="/movie/11">
      <img
        src="@/assets/images/Coringa.jpg"
        class="hover:opacity-75 hover:cursor-pointer transition ease-in-out duration-150"
      />
    </router-link>

    <h3>2067</h3>
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

      47% | 2020-10-01 <br />
    </div>
    <span class="text-sm text-gray-500"
      >Ficção Cientifica, Thriller, Drama</span
    >
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
