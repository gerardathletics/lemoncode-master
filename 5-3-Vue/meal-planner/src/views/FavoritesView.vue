<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites'

const favoritesStore = useFavoritesStore()
</script>

<template>
  <div>
    <h2 class="mb-6 text-2xl font-bold text-gray-800">⭐ Platos Favoritos</h2>

    <div v-if="favoritesStore.favorites.length > 0" class="space-y-3">
      <div
        v-for="favorite in favoritesStore.favorites"
        :key="favorite.id"
        class="flex justify-between items-center p-4 bg-white rounded-xl shadow-md"
      >
        <span class="font-medium text-gray-700">{{ favorite.name }}</span>

        <button
          @click="favoritesStore.removeFavorite(favorite.id)"
          class="px-3 py-1 text-sm text-red-600 bg-red-100 rounded-lg transition-colors hover:bg-red-200"
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>

    <div v-else class="p-8 text-center bg-white rounded-xl shadow-md">
      <p class="text-lg text-gray-500">Aún no tienes platos favoritos</p>
      <p class="mt-2 text-sm text-gray-400">
        Marca "Guardar también como favorito" al añadir un plato
      </p>
    </div>
  </div>
</template>