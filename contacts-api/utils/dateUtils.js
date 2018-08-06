/**
 * Modulo com funções utilitárias para manipulação de datas.
 */

module.exports.currentLocalDate = currentLocalDate
module.exports.timeStamp = timeStamp
module.exports.currentMonth = currentMonth
module.exports.currentYear = currentYear
module.exports.countDaysInMonth = countDaysInMonth
module.exports.firstDateOfMonth = firstDateOfMonth
module.exports.lastDateOfMonth = lastDateOfMonth
module.exports.getLabelOfMonth = getLabelOfMonth
module.exports.dateFormat = dateFormat
module.exports.addDays = addDays
module.exports.calculateAge = calculateAge
module.exports.calculateFullAge = calculateFullAge

/**
 * Obtem a data/hora atual do Brasil, pois Date.now() pega UTC
 */
function currentLocalDate () {
  var dateNow = new Date()
  dateNow.setHours(dateNow.getHours() - 3)
  return dateNow
}

/**
 * Função retorna o timestamp atual.
 *
 * @param {Boolean} microsecounds Flag que indica se deve ser apresentado microsegundos ou apenas segundos.
 * @returns {Number}
 * @public
 */
function timeStamp (microsecounds = false) {
  const dateTime = Date.now()
  if (microsecounds) {
    return dateTime
  }
  return Math.floor(dateTime / 1000)
}

/**
 * Reorna o número do mês atual. Ex: 5
 */
function currentMonth () {
  return (new Date()).getMonth() + 1
}

/**
 * Reorna o ano atual por extenso. Ex: 2018
 */
function currentYear () {
  return (new Date()).getFullYear()
}

/**
 * Retorna a quantidade de dias em um mês de um determinado ano.
 *
 * @param {Number} year Número do ano por extenso.
 * @param {Number} month Número do mês.
 * @returns {Number}
 * @public
 */
function countDaysInMonth (year, month) {
  const daysInMonth = new Date(year, month, 0).getDate()
  return daysInMonth
}

/**
 * Retorna um objeto data do primeiro dia do ano e mês informado.
 *
 * @param {Number} year Número do ano por extenso.
 * @param {Number} month Número do mês.
 * @returns {Number}
 * @public
 */
function firstDateOfMonth (year, month) {
  month = month - 1 // month start in zero
  const firstDay = new Date(Date.UTC(year, month, 1))
  return firstDay
}

/**
 * Retorna um objeto data do último dia do ano e mês informado.
 *
 * @param {Number} year Número do ano por extenso.
 * @param {Number} month Número do mês.
 * @returns {Number}
 * @public
 */
function lastDateOfMonth (year, month) {
  const daysInMonth = countDaysInMonth(year, month)
  month = month - 1 // month start in zero
  const lastDay = new Date(Date.UTC(year, month, daysInMonth, 23, 59, 59, 999))
  return lastDay
}

function getLabelOfMonth (month) {
  switch (parseInt(month)) {
    case 1:
      return 'Janeiro'
    case 2:
      return 'Fevereiro'
    case 3:
      return 'Março'
    case 4:
      return 'Abril'
    case 5:
      return 'Maio'
    case 6:
      return 'Junho'
    case 7:
      return 'Julho'
    case 8:
      return 'Agosto'
    case 9:
      return 'Setembro'
    case 10:
      return 'Outubro'
    case 11:
      return 'Novembro'
    case 12:
      return 'Dezembro'
    default:
      return month
  }
}

/**
 * Convert string date format '2018-01-31' to '31/01/2018'.
 *
 * @param {String} value
 * @public
 */
function dateFormat (value) {
  if (!value || value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)) {
    return value
  }
  let aux = value.split('-')
  return `${aux[2]}/${aux[1]}/${aux[0]}`
}

/**
 * Acrescenta dias em uma determinada data
 *
 * @param {Date} date
 * @param {Number} days
 */
function addDays (date, days) {
  var result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

/**
 * Calcula a idade em anos dada uma determinada data de nascimento.
 *
 * @param {String} strBirthday Data no formato 'aaaa-mm-dd'
 * @param {Boolean} format Define se deve ser retornado com a descrição "50 anos"
 */
function calculateAge (strBirthday, format = false) {
  if (!strBirthday) {
    return
  }
  let birthday = new Date(strBirthday)
  let ageDifMs = Date.now() - birthday.getTime()
  let ageDate = new Date(ageDifMs) // miliseconds from epoch
  const age = Math.abs(ageDate.getUTCFullYear() - 1970)
  return (format) ? `${age} ano(s)` : age
}

/**
 * dateString is a date passed as a string in the following
 * formats:
 *
 * type 1 : 19970529
 * type 2 : 970529
 * type 3 : 29/05/1997
 * type 4 : 29/05/97
 * type 5 : 1997-05-29
 *
 * dateType is a numeric integer from 1 to 4, representing
 * the type of dateString passed, as defined above.
 *
 * Returns string containing the age in years, months and days
 * in the format yyy years mm months dd days.
 * Returns empty string if dateType is not one of the expected
 * values.
 */
function calculateFullAge (dateString, dateType = 5) {
  let now = new Date()

  let yearNow = now.getYear()
  let monthNow = now.getMonth()
  let dateNow = now.getDate()

  let dob = null

  if (dateType == 1) {
    dob = new Date(dateString.substring(0, 4), dateString.substring(4, 6) - 1, dateString.substring(6, 8))
  } else if (dateType == 2) {
    dob = new Date(dateString.substring(0, 2), dateString.substring(2, 4) - 1, dateString.substring(4, 6))
  } else if (dateType == 3) {
    dob = new Date(dateString.substring(6, 10), dateString.substring(3, 5) - 1, dateString.substring(0, 2))
  } else if (dateType == 4) {
    dob = new Date(dateString.substring(6, 8), dateString.substring(3, 5) - 1, dateString.substring(0, 2))
  } else if (dateType == 5) {
    dob = new Date(dateString.substring(0, 4), dateString.substring(5, 7) - 1, dateString.substring(9, 11))
  } else {
    return ''
  }

  let yearDob = dob.getYear()
  let monthDob = dob.getMonth()
  let dateDob = dob.getDate()

  var yearAge = yearNow - yearDob

  let monthAge = null
  if (monthNow >= monthDob) {
    monthAge = monthNow - monthDob
  } else {
    yearAge--
    monthAge = 12 + monthNow - monthDob
  }

  let dateAge = null
  if (dateNow >= dateDob) {
    dateAge = dateNow - dateDob
  } else {
    monthAge--
    dateAge = 31 + dateNow - dateDob

    if (monthAge < 0) {
      monthAge = 11
      yearAge--
    }
  }
  return `${yearAge} ano(s), ${monthAge} mes(es) e ${dateAge} dia(s)`
}
