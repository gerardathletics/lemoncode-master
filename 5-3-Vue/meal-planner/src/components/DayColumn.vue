<script setup lang="ts">
import { computed } from 'vue'
import { useMealsStore } from '@/stores/meals'
import { CATEGORY_COLORS } from '@/constants'
import type { DayOfWeek } from '@/types'

const props = defineProps<{
  day: DayOfWeek
}>()

const mealsStore = useMealsStore()

const dayMeals = computed(() => mealsStore.mealsByDay[props.day])

const displayDay = computed(() => {
  return props.day.charAt(0).toUpperCase() + props.day.slice(1)
})
</script>

<template>
  <div class="min-h-[180px]">
    <!-- Header del día -->
    <h3 class="mb-3 text-sm font-semibold text-slate-600">{{ displayDay }}</h3>

    <!-- Lista de comidas -->
    <div class="space-y-2">
      <div
        v-for="meal in dayMeals"
        :key="meal.id"
        class="group relative p-3 bg-white rounded-lg border-2 border-dashed border-slate-200 hover:border-slate-300 transition-colors"
      >
        <div class="flex items-start gap-2">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-slate-700 leading-tight">{{ meal.name }}</p>
            <span 
              class="inline-block mt-1 text-xs font-medium"
              :class="CATEGORY_COLORS[meal.category]"
            >
              {{ meal.category.charAt(0).toUpperCase() + meal.category.slice(1) }}
            </span>
          </div>
          <button
            @click="mealsStore.removeMeal(meal.id)"
            class="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all text-xs"
            title="Eliminar"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Estado vacío -->
      <div
        v-if="dayMeals.length === 0"
        class="p-3 text-center text-xs text-slate-400 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200"
      >
        Sin comidas.
      </div>
    </div>
  </div>
</template>
