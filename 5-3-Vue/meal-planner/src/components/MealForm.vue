<script setup lang="ts">
import { ref, computed } from 'vue'
import { DAYS_OF_WEEK, MEAL_CATEGORIES } from '@/constants'
import type { DayOfWeek, MealCategory } from '@/types'
import { useMealsStore } from '@/stores/meals'
import { useFavoritesStore } from '@/stores/favorites'

const mealsStore = useMealsStore()
const favoritesStore = useFavoritesStore()

// Estado local
const mealName = ref('')
const selectedDay = ref<DayOfWeek>('lunes')
const selectedCategory = ref<MealCategory>('desayuno')
const saveAsFavorite = ref(false)
const showFavorites = ref(false)
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
  if (!mealName.value.trim()) return

  mealsStore.addMeal(mealName.value, selectedDay.value, selectedCategory.value)

  if (saveAsFavorite.value) {
    favoritesStore.addFavorite(mealName.value)
  }

  mealName.value = ''
}

const categoryLabels: Record<MealCategory, string> = {
  desayuno: 'Desayuno',
  comida: 'Comida',
  cena: 'Cena'
}
</script>

<template>
  <div class="p-6 bg-white rounded-xl border shadow-sm border-slate-200">
    <h2 class="mb-6 text-lg font-bold text-slate-800">Añadir Comida</h2>

    <div class="flex flex-wrap gap-4 items-end">
      <!-- Input del nombre -->
      <div class="relative flex-1 min-w-[200px]">
        <label for="meal-name" class="block mb-2 text-sm font-medium text-slate-600">
          Nombre del plato
        </label>
        <input
          id="meal-name"
          v-model="mealName"
          type="text"
          placeholder="Ej: Tostada de aguacate"
          autocomplete="off"
          class="px-4 py-2.5 w-full text-sm rounded-lg border transition-colors border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none"
          @focus="showFavorites = true"
          @blur="handleBlur"
        />
        
        <!-- Dropdown de favoritos -->
        <ul
          v-if="showFavorites && sortedFavorites.length > 0"
          class="overflow-y-auto absolute z-10 mt-1 w-full max-h-48 bg-white rounded-lg border shadow-lg border-slate-200"
        >
          <li
            v-for="favorite in sortedFavorites"
            :key="favorite.id"
            @click="selectFavorite(favorite.name)"
            class="flex items-center px-4 py-2.5 text-sm transition-colors cursor-pointer hover:bg-slate-50"
          >
            <span class="mr-2">⭐</span>
            <span class="text-slate-700">{{ favorite.name }}</span>
          </li>
        </ul>
      </div>

      <!-- Select del día -->
      <div class="relative w-40">
        <label for="day-select" class="block mb-2 text-sm font-medium text-slate-600">
          Día
        </label>
        
        <button
          id="day-select"
          type="button"
          class="flex justify-between items-center px-4 py-2.5 w-full text-sm text-left capitalize bg-white rounded-lg border transition-colors border-slate-300 hover:border-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none"
          @click="showDays = !showDays"
          @blur="handleDayBlur"
        >
          <span class="text-slate-700">{{ selectedDay }}</span>
          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <ul
          v-if="showDays"
          class="overflow-hidden absolute z-20 mt-1 w-full bg-white rounded-lg border shadow-lg border-slate-200"
        >
          <li
            v-for="day in DAYS_OF_WEEK"
            :key="day"
            @click="selectDay(day)"
            class="px-4 py-2 text-sm capitalize transition-colors cursor-pointer text-slate-700 hover:bg-slate-50"
            :class="{ 'bg-emerald-50 text-emerald-700': day === selectedDay }"
          >
            {{ day }}
          </li>
        </ul>
      </div>

      <!-- Categoría con pill buttons -->
      <div>
        <label class="block mb-2 text-sm font-medium text-slate-600">
          Categoría
        </label>
        <div class="flex gap-1">
          <button
            v-for="category in MEAL_CATEGORIES"
            :key="category"
            type="button"
            @click="selectedCategory = category"
            class="px-4 py-2 text-sm font-medium rounded-full transition-all"
            :class="[
              selectedCategory === category
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            ]"
          >
            {{ categoryLabels[category] }}
          </button>
        </div>
      </div>

      <!-- Botón submit -->
      <button
        type="button"
        @click="handleSubmit"
        class="px-6 py-2.5 text-sm font-medium text-white bg-emerald-500 rounded-full shadow-sm transition-all hover:bg-emerald-600 hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!mealName.trim()"
      >
        + Añadir
      </button>
    </div>

    <!-- Checkbox favoritos -->
    <div class="mt-4">
      <label class="flex gap-2 items-center cursor-pointer">
        <input
          v-model="saveAsFavorite"
          type="checkbox"
          class="w-4 h-4 text-emerald-500 rounded border-slate-300 focus:ring-emerald-500"
        />
        <span class="text-sm text-slate-600">Guardar como favorito</span>
      </label>
    </div>
  </div>
</template>
