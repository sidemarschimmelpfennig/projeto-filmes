<template>
  <div class="px-4 py-6">
    <h2 class="uppercase mt-5 text-yellow-600 text-lg mb-6 font-semibold">
      Atores Populares
    </h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
    >
      <div v-for="actor in actors" :key="actor.id" class="actor mt-8">
        <img
          :src="
            actor.profile_path
              ? 'https://image.tmdb.org/t/p/w500' + actor.profile_path
              : 'https://via.placeholder.com/500x750?text=Sem+Foto'
          "
          :alt="actor.name"
          class="hover:opacity-75 transition ease-in-out duration-150 rounded w-full object-cover"
        />
        <div class="mt-2">
          <span class="text-lg text-white font-semibold">{{ actor.name }}</span>
          <div class="text-sm truncate text-gray-400">
            {{ getKnownForList(actor.known_for) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actors: [],
    };
  },
  mounted() {
    this.fetchActors();
  },
  methods: {
    async fetchActors() {
      try {
        const response = await this.$axios.get(
          "/person/popular?language=pt-BR"
        );
        this.actors = response.data.results;
      } catch (error) {
        console.log(error.message);
      }
    },
    getKnownForList(knownFor) {
      if (!knownFor) return "";
      return knownFor.map(m => m.title || m.name).join(", ");
    },
  },
};
</script>

<style lang="scss" scoped></style>
