import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Meal, DayOfWeek } from '@/types'

export const useMealsStore = defineStore('meals', () => {
  const meals = ref<Meal[]>([])

  // Getter de comidas agrupadas por día
const mealsByDay = computed(() => {
    const grouped: Record<DayOfWeek, Meal[]> = {
      lunes: [],
      martes: [],
      miércoles: [],
      jueves: [],
      viernes: [],
      sábado: [],
      domingo: []
    }

    // Añadimos las comidas a su dia
    for (const meal of meals.value) {
      grouped[meal.day].push(meal)
    }

    return grouped
  })

  function addMeal(name: string, day: DayOfWeek) {
    const newMeal: Meal = {
      id: crypto.randomUUID(),
      name: name.trim(),
      day
    }
    meals.value.push(newMeal)
  }

  function removeMeal(mealId: string) {
    const index = meals.value.findIndex(meal => meal.id === mealId)
    if (index !== -1) {
      meals.value.splice(index, 1)
    }
  }

  return {
    meals,
    mealsByDay,
    addMeal,
    removeMeal
  }
})
