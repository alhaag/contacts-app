/**
 * Regras para validação de campos de fromulários.
 */

/**
 * Module dependencies
 * @private
 */
import * as ErrorMessages from './errorMessages.js'

/**
 * Campo obrigatório.
 *
 * @param {String} text
 */
export const required = (text) => {
    return (text) ? null : ErrorMessages.isRequired
}

/**
 * Campo obrigatório provido por conteúdo HTML (TextEditor).
 * Necessário pois neste tipo de campo o conteúdo vazio pode ser algo como '<p><br></p>'
 *
 * @param {String} text
 */
export const requiredHTML = (text) => {
    text = text.replace(/(<([^>]+)>)/ig,"")
    return (text) ? null : ErrorMessages.isRequired
}

/**
 * Campos coincidentes (por exeemplo repetição de senha).
 *
 * @param {String} field
 * @param {String} fieldName
 */
export const mustMatch = (field, fieldName) => {
    return (text, state) => {
        return state[field] == text ? null : ErrorMessages.mustMatch(fieldName)
    }
}

/**
 * Quantidade mínima de carateres.
 *
 * @param {Number} length
 */
export const minLength = (length) => {
    return (text) => {
        return text.length >= length ? null : ErrorMessages.minLength(length)
    }
}

/**
 * Quantidade máxima de carateres.
 *
 * @param {Number} length
 */
export const maxLength = (length) => {
    return (text) => {
        return text.length <= length ? null : ErrorMessages.maxLength(length)
    }
}

/**
 * Valor minimo monetário '10,00'.
 *
 * @param {String} min string represnetando valor monetário separando centavos por virgula.
 */
export const minCurrency = (min) => {
    return (text) => {
        let textFloat = parseFloat(text.replace(',', '.'))
        let minFloat = parseFloat(min.replace(',', '.'))
        return textFloat >= minFloat ? null : ErrorMessages.minCurrency(min)
    }
}

/**
 * Quantidade mínima e máxima de arquivos para upload.
 *
 * @param {Number} min
 * @param {Number} max
 */
export const qtdFiles = (min, max) => {
    return (text) => {
        let qtd = parseInt(text)
        return (qtd < min || qtd > max) ? ErrorMessages.qtdFiles(min, max) : null
    }
}

/**
 * Endereço de e-mail válido.
 *
 * @param {String} text
 */
export const isEmail = (text) => {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return (re.test(text)) ? null : ErrorMessages.isEmail
}

/**
 * Apenas números
 *
 * @param {String} text
 */
export const isNumber = (text) => {
    let re = /^\d+$/
    return (re.test(text)) ? null : ErrorMessages.isEmail
}

/**
 * Verifica se é uma data válida no formato "dd/mm/aaaa".
 *
 * @param {String} text
 */
export const isDate = (text) => {
    let dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    // Match the date format through regular expression
    if (! text.match(dateformat)) {
        return ErrorMessages.isDate
    }
    //Test which seperator is used '/' or '-'
    let opera1 = text.split('/')
    let opera2 = text.split('-')
    let lopera1 = opera1.length
    let lopera2 = opera2.length
    // Extract the string into month, date and year
    let pdate = []
    if (lopera1 > 1) {
        pdate = text.split('/')
    } else if (lopera2 > 1) {
        pdate = text.split('-')
    }
    var dd = parseInt(pdate[0])
    var mm = parseInt(pdate[1])
    var yy = parseInt(pdate[2])
    // Create list of days of a month [assume there is no leap year by default]
    var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31]
    if (mm == 1 || mm > 2) {
        if (dd>ListofDays[mm-1]) {
            return ErrorMessages.isDate
        }
    }
    if (mm == 2) {
        var lyear = false;
        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
            lyear = true
        }
        if ((lyear==false) && (dd>=29)) {
            return ErrorMessages.isDate
        }
        if ((lyear==true) && (dd>29)) {
            return ErrorMessages.isDate
        }
    }
    return null
}

/**
 * Peso no formato 999,99
 *
 * @param {String} text
 */
export const isWeight = (text) => {
    if (text == '') return null
    let re = /^[0-9]{1,3}\,[0-9]{2}$/i
    return (re.test(text)) ? null : ErrorMessages.isWeight
}

/**
 * Altura no formato 9,99
 *
 * @param {String} text
 */
export const isHeight = (text) => {
    if (text == '') return null
    let re = /^[0-9]{1}\,[0-9]{2}$/i
    return (re.test(text)) ? null : ErrorMessages.isHeight
}

/**
 * Pressão arterial no formato 999/999
 *
 * @param {String} text
 */
export const isBloodPressure = (text) => {
    if (text == '') return null
    let re = /^[0-9]{2,3}\/[0-9]{2,3}$/i
    return (re.test(text)) ? null : ErrorMessages.isBloodPressure
}

/**
 * Número de telefone no formato (99) 9999-9999 ou (99) 999-9999
 *
 * @param {String} text
 */
export const isPhoneNumber = (text) => {
    if (text == '') return null
    let re = /^[(][0-9]{2}[)]\s[0-9]{4,5}-[0-9]{4}$/i
    return (re.test(text)) ? null : ErrorMessages.isPhoneNumber
}
