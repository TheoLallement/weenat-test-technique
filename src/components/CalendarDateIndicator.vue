<template>
  <div class="calendar-date-selector">
    <button @click="selectPrevious">﹤</button>
    <input
      :value="dayjs(model).format('YYYY-MM')"
      @input="formatInput"
      type="month"
      id="current-month"
      name="current-month"
      min="2018-03"
    />
    <button @click="selectNext">﹥</button>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, inject } from 'vue'

const dayjs = inject('dayJS')

const model = defineModel('model', { type: String, default: '' })

function selectPrevious() {
  model.value = dayjs(model.value).subtract(1, 'month')
}

function selectNext() {
  model.value = dayjs(model.value).add(1, 'month')
}

function formatInput(event) {
  console.log(event)
  model.value = dayjs(event.target.value, 'YYYY-MM').add(1, 'day')
}
</script>

<style scoped>
.calendar-date-selector {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 2rem;
  font-size: 24px;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: var(--grey-800);
}

button::hover {
  color: var(--grey-300);
  background-color: var(--grey-100);
}

input[type='month'] {
  background-color: var(--gray-1);
  border: 2px solid var(--color-primary);
  color: var(--main-dark);
  padding: var(--primary-padding);
  font-size: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

input[type='month']:focus {
  border-color: var(--color-primary-darken);
  box-shadow: 0 0 8px rgba(96, 108, 56, 0.5);
  outline: none;
}

input[type='month']:hover {
  border-color: var(--color-secondary);
}
</style>
