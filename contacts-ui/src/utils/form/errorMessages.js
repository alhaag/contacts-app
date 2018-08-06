/**
 * Mensagens dinâmicas de erros de campos de formuláios.
 */

export const isRequired = fieldName => `${fieldName} é obrigatório`

export const mustMatch = otherFieldName => {
    return (fieldName) => `${fieldName} deve coincidir com ${otherFieldName}`
}

export const minLength = length => {
    return (fieldName) => `${fieldName} deve possuir no mínimo ${length} caracteres`
}

export const maxLength = length => {
    return (fieldName) => `${fieldName} deve possuir no máximo ${length} caracteres`
}

export const minCurrency = min => {
    return (fieldName) => `${fieldName} deve possuir valor mínimo de R$ ${min}`
}

export const qtdFiles = (min, max) => {
    return (fieldName) => `${fieldName} deve possuir no mínimo ${min} e no máximo ${max} arquivos`
}

export const isEmail = fieldName => `${fieldName} deve ser um endereço de e-mail`

export const isNumber = fieldName => `${fieldName} deve possuir apenas números`

export const isDate = fieldName => `${fieldName} deve ser uma data válida`

export const isWeight = fieldName => `${fieldName} deve ser em Kg no formato xxx,xx`

export const isHeight = fieldName => `${fieldName} deve ser em metros no formato x,xx`

export const isBloodPressure = fieldName => `${fieldName} deve ser em mmHg no formato xxx/xxx`

export const isPhoneNumber = fieldName => `${fieldName} deve ser um número de telefone válido no formato (xx) xxxx-xxxx ou (xx) xxxxx-xxxx`
