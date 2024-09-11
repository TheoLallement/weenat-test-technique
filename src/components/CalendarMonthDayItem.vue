<template>
  <li
    class="calendar-day"
    :class="{
      'calendar-day--not-current': !isCurrentMonth,
      'calendar-day--today': isToday
    }"
    @click="emit('addEvent', props.date)"
  >
    <span class="calendar-month-day-item__header">{{ label }}</span>
    <ol class="calendar-month-day-item_events">
      <li
        class="calendar-month-day-item__event-item"
        @click.stop="emit('editEvent', event.id)"
        v-for="event in events"
        :key="event.title"
      >
        <span>
          {{ event.title }}
        </span>
        <button
          class="calendar-month-day-item__event-item__button"
          @click.stop="emit('removeEvent', event)"
        >
          x
        </button>
      </li>
    </ol>
  </li>
</template>

<script lang="ts" setup>
import { defineProps, computed, inject, type PropType } from 'vue'
import type { Event } from '@/types/Calendar.types'

const dayjs = inject('dayJS')

const props = defineProps({
  date: {
    type: Object,
    required: true
  },

  isCurrentMonth: {
    type: Boolean,
    default: false
  },

  isToday: {
    type: Boolean,
    default: false
  },
  events: {
    type: Array as PropType<Array<Event>>,
    default: () => []
  }
})

const label = computed(() => {
  return dayjs(props.date).format('D')
})

// const emits = defineEmits(['addEvent'])

const emit = defineEmits<{
  addEvent: [date: Date]
  removeEvent: [event: Event]
  editEvent: [idEvent: number]
}>()
</script>

<style scoped>
.calendar-day {
  overflow: hidden;
  max-height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  background-color: #fff;
  color: var(--color-primary);
  padding: 5px;
  font-weight: 700;
  line-height: normal;
}

.calendar-month-day-item__header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar-day--not-current {
  background-color: var(--color-primary);
  opacity: 0.3;
  color: var(--grey-300);
}

.calendar-day--today {
  padding-top: 4px;
}

.calendar-day--today > span {
  color: #fff;
  border-radius: 9999px;
  background-color: var(--color-primary);
}

.calendar-month-day-item_events {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.85rem;
  padding: 0.5rem 0;
  list-style: none;
  overflow-y: auto;
  max-height: 100%;
  vertical-align: top;
}

.calendar-month-day-item__event-item {
  display: flex;
  padding: 0 1rem;
  box-sizing: border-box;
  border: 1px solid var(--color-primary);
  width: 100%;
  background-color: var(--color-neutral);
  text-overflow: ellipsis;
  border-radius: 1rem;
  line-height: 1.5rem;
}

.calendar-month-day-item__event-item:last-child {
  margin-bottom: 1rem;
}

.calendar-month-day-item__event-item__button {
  width: 1.125rem;
  height: 1.125rem;
  align-self: center;
  padding: 0.25rem;
  color: var(--color-primary);
  background: transparent;
  border: 0;
  margin-left: auto;
  cursor: pointer;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar-month-day-item__event-item__button:hover {
  color: var(--color-primary-darken);
  border: 1px solid var(--color-primary-darken);
}
</style>
