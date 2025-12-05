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

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'
]