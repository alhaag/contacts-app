/**
 * Convert string date format '31/01/2018' to '2018-01-31'.
 *
 * @param {String} value
 * @public
 */
export const dateStringToAPI = (value) => {
  if (!value || value.match(/^(\d{4})\-(\d{2})\-(\d{2})$/)) {
    return value
  }
  let aux = value.split('/')
  if (aux.length !== 3) {
    throw new Error('Ivalid date format')
  }
  return `${aux[2]}-${aux[1]}-${aux[0]}`
}

/**
 * Convert string date format '2018-01-31' to '31/01/2018'.
 *
 * @param {String} value
 * @public
 */
export const dateStringFromAPI = (value) => {
  if (!value || value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)) {
    return value
  }
  let aux = value.split('-')
  return `${aux[2]}/${aux[1]}/${aux[0]}`
}

/**
 * Convert date format '2017-11-06T14:43:49.000Z' to '31/01/2018'.
 *
 * @param {String} value
 * @public
 */
export const dateFromAPI = (value) => {
  if (!value) return value
  try {
    // let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    // return date.toLocaleDateString('pt-BR', options)
    let options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      timeZone: 'UTC'
    }
    let date = new Date(value)
    return new Intl.DateTimeFormat('pt-BR', options).format(date)
  } catch (e) {
    return value
  }
}

export const decimal2Currency = (value) => {
  if (! value && value !== 0) return value
  value = Number(value)
  value = value.toFixed(2).split('.')
  value[0] = "R$ " + value[0].split(/(?=(?:...)*$)/).join('.')
  return value.join(',')
}

export const currency2Decimal = (value) => {
  if (! value && value !== 0) return value
  let strValue = value.toString()
  let aux = strValue.split(',')
  let money = aux[0].replace(/[^\d]/g, '')
  let cents = (aux.length > 1) ? aux[1].replace(/[^\d]/g, '') : '0'
  strValue = `${money}.${cents}`
  return parseFloat(strValue)
}

/**
 * Remove HTML tags of string.
 */
export const stripHtmlTags = (str) => {
  if ((str === null) || (str === '')) {
    return ''
  } else {
   str = str.toString();
   return str.replace(/<[^>]*>/g, '');
  }
}
