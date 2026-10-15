<template>
  <div class="flex items-center gap-6 lg:gap-10">
    <!-- Brand Logo -->
    <NuxtLink to="/" class="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-105">
      <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3h-15Zm3 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm9-6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </div>
      <span class="text-2xl font-extrabold text-white tracking-tight">
        Side<span class="text-emerald-400">Filmes</span>
      </span>
    </NuxtLink>

    <!-- Navigation links -->
    <nav class="hidden md:flex items-center gap-1">
      <NuxtLink
        to="/"
        :class="[
          'px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
          $route.path === '/'
            ? 'text-white bg-white/10 shadow-sm'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        ]"
      >
        Filmes
      </NuxtLink>
      <NuxtLink
        to="/series"
        :class="[
          'px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
          $route.path === '/series'
            ? 'text-white bg-white/10 shadow-sm'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        ]"
      >
        Séries
      </NuxtLink>
      <NuxtLink
        to="/actors"
        :class="[
          'px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
          $route.path === '/actors'
            ? 'text-white bg-white/10 shadow-sm'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        ]"
      >
        Pessoas
      </NuxtLink>
      <NuxtLink
        to="/favorites"
        :class="[
          'px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
          $route.path === '/favorites'
            ? 'text-white bg-white/10 shadow-sm'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        ]"
      >
        Favoritos
      </NuxtLink>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavbarComponent",
};
</script>
