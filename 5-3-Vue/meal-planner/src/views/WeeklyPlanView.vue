<script setup lang="ts">
import MealForm from '@/components/MealForm.vue'
import DayCard from '@/components/DayCard.vue'
import { DAYS_OF_WEEK } from '@/types'
</script>

<template>
  <div>
    <MealForm class="mb-8" />

    <h2 class="mb-6 text-2xl font-bold text-gray-800">📅 Plan Semanal</h2>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <DayCard v-for="day in DAYS_OF_WEEK" :key="day" :day="day" />
    </div>
  </div>
</template>