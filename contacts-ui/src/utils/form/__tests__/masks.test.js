import React from 'react';
import { maskMoney, maskPattern, maskNumber, maskAlphaNumeric, maskPhone,
  maskCpf, maskDate, maskDateTime } from '../masks';

describe('Masks unit tests', () => {

  test('maskMoney', () => {
    expect(maskMoney('199')).toBe('1,99');
    expect(maskMoney('9900000')).toBe('99.000,00');
  });

  test('maskPattern', () => {
    expect(maskPattern('12AB1C2', { pattern: '99-AA-SSS' })).toBe('12-AB-1C2');
    expect(maskPattern('12AB1C2', { pattern: '99-AA-SSS' })).toBe('12-AB-1C2');
  });

  test('maskNumber', () => {
    expect(maskNumber('ABC123456')).toBe('123456');
  });

  test('maskAlphaNumeric', () => {
    expect(maskAlphaNumeric('//\|´!@#$%*()-_=+.;?ABC1234')).toBe('ABC1234');
  });

  test('maskPhone', () => {
    expect(maskPhone('4832223333')).toBe('(48) 3222-3333');
    expect(maskPhone('48991112222')).toBe('(48) 99111-2222');
  });

  test('maskCpf', () => {
    expect(maskCpf('99988877766')).toBe('999.888.777-66');
    expect(maskCpf('ABC99988877766')).toBe('999.888.777-66');
  });

  test('maskDate', () => {
    expect(maskDate('10012000')).toBe('10/01/2000');
    expect(maskDate('AB10012000cd')).toBe('10/01/2000');
  });

  test('maskDateTime', () => {
    expect(maskDateTime('100120000810')).toBe('10/01/2000 08:10');
    expect(maskDateTime('AB100120000810cd')).toBe('10/01/2000 08:10');
  });

});