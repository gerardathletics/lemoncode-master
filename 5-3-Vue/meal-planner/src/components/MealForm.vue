<script setup lang="ts">
import { ref, computed } from 'vue'
import { DAYS_OF_WEEK, MEAL_CATEGORIES, CATEGORY_LABELS } from '@/constants'
import type { DayOfWeek, MealCategory } from '@/types' 
import { useMealsStore } from '@/stores/meals';
import { useFavoritesStore } from '@/stores/favorites';

const mealsStore = useMealsStore()
const favoritesStore = useFavoritesStore()

// Estado local
const mealName = ref('')
const selectedDay = ref<DayOfWeek | null>(null)
const selectedCategory = ref<MealCategory | null>(null)
const saveAsFavorite = ref(false)
const showFavorites = ref(false)
const showCategories = ref(false)
const showDays = ref(false)

const sortedFavorites = computed(() => {
  return [...favoritesStore.favorites].sort((a, b) => a.name.localeCompare(b.name))
})

function selectFavorite(name: string) {
  mealName.value = name
  showFavorites.value = false
}

function selectDay(day: DayOfWeek) {
  selectedDay.value = day
  showDays.value = false
}

function selectCategory(category: MealCategory) {
  selectedCategory.value = category
  showCategories.value = false
}

function handleCategoryBlur() {
  setTimeout(() => {
    showCategories.value = false
  }, 200)
}

function handleBlur() {
  setTimeout(() => {
    showFavorites.value = false
  }, 200)
}

function handleDayBlur() {
  setTimeout(() => {
    showDays.value = false
  }, 200)
}


function handleSubmit() {
  // Nada si el nombre esta vacio
  if (!mealName.value.trim()) return

  // Store
  mealsStore.addMeal(mealName.value, selectedDay.value!, selectedCategory.value!)

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
      <div class="relative flex-1">
        <label for="meal-name" class="block mb-1 text-sm font-medium text-gray-600">
          Nombre del plato
        </label>
        <input
          id="meal-name"
          v-model="mealName"
          type="text"
          placeholder="Ej: albóndigas"
          autocomplete="off"
          class="px-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          @focus="showFavorites = true"
          @blur="handleBlur"
        />
        
        <!-- Dropdown para elegir favoritos -->
        <ul
          v-if="showFavorites && sortedFavorites.length > 0"
          class="overflow-y-auto absolute z-10 mt-1 w-full max-h-60 bg-white rounded-xl border border-gray-100 shadow-xl"
        >
          <li
            v-for="favorite in sortedFavorites"
            :key="favorite.id"
            @click="selectFavorite(favorite.name)"
            class="flex items-center px-4 py-3 border-b border-gray-50 transition-colors cursor-pointer hover:bg-emerald-50 last:border-0"
          >
            <span class="mr-3 text-lg">⭐</span>
            <span class="font-medium text-gray-700">{{ favorite.name }}</span>
          </li>
        </ul>
      </div>

      <!-- Select del día -->
      <div class="relative sm:w-48">
        <label for="day-select" class="block mb-1 text-sm font-medium text-gray-600">
          Día
        </label>
        
        <button
          id="day-select"
          type="button"
          class="flex justify-between items-center px-4 py-2 w-full text-left capitalize bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          @click="showDays = !showDays"
          @blur="handleDayBlur"
        >
          <span :class="!selectedDay ? 'text-gray-400' : 'text-gray-700'">
            {{ selectedDay ? selectedDay : 'Seleccionar...' }}
          </span>
          <span class="text-xs text-gray-500">▼</span>
        </button>

        <ul
          v-if="showDays"
          class="overflow-hidden absolute z-20 mt-1 w-full bg-white rounded-xl border border-gray-100 shadow-xl"
        >
          <li
            v-for="day in DAYS_OF_WEEK"
            :key="day"
            @click="selectDay(day)"
            class="px-4 py-2 text-gray-700 capitalize transition-colors cursor-pointer hover:bg-emerald-50"
          >
            {{ day }}
          </li>
        </ul>
      </div>

      <!-- Categoría -->
      <div class="relative sm:w-40">
        <label for="category-select" class="block mb-1 text-sm font-medium text-gray-600">
          Categoría
        </label>
        
        <button
          id="category-select"
          type="button"
          class="flex justify-between items-center px-4 py-2 w-full text-left bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          @click="showCategories = !showCategories"
          @blur="handleCategoryBlur"
        >
          <span :class="!selectedCategory ? 'text-gray-400' : 'text-gray-700'">
            {{ selectedCategory ? CATEGORY_LABELS[selectedCategory] : 'Seleccionar...' }}
          </span>
          <span class="text-xs text-gray-500">▼</span>
        </button>

        <ul
          v-if="showCategories"
          class="overflow-hidden absolute z-20 mt-1 w-full bg-white rounded-xl border border-gray-100 shadow-xl"
        >
          <li
            v-for="category in MEAL_CATEGORIES"
            :key="category"
            @click="selectCategory(category)"
            class="px-4 py-2 text-gray-700 transition-colors cursor-pointer hover:bg-emerald-50"
          >
            {{ CATEGORY_LABELS[category] }}
          </li>
        </ul>
      </div>

      <div class="sm:self-end">
        <button
          type="submit"
          class="px-6 py-2 w-full font-medium text-white bg-emerald-500 rounded-lg transition-colors sm:w-auto hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!mealName.trim() || !selectedCategory"
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
