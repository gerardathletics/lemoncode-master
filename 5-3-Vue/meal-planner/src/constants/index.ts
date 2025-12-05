import type { DayOfWeek, MealCategory } from '@/types'

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'
]

export const MEAL_CATEGORIES: MealCategory[] = ['desayuno', 'comida', 'cena']

export const CATEGORY_LABELS: Record<MealCategory, string> = {
  desayuno: '🌅 Desayuno',
  comida: '☀️ Comida',
  cena: '🌙 Cena'
}
