<script setup lang="ts">
import { computed } from 'vue'
import { useMealsStore } from '@/stores/meals'
import { MEAL_CATEGORIES, CATEGORY_LABELS } from '@/constants'
import type { DayOfWeek, MealCategory } from '@/types'

const props = defineProps<{
  day: DayOfWeek
}>()

const mealsStore = useMealsStore()

// Comidas de este día específico
const dayMeals = computed(() => mealsStore.mealsByDay[props.day])

// Comidas agrupadas por categoría
const mealsByCategory = computed(() => {
  const grouped: Record<MealCategory, typeof dayMeals.value> = {
    desayuno: [],
    comida: [],
    cena: []
  }

  for (const meal of dayMeals.value) {
    grouped[meal.category].push(meal)
  }

  return grouped
})

const displayDay = computed(() => {
  return props.day.charAt(0).toUpperCase() + props.day.slice(1)
})
</script>

<template>
  <div class="overflow-hidden bg-white rounded-xl shadow-md">
    <!-- Header del día -->
    <div class="px-4 py-3 text-white bg-emerald-500">
      <h3 class="font-semibold">{{ displayDay }}</h3>
      <span class="text-sm text-emerald-100">
        {{ dayMeals.length }} plato{{ dayMeals.length !== 1 ? 's' : '' }}
      </span>
    </div>

    <!-- Lista de platos -->
    <div class="p-4 min-h-[300px]">
      <template v-if="dayMeals.length > 0">
        <div
          v-for="category in MEAL_CATEGORIES"
          :key="category"
          class="mb-4 last:mb-0"
        >
          <template v-if="mealsByCategory[category].length > 0">
            <h4 class="flex gap-1 items-center mb-2 text-sm font-medium text-gray-500">
              {{ CATEGORY_LABELS[category] }}
            </h4>
            <ul class="space-y-2">
              <li
                v-for="meal in mealsByCategory[category]"
                :key="meal.id"
                class="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
              >
                <span class="text-gray-700">{{ meal.name }}</span>
                <button
                  @click="mealsStore.removeMeal(meal.id)"
                  class="text-red-400 transition-colors hover:text-red-600"
                  title="Eliminar"
                >
                  🗑️
                </button>
              </li>
            </ul>
          </template>
        </div>
      </template>

      <p v-else class="py-4 text-sm text-center text-gray-400">
        Sin platos planificados
      </p>
    </div>
  </div>
</template>