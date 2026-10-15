<template>
  <div class="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
    <!-- Sticky Glass Header -->
    <header class="sticky top-0 z-50 backdrop-blur-xl bg-[#090d16]/90 border-b border-white/[0.08] transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20 gap-4">
        <NavbarComponent />
        <div class="flex items-center gap-3">
          <SearchbarComponent />
          <NuxtLink
            to="/favorites"
            class="relative p-2.5 rounded-full bg-white/[0.05] hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition"
            title="Favoritos"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-rose-500 fill-rose-500/20" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </NuxtLink>
          <div class="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-emerald-600/30">
            S
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Modern Footer -->
    <footer class="mt-24 border-t border-white/[0.08] bg-[#060910] py-12 text-slate-400 text-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3h-15Zm3 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm9-6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
          </div>
          <span class="font-extrabold text-xl text-white tracking-tight">Side<span class="text-emerald-400">Filmes</span></span>
        </div>

        <div class="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
          <NuxtLink to="/" class="hover:text-emerald-400 transition">Filmes</NuxtLink>
          <NuxtLink to="/series" class="hover:text-emerald-400 transition">Séries</NuxtLink>
          <NuxtLink to="/actors" class="hover:text-emerald-400 transition">Pessoas</NuxtLink>
          <NuxtLink to="/favorites" class="hover:text-emerald-400 transition">Favoritos</NuxtLink>
        </div>

        <p class="text-xs text-slate-500 text-center md:text-right">
          © {{ new Date().getFullYear() }} SideFilmes. Dados fornecidos por <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" class="text-emerald-400 hover:underline">TMDB</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
};
</script>
