import React from 'react'
import { required, isDate } from '../rules'
import * as ErrorMessages from '../errorMessages.js'

describe('Form rules tests', () => {

  test('required', () => {
    expect(required('abc')).toBe(null)
    expect(required(' ')).toBe(null)
    expect(required(123)).toBe(null)
    expect(required(10.0)).toBe(null)
    expect(required(Date.now())).toBe(null)
    expect(required()).toBe(ErrorMessages.isRequired)
    expect(required(null)).toBe(ErrorMessages.isRequired)
    expect(required(undefined)).toBe(ErrorMessages.isRequired)
    expect(required('')).toBe(ErrorMessages.isRequired)
  })

  test('isDate', () => {
    expect(isDate('01/01/1970')).toBe(null)
    expect(isDate('31/12/2017')).toBe(null)
    expect(isDate('29/02/2016')).toBe(null)
    expect(isDate('29/02/2018')).toBe(ErrorMessages.isDate)
    expect(isDate('00/00/0000')).toBe(ErrorMessages.isDate)
    expect(isDate('99/01/2010')).toBe(ErrorMessages.isDate)
  })

})