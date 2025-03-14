<template>
  <div class="flex mt-5 relative">
    <input
      type="text"
      class="rounded-full bg-gray-600 px-7 w-50 h-10 mr-3 focus:outline-none focus:outline-shawod"
      placeholder="Buscar..."
    />
    <div class="absolute top-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-6 w-4 mt-2 ml-2 text-gray-300"
      >
        <path
          fill-rule="evenodd"
          d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div class="absolute mt-12 ml-2 rounded bg-gray-600 w-52" v-if="false">
      <ul class="mt-3">
        <li class="flex items-center p-1 border-b border-gray-500">
          <img class="w-10 mr-3" src="@/assets/images/Coringa.jpg" alt="" />
          <span class="">Coringa</span>
        </li>
      </ul>
    </div>
    <img src="@/assets/images/avatar.png" class="h-10 rounded-full" alt="" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
