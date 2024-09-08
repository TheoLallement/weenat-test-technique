import {
  getPreviousMonthDaysToPrint,
  getNextMonthDaysToPrint,
  getCurrentMonthDaysToPrint,
  getDaysToPrint
} from '@/utils/Calendar.utils'
import { describe, it, expect } from 'vitest'
import dayjs from '@/plugins/dayjs'

describe('getPreviousMonthDaysToPrint', () => {
  it('should return an array of days from the previous month', () => {
    const date = dayjs('2021-08-01')
    const result = getPreviousMonthDaysToPrint(date)
    expect(result).toHaveLength(6)
    expect(result[1].format('YYYY-MM-DD')).toBe('2021-07-27')
    expect(result[5].format('YYYY-MM-DD')).toBe('2021-07-31')
  })

  it('should return an array of days from the previous month when the first day of the month is a Monday', () => {
    const date = dayjs('2021-11-01')
    const result = getPreviousMonthDaysToPrint(date)
    expect(result).toHaveLength(0)
  })

  it('should return an array of days from the previous month when the first day of the month is a Sunday', () => {
    const date = dayjs('2021-10-01')
    const result = getPreviousMonthDaysToPrint(date)
    expect(result).toHaveLength(4)
    expect(result[0].format('YYYY-MM-DD')).toBe('2021-09-27')
    expect(result[3].format('YYYY-MM-DD')).toBe('2021-09-30')
  })
})

describe('getNextMonthDaysToPrint', () => {
  it('should return an array of days from the next month', () => {
    const date = dayjs('2021-08-01')
    const result = getNextMonthDaysToPrint(date)
    expect(result).toHaveLength(5)
    expect(result[1].format('YYYY-MM-DD')).toBe('2021-09-02')
    expect(result[4].format('YYYY-MM-DD')).toBe('2021-09-05')
  })

  it('should return an array of days from the next month when the last day of the month is a Monday', () => {
    const date = dayjs('2021-08-31')
    const result = getNextMonthDaysToPrint(date)
    expect(result).toHaveLength(5)
    expect(result[0].format('YYYY-MM-DD')).toBe('2021-09-01')
    expect(result[4].format('YYYY-MM-DD')).toBe('2021-09-05')
  })

  it('should return an empty array of days from the next month when the last day of the month is a Sunday', () => {
    const date = dayjs('2021-10-31')
    const result = getNextMonthDaysToPrint(date)
    expect(result).toHaveLength(0)
  })
})

describe('getCurrentMonthDaysToPrint', () => {
  it('should return an array of days from the current month', () => {
    const date = dayjs('2021-08-01')
    const result = getCurrentMonthDaysToPrint(date)
    expect(result).toHaveLength(31)
    expect(result[0].format('YYYY-MM-DD')).toBe('2021-08-01')
    expect(result[30].format('YYYY-MM-DD')).toBe('2021-08-31')
  })

  it('should return an array of days from the current month when the month has 30 days', () => {
    const date = dayjs('2021-04-01')
    const result = getCurrentMonthDaysToPrint(date)
    expect(result).toHaveLength(30)
    expect(result[0].format('YYYY-MM-DD')).toBe('2021-04-01')
    expect(result[29].format('YYYY-MM-DD')).toBe('2021-04-30')
  })

  it('should return an array of days from the current month when the month has 28 days', () => {
    const date = dayjs('2021-02-01')
    const result = getCurrentMonthDaysToPrint(date)
    expect(result).toHaveLength(28)
    expect(result[0].format('YYYY-MM-DD')).toBe('2021-02-01')
    expect(result[27].format('YYYY-MM-DD')).toBe('2021-02-28')
  })

  it('should return an array of days from the current month when the month has 29 days', () => {
    const date = dayjs('2020-02-01')
    const result = getCurrentMonthDaysToPrint(date)
    expect(result).toHaveLength(29)
    expect(result[0].format('YYYY-MM-DD')).toBe('2020-02-01')
    expect(result[28].format('YYYY-MM-DD')).toBe('2020-02-29')
  })
})

describe('getDaysToPrint', () => {
  it('should return an array of days from the previous month, the current month, and the next month', () => {
    const date = dayjs('2021-08-01')
    const result = getDaysToPrint(date)
    expect(result).toHaveLength(42)
    expect(result[0].format('YYYY-MM-DD')).toBe('2021-07-26')
    expect(result[5].format('YYYY-MM-DD')).toBe('2021-07-31')
    expect(result[6].format('YYYY-MM-DD')).toBe('2021-08-01')
    expect(result[36].format('YYYY-MM-DD')).toBe('2021-08-31')
    expect(result[41].format('YYYY-MM-DD')).toBe('2021-09-05')
  })

  it('should return an array of days from the current month and the next month when the first day of the month is a Monday', () => {
    const date = dayjs('2021-11-01')
    const result = getDaysToPrint(date)
    expect(result).toHaveLength(35)
    expect(result[0].format('YYYY-MM-DD')).toBe('2021-11-01')
    expect(result[29].format('YYYY-MM-DD')).toBe('2021-11-30')
    expect(result[34].format('YYYY-MM-DD')).toBe('2021-12-05')
  })

  it('should return an array of days from the previous month and the current month when the last day of the month is a Sunday', () => {
    const date = dayjs('2021-10-01')
    const result = getDaysToPrint(date)
    expect(result).toHaveLength(35)
    expect(result[0].format('YYYY-MM-DD')).toBe('2021-09-27')
    expect(result[3].format('YYYY-MM-DD')).toBe('2021-09-30')
    expect(result[4].format('YYYY-MM-DD')).toBe('2021-10-01')
    expect(result[34].format('YYYY-MM-DD')).toBe('2021-10-31')
  })

  it('should return an array of days which has a length which is a multiple of 7', () => {
    for (let i = 0; i < 100; i++) {
      const date = dayjs().add(Math.floor(Math.random() * 1000), 'month')
      const result = getDaysToPrint(date)
      expect(result.length % 7).toBe(0)
    }
  })
})
