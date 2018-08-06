import React from 'react'
import { countDaysInMonth, firstDateOfMonth, lastDateOfMonth } from '../DateUtils'

describe('DateUtils', () => {

  test('countDaysInMonth', () => {
    expect(countDaysInMonth(2016, 2)).toEqual(29) // bisexto
    expect(countDaysInMonth(2017, 12)).toEqual(31)
    expect(countDaysInMonth(2018, 1)).toEqual(31)
    expect(countDaysInMonth(2018, 2)).toEqual(28)
    expect(countDaysInMonth(2018, 3)).toEqual(31)
    expect(countDaysInMonth(2018, 4)).toEqual(30)
    expect(countDaysInMonth(2018, 5)).toEqual(31)
    expect(countDaysInMonth(2018, 6)).toEqual(30)
    expect(countDaysInMonth(2018, 7)).toEqual(31)
    expect(countDaysInMonth(2018, 8)).toEqual(31)
    expect(countDaysInMonth(2018, 9)).toEqual(30)
    expect(countDaysInMonth(2018, 10)).toEqual(31)
    expect(countDaysInMonth(2018, 11)).toEqual(30)
    expect(countDaysInMonth(2018, 12)).toEqual(31)
    expect(countDaysInMonth(2096, 2)).toEqual(29) // bisexto
  })

  test('firstDateOfMonth', () => {
    expect(firstDateOfMonth(2018, 1)).toEqual(new Date('2018-01-01T00:00:00.000Z'))
    expect(firstDateOfMonth(2018, 2)).toEqual(new Date('2018-02-01T00:00:00.000Z'))
  })

  test('lastDateOfMonth', () => {
    expect(lastDateOfMonth(2018, 1)).toEqual(new Date('2018-01-31T23:59:59.999Z'))
    expect(lastDateOfMonth(2018, 2)).toEqual(new Date('2018-02-28T23:59:59.999Z'))
    expect(lastDateOfMonth(2018, 4)).toEqual(new Date('2018-04-30T23:59:59.999Z'))
  })

})
