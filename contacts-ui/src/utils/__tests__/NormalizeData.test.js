import React from 'react'
import { decimal2Currency, currency2Decimal } from '../NormalizeData'

describe('NormalizeData', () => {

  test('decimal2Currency', () => {
    expect(decimal2Currency(9999000.33)).toEqual('R$ 9.999.000,33')
    expect(decimal2Currency(100000)).toEqual('R$ 100.000,00')
    expect(decimal2Currency(10.50)).toEqual('R$ 10,50')
    expect(decimal2Currency(329.00)).toEqual('R$ 329,00')
    expect(decimal2Currency('329.00')).toEqual('R$ 329,00')
    expect(decimal2Currency('329')).toEqual('R$ 329,00')
  })

  test('currency2Decimal', () => {
    expect(currency2Decimal('R$ 9.999.000,33')).toEqual(9999000.33)
    expect(currency2Decimal('R$ 100.000,00')).toEqual(100000.0)
    expect(currency2Decimal('R$ 10,50')).toEqual(10.5)
    expect(currency2Decimal('R$ 329,00')).toEqual(329.0)
    expect(currency2Decimal('R$ 329,00')).toEqual(329.0)
    expect(currency2Decimal('R$ 329,00')).toEqual(329.0)
    expect(currency2Decimal('329,99')).toEqual(329.99)
    expect(currency2Decimal('329')).toEqual(329.0)
  })

})
