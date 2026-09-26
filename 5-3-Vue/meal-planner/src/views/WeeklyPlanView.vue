<script setup lang="ts">
import MealForm from '@/components/MealForm.vue'
import DayColumn from '@/components/DayColumn.vue'
import { DAYS_OF_WEEK } from '@/constants'
</script>

<template>
  <div>
    <h1 class="mb-8 text-3xl italic font-black text-slate-800">Tu Plan Semanal</h1>

    <div class="grid grid-cols-7 gap-1 mb-10">
      <DayColumn v-for="day in DAYS_OF_WEEK" :key="day" :day="day" />
    </div>

    <MealForm />
  </div>
</template>