import dayjs, { Dayjs } from 'dayjs'

export function getPreviousMonthDaysToPrint(date: Dayjs) {
  const offset = date.startOf('month').isoWeekday() - 1
  const previousMonthDays = date.subtract(1, 'month').daysInMonth()

  const startDay = previousMonthDays - offset + 1
  const returnArray = []
  for (let i = startDay; i <= previousMonthDays; i++) {
    returnArray.push(dayjs(date).subtract(1, 'month').date(i))
  }
  return returnArray
}

export function getNextMonthDaysToPrint(date: Dayjs) {
  const offset = date.endOf('month').isoWeekday()
  const returnArray = []
  for (let i = 1; i <= 7 - offset; i++) {
    returnArray.push(dayjs(date).add(1, 'month').date(i))
  }
  return returnArray
}

export function getCurrentMonthDaysToPrint(date: Dayjs) {
  const returnArray = []
  for (let i = 1; i <= date.daysInMonth(); i++) {
    returnArray.push(dayjs(date).date(i))
  }
  return returnArray
}

export function getDaysToPrint(date: Dayjs) {
  return [
    ...getPreviousMonthDaysToPrint(date),
    ...getCurrentMonthDaysToPrint(date),
    ...getNextMonthDaysToPrint(date)
  ]
}
