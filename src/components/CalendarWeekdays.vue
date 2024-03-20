<template>
  <ol class="day-of-week">
    <li class="day-of-week_label" v-for="weekday in weekdays" :key="weekday">
      {{ weekday }}
    </li>
  </ol>
</template>

<script lang="ts" setup>
import { inject } from 'vue'

const dayjs = inject('dayJS')
const weekdays = dayjs.weekdaysShort(true)
</script>

<style scoped>
.day-of-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  color: var(--grey-800);
  font-size: 18px;
  background-color: #fff;
  padding-bottom: 5px;
  padding-top: 10px;
}

.day-of-week_label {
  text-align: right;
  color: var(--color-primary);
  text-transform: capitalize;
}
</style>
