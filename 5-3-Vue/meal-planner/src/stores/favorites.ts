import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { FavoriteMeal } from '@/types'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<FavoriteMeal[]>([])

  function addFavorite(name: string) {
    // Evitamos duplicados
    const exists = favorites.value.some(
      f => f.name.toLowerCase() === name.toLowerCase()
    )

    if (!exists) {
      favorites.value.push({
        id: crypto.randomUUID(),
        name: name.trim()
      })
    }
  }

  function removeFavorite(id: string) {
    const index = favorites.value.findIndex(f => f.id === id)
    if (index !== -1) {
      favorites.value.splice(index, 1)
    }
  }

  return {
    favorites,
    addFavorite,
    removeFavorite
  }
})