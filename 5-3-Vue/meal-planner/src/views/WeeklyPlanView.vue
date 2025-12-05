<script setup lang="ts">
import MealForm from '@/components/MealForm.vue'
import DayCard from '@/components/DayCard.vue'
import { DAYS_OF_WEEK } from '@/constants'
</script>

<template>
  <div>
    <MealForm class="mb-8" />

    <h2 class="mb-6 text-2xl font-bold text-gray-800">📅 Plan Semanal</h2>

    <div class="grid grid-cols-1 gap-2 xl:grid-cols-7">
      <DayCard v-for="day in DAYS_OF_WEEK" :key="day" :day="day" class="h-full" />
    </div>
  </div>
</template>