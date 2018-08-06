
/**
 * Função retorna o timestamp atual.
 *
 * @param {Boolean} microsecounds Flag que indica se deve ser apresentado microsegundos ou apenas segundos.
 * @returns {Number}
 * @public
 */
export const timeStamp = (microsecounds = false) => {
  const dateTime = Date.now()
  if (microsecounds) {
    return dateTime
  }
  return Math.floor(dateTime / 1000)
}

/**
 * Reorna o número do mês atual. Ex: 5
 */
export const currentMonth = () => {
  return (new Date()).getMonth() + 1
}

/**
 * Reorna o ano atual por extenso. Ex: 2018
 */
export const currentYear = () => {
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
export const countDaysInMonth = (year, month) => {
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
export const firstDateOfMonth = (year, month) => {
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
export const lastDateOfMonth = (year, month) => {
  const daysInMonth = countDaysInMonth(year, month)
  month = month - 1 // month start in zero
  const lastDay = new Date(Date.UTC(year, month, daysInMonth, 23, 59, 59, 999))
  return lastDay
}

/**
 * Array de meses do ano.
 *
 * @returns {Array}
 * @public
 */
export const arrayMonths = () => {
  return [
    { value: 1, title: 'Janeiro' },
    { value: 2, title: 'Fevereiro' },
    { value: 3, title: 'Março' },
    { value: 4, title: 'Abril' },
    { value: 5, title: 'Maio' },
    { value: 6, title: 'Junho' },
    { value: 7, title: 'Julho' },
    { value: 8, title: 'Agosto' },
    { value: 9, title: 'Setembro' },
    { value: 10, title: 'Outubro' },
    { value: 11, title: 'Novembro' },
    { value: 12, title: 'Dezembro' }
  ]
}

/**
 * Retorna o nome do mês.
 *
 * @param {Number} month Número do mês sem zeros a esquerda.
 * @returns {Number}
 * @public
 */
export const nameOfMonth = (month) => {
  return arrayMonths().filter(item => {
    return (item.value == month)
  })[0].title
}

/**
 * Array anos.
 *
 * @returns {Array}
 * @public
 */
export const arrayYears = (startYear = 1960, decreasing = true) => {
  let arrayYears = []
  const correntYear = (new Date()).getFullYear()
  for (let index = startYear; index <= correntYear; index++) {
    arrayYears.push(index)
  }
  if (decreasing) {
    arrayYears.reverse()
  }
  return arrayYears
}

/**
 * Calcula a idade em anos dada uma determinada data de nascimento.
 *
 * @param {String} strBirthday Data no formato 'aaaa-mm-dd'
 * @param {Boolean} format Define se deve ser retornado com a descrição "50 anos"
 */
export const calculateAge = (strBirthday, format = false) => {
  if (!strBirthday) {
    return ''
  }
  let birthday = new Date(strBirthday)
  let ageDifMs = Date.now() - birthday.getTime()
  let ageDate = new Date(ageDifMs) // miliseconds from epoch
  const age = Math.abs(ageDate.getUTCFullYear() - 1970)
  return (format) ? `${age} ano(s)` : age
}