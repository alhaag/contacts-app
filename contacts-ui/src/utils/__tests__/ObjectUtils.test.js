import React from 'react'
import { removeEmptyKeys } from '../ObjectUtils'

describe('ObjectUtils', () => {

  test('removeEmptyKeys', () => {
    let objTest = {
        key1: 123,
        key2: 'ABC',
        key3: null,
        key4: '',
    }

    let objExpect = {
        key1: 123,
        key2: 'ABC',
    }

    expect(removeEmptyKeys(objTest)).toEqual(objExpect)
  })

})