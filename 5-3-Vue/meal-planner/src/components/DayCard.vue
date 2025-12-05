<script setup lang="ts">
import { computed } from 'vue'
import { useMealsStore } from '@/stores/meals'
import type { DayOfWeek } from '@/types'

const props = defineProps<{
  day: DayOfWeek
}>()

const mealsStore = useMealsStore()

// Comidas de este día específico
const dayMeals = computed(() => mealsStore.mealsByDay[props.day])

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
      <ul v-if="dayMeals.length > 0" class="space-y-2">
        <li
          v-for="meal in dayMeals"
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

      <p v-else class="py-4 text-sm text-center text-gray-400">
        Sin platos planificados
      </p>
    </div>
  </div>
</template>