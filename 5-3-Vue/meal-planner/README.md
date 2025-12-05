# 🍽️ Ejercicio: Meal Planner App

En este ejercicio, deberás crear una aplicación web utilizando **Vue 3** (con la plantilla de create-vue) que permita planificar las comidas de una semana.

## 📝 Descripción

La interfaz de usuario debe tener los siguientes elementos:

1.  **Formulario para añadir un plato**:
    *   Nombre del plato (campo de texto).
    *   Día de la semana (selector o menú desplegable).
    *   Botón "Agregar" que añada el plato al plan semanal.
2.  **Vista principal (Plan Semanal)**:
    *   Mostrar los días de la semana con los platos planificados.
    *   Cada día puede mostrar una lista de platos (ej: "Comida", "Cena").
    *   Cada plato debe tener un botón "Eliminar".
3.  **Gestión de Estado**:
    *   El estado (lista de platos) debe gestionarse con **Pinia**.
4.  **Comportamiento**:
    *   El formulario debe limpiarse automáticamente tras añadir un plato.

## 🔧 Requisitos básicos

*   **Vue Router**: Organizar la aplicación con al menos dos vistas:
    *   `Plan semanal`: Lista de comidas por día.
    *   `Lista de platos favoritos`: (Opcional) Platos frecuentes.
*   **Pinia**: Gestionar el estado global.
*   **Componentes**: Estructura clara (ej: `MealForm.vue`, `MealList.vue`, `DayCard.vue`).
*   **Estilos**: Tailwind CSS (recomendado) o CSS propio.

## 🚀 Configuración del Proyecto

```sh
pnpm install
pnpm dev
```
