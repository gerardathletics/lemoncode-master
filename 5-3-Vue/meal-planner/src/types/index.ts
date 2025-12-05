export type MealCategory = 'desayuno' | 'comida' | 'cena'

export type DayOfWeek = 
  | 'lunes' 
  | 'martes' 
  | 'miércoles' 
  | 'jueves' 
  | 'viernes' 
  | 'sábado' 
  | 'domingo'

export interface Meal {
  id: string
  name: string
  day: DayOfWeek
  category: MealCategory
}

export interface FavoriteMeal {
  id: string
  name: string
}