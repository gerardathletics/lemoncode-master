export interface Meal {
  id: string
  name: string
  day: DayOfWeek
}

export type DayOfWeek = 
  | 'lunes' 
  | 'martes' 
  | 'miércoles' 
  | 'jueves' 
  | 'viernes' 
  | 'sábado' 
  | 'domingo'

export interface FavoriteMeal {
  id: string
  name: string
}

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'
]