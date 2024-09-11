import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CalendarMonth from '@/views/Calendar.vue'
import dayjs from '@/plugins/dayjs'

describe('CalendarMonth.vue', () => {
  const wrapper = mount(CalendarMonth, {
    global: {
      provide: {
        dayJS: dayjs
      }
    }
  })

  it('renders the calendar month component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the correct number of days in the grid', () => {
    const days = wrapper.findAll('.days-grid > *')
    expect(days.length).toBe(wrapper.vm.daysToPrint.length)
  })

  it('opens the dialog when adding a new event', async () => {
    expect(wrapper.vm.showDialogEvent).toBe(false)

    // Trigger the addEvent function
    wrapper.vm.addEvent(new Date())
    await wrapper.vm.$nextTick()

    // Dialog should be opened
    expect(wrapper.vm.showDialogEvent).toBe(true)
    const input = wrapper.find('#calendar-month__dialog-evenement__input')
    expect(input.exists()).toBe(true)
  })

  it('closes the dialog when clicking the "Valider" button', async () => {
    wrapper.vm.addEvent(new Date())
    await wrapper.vm.$nextTick()

    const button = wrapper.find('.calendar-month__dialog-evenement__button-valider')
    await button.trigger('click')
    expect(wrapper.vm.showDialogEvent).toBe(false)
  })

  it('adds a new event correctly', async () => {
    const initialEventCount = wrapper.vm.events.length

    // Simulate adding a new event
    wrapper.vm.addEvent(new Date())
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.events.length).toBe(initialEventCount + 1)
  })

  it('removes an event correctly', async () => {
    const initialEventCount = wrapper.vm.events.length

    const eventToRemove = wrapper.vm.events[0]
    wrapper.vm.removeEvent(eventToRemove)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.events.length).toBe(initialEventCount - 1)
  })
})
