<template>
  <div id="app">
    <div class="flex justify-between border-b border-gray-600">
      <NavbarComponent />
      <SearchbarComponent class="mr-5" />
    </div>
    <router-view />
  </div>
</template>
<script>
import NavbarComponent from "@/components/header/NavbarComponent.vue";
import SearchbarComponent from "@/components/header/SearchbarComponent.vue";
export default {
  name: "App",
  components: {
    NavbarComponent,
    SearchbarComponent,
  },
  created() {
    document.title = "Cinema do Detalhe";
    document
      .querySelector("link[rel='icon']")
      .setAttribute("href", "/img/icons/favicon.ico");
  },
};
</script>

<style lang="scss"></style>
