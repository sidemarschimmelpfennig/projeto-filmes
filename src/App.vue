<template>
  <div id="app">
    <div class="flex justify-between border-b border-gray-600">
      <NavbarComponent />
      <SearchbarComponent />
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
};
</script>

<style lang="scss"></style>
