<template>
  <div class="mb-2 flex">
    <router-link to="/">
      <img
        src="@/assets/images/netflix_logo_text.png"
        class="h-10 mt-5 ml-5"
        alt=""
        srcset=""
      />
    </router-link>

    <ul class="flex mt-5">
      <li>
        <router-link to="/movies" class="ml-5">Filmes</router-link>
      </li>
      <li>
        <router-link to="/actors" class="ml-5">Atores</router-link>
      </li>
      <li>
        <router-link to="/profile" class="ml-5">Perfil</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
ul {
  li {
    :hover {
      cursor: pointer;
      color: red;
    }
  }
}
</style>
