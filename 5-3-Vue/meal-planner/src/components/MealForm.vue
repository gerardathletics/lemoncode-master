<script setup lang="ts">
import { ref } from 'vue'
import { DAYS_OF_WEEK, type DayOfWeek } from '@/types'; 
import { useMealsStore } from '@/stores/meals';
import { useFavoritesStore } from '@/stores/favorites';

const mealsStore = useMealsStore()
const favoritesStore = useFavoritesStore()

// Estado local
const mealName = ref('')
const selectedDay = ref<DayOfWeek | null>(null)
const saveAsFavorite = ref(false)


function handleSubmit() {
  // Nada si el nombre esta vacio
  if (!mealName.value.trim()) return

  // Store
  mealsStore.addMeal(mealName.value, selectedDay.value!)

  if (saveAsFavorite.value) {
    favoritesStore.addFavorite(mealName.value)
  }

  // Reset del nombre
  mealName.value = ''

}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="p-6 bg-white rounded-xl shadow-md">
    <h2 class="mb-4 text-lg font-semibold text-gray-700">➕ Añadir Plato</h2>

    <div class="flex flex-col gap-4 sm:flex-row">
      <!-- Input del nombre -->
      <div class="flex-1">
        <label for="meal-name" class="block mb-1 text-sm font-medium text-gray-600">
          Nombre del plato
        </label>
        <input
          id="meal-name"
          v-model="mealName"
          type="text"
          placeholder="Ej: albóndigas"
          class="px-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
      </div>

      <!-- Select del día -->
      <div class="sm:w-48">
        <label for="day-select" class="block mb-1 text-sm font-medium text-gray-600">
          Día
        </label>
        <select
          id="day-select"
          v-model="selectedDay"
          class="px-4 py-2 w-full capitalize rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        >
          <option v-for="day in DAYS_OF_WEEK" :key="day" :value="day">
            {{ day }}
          </option>
        </select>
      </div>

      <div class="sm:self-end">
        <button
          type="submit"
          class="px-6 py-2 w-full font-medium text-white bg-emerald-500 rounded-lg transition-colors sm:w-auto hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!mealName.trim()"
        >
          Agregar
        </button>
      </div>
    </div>

    <div class="mt-4">
      <label class="flex gap-2 items-center cursor-pointer">
        <input
          v-model="saveAsFavorite"
          type="checkbox"
          class="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
        />
        <span class="text-sm text-gray-600">Guardar como favorito</span>
      </label>
    </div>
  </form>
</template>
