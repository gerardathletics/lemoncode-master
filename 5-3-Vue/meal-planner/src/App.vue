<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <nav class="bg-white border-b border-slate-200">
      <div class="container px-6 mx-auto">
        <div class="flex justify-between items-center h-14">
          <div class="flex items-center gap-2">
            <span class="text-lg">🍽️</span>
            <span class="text-lg font-bold text-slate-800">Meal<span class="font-normal">Planner</span></span>
          </div>

          <div class="flex gap-1">
            <RouterLink
              to="/"
              class="px-4 py-2 text-sm text-slate-600 rounded-lg transition-colors hover:bg-slate-100"
              active-class="!text-slate-800 font-medium"
            >
              Plan Semanal
            </RouterLink>

            <RouterLink
              to="/favorites"
              class="px-4 py-2 text-sm text-slate-600 rounded-lg transition-colors hover:bg-slate-100"
              active-class="!text-slate-800 font-medium"
            >
              Favoritos
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <main class="container px-6 py-8 mx-auto">
      <RouterView />
    </main>
  </div>
</template>