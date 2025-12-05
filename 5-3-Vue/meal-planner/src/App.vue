<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-md">
      <div class="container px-4 mx-auto">
        <div class="flex justify-between items-center h-16">
          <h1 class="text-xl font-bold text-emerald-600">🍽️ Meal Planner</h1>

          <div class="flex gap-2">
            <RouterLink
              to="/"
              class="px-4 py-2 rounded-lg transition-colors hover:bg-gray-100"
              active-class="text-emerald-700 bg-emerald-100"
            >
              📅 Plan Semanal
            </RouterLink>

            <RouterLink
              to="/favorites"
              class="px-4 py-2 rounded-lg transition-colors hover:bg-gray-100"
              active-class="text-emerald-700 bg-emerald-100"
            >
              ⭐ Favoritos
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <main class="container px-4 py-8 mx-auto">
      <RouterView />
    </main>
  </div>
</template>