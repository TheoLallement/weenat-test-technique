<template>
  <div class="calendar-month">
    <div class="calendar-month-header">
      <CalendarDateIndicator
        v-model="selectedDate"
        :selected-date="selectedDate"
        :selectedMonth="selectedDate.format('MMMM YYYY')"
        class="calendar-month-header-selected-month"
      />
    </div>
    <CalendarWeekdays />
    <ol class="days-grid">
      <CalendarMonthDayItem
        v-for="day in daysToPrint"
        :key="day"
        :date="day"
        :is-current-month="dayjs(day).isSame(selectedDate, 'month')"
        :is-today="dayjs(day).isToday()"
        :events="getEventsForDay(day)"
        @addEvent="addEvent"
        @editEvent="editEvent"
        @removeEvent="removeEvent"
      />
    </ol>
    <CustomDialog title="Entrez le titre de l'évènement" v-model="showDialogEvent">
      <div class="calendar-month__dialog-evenement">
        <input
          id="calendar-month__dialog-evenement__input"
          class="calendar-month__dialog-evenement__input"
          placeholder="Titre de l'évènement"
          v-model="selectedEvent.title"
          @keydown.enter="showDialogEvent = false"
          type="text"
        />
        <button
          class="calendar-month__dialog-evenement__button-valider"
          @click="showDialogEvent = false"
        >
          Valider
        </button>
      </div>
    </CustomDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, computed } from 'vue'
import type { Event } from '@/types/Calendar.types'

import CalendarDateIndicator from '@/components/CalendarDateIndicator.vue'
import CalendarWeekdays from '@/components/CalendarWeekdays.vue'
import CalendarMonthDayItem from '@/components/CalendarMonthDayItem.vue'
import CustomDialog from '@/components/CustomDialog.vue'

import { getDaysToPrint } from '@/utils/Calendar.utils'

const showDialogEvent = ref(false)

const dayjs = inject('dayJS')

const selectedDate = ref(dayjs())
const selectedEventId = ref<number | undefined>(undefined)

const events = ref<Array<Event>>([{ date: dayjs(), title: 'Event 1', id: 1 }])

const selectedEvent = computed<Event>({
  get() {
    return events.value.find((event) => event.id === selectedEventId.value)
  },
  set(value: Event) {
    events.value = events.value.map((event) => {
      if (event.id === selectedEventId.value) {
        return value
      }
      return event
    })
  }
})

const daysToPrint = computed(() => {
  return getDaysToPrint(selectedDate.value)
})

function focusInput() {
  // Small delay to ensure the dialog is rendered
  setTimeout(() => {
    const input = document.getElementById(
      'calendar-month__dialog-evenement__input'
    ) as HTMLInputElement
    console.log(input)
    input?.focus()
    input?.select()
  }, 1)
}

function addEvent(date: Date) {
  const newEvent = { date, title: 'New Event', id: events.value.length + 1 }
  events.value.push(newEvent)
  selectedEventId.value = newEvent.id
  showDialogEvent.value = true
  focusInput()
}

function getEventsForDay(date: Date): Array<Event> {
  return events.value.filter((event) => dayjs(event.date).isSame(date))
}

function removeEvent(event: Event) {
  const index = events.value.findIndex((e) => e.id === event.id)
  events.value.splice(index, 1)
}

function editEvent(id: number) {
  selectedEventId.value = id
  showDialogEvent.value = true
  focusInput()
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.calendar-month {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: var(--grey-200);
  border: solid 1px var(--color-primary);
  height: 100%;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 1fr;
  max-height: 80vh;

  height: 100%;
  grid-column-gap: var(--grid-gap);
  grid-row-gap: var(--grid-gap);
  border-top: solid 1px var(--color-primary);

  overflow: hidden;
}

.calendar-month__dialog-evenement {
  display: flex;
  gap: 1rem;
}

.calendar-month__dialog-evenement__input {
  border: 2px solid var(--color-primary);
  color: var(--color-primary-darken);
  padding: 1rem;
  font-size: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.calendar-month__dialog-evenement__button-valider {
  background-color: var(--color-primary);
  border: unset;
  color: white;
  padding: 1rem;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
}

.calendar-month__dialog-evenement__button-valider:hover {
  background-color: var(--color-primary-darken);
}

.calendar-month__dialog-evenement__button-valider:focus {
  outline: 2px solid var(--color-primary-darken);
  outline-offset: 2px;
}
</style>
