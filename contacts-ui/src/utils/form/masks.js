/**
 * Biblioteca responsável por aplicar mascaras a valores apresentados
 * em campos de entrada de formulários.
 */

const DIGIT = "9"
const ALPHA = "A"
const ALPHANUM = "S"

const removeDigits = (value) => {
  return value.replace(/[0-9]/g, '')
}

const removeAlpha = (value) => {
  return value.replace(/\D/g,'') // remove all non numeric
}

export const maskMoney = (value, opts) => {
    opts = opts || {}
    opts = {
        delimiter: opts.delimiter || ".",
        lastOutput: opts.lastOutput,
        precision: opts.hasOwnProperty("precision") ? opts.precision : 2,
        separator: opts.separator || ",",
        showSignal: opts.showSignal,
        suffixUnit: opts.suffixUnit && (" " + opts.suffixUnit.replace(/[\s]/g,'')) || "",
        unit: opts.unit && (opts.unit.replace(/[\s]/g,'') + " ") || "",
        zeroCents: opts.zeroCents
    }
    opts.moneyPrecision = opts.zeroCents ? 0 : opts.precision
    if (opts.zeroCents) {
      opts.lastOutput = opts.lastOutput || ""
      let zeroMatcher = ("("+ opts.separator +"[0]{0,"+ opts.precision +"})"),
          zeroRegExp = new RegExp(zeroMatcher, "g"),
          digitsLength = value.toString().replace(/[\D]/g, "").length || 0,
          lastDigitLength = opts.lastOutput.toString().replace(/[\D]/g, "").length || 0
      ;
      value = value.toString().replace(zeroRegExp, "")
      if (digitsLength < lastDigitLength) {
        value = value.slice(0, value.length - 1)
      }
    }
    let number = value.toString().replace(/[\D]/g, ""),
        clearDelimiter = new RegExp("^(0|\\"+ opts.delimiter +")"),
        clearSeparator = new RegExp("(\\"+ opts.separator +")$"),
        money = number.substr(0, number.length - opts.moneyPrecision),
        masked = money.substr(0, money.length % 3),
        cents = new Array(opts.precision + 1).join("0")
    ;
    money = money.substr(money.length % 3, money.length);
    for (var i = 0, len = money.length; i < len; i++) {
      if (i % 3 === 0) {
        masked += opts.delimiter
      }
      masked += money[i]
    }
    masked = masked.replace(clearDelimiter, "")
    masked = masked.length ? masked : "0"
    var signal = ""
    if(opts.showSignal === true) {
      signal = value < 0 || (value.startsWith && value.startsWith('-')) ? "-" :  ""
    }
    if (!opts.zeroCents) {
      var beginCents = number.length - opts.precision,
          centsValue = number.substr(beginCents, opts.precision),
          centsLength = centsValue.length,
          centsSliced = (opts.precision > centsLength) ? opts.precision : centsLength
      ;
      cents = (cents + centsValue).slice(-centsSliced)
    }
    var output = opts.unit + signal + masked + opts.separator + cents
    return output.replace(clearSeparator, "") + opts.suffixUnit
}

export const maskPattern = (value, opts) => {
    var pattern = (typeof opts === 'object' ? opts.pattern : opts),
        patternChars = pattern.replace(/\W/g, ''),
        output = pattern.split(""),
        values = value.toString().replace(/\W/g, ""),
        charsValues = values.replace(/\W/g, ''),
        index = 0,
        i,
        outputLength = output.length

    for (i = 0; i < outputLength; i++) {
      // Reached the end of input
      if (index >= values.length) {
        if (patternChars.length == charsValues.length) {
          return output.join("")
        } else {
          break
        }
      }
      // Remaining chars in input
      else{
        if ((output[i] === DIGIT && values[index].match(/[0-9]/)) ||
            (output[i] === ALPHA && values[index].match(/[a-zA-Z]/)) ||
            (output[i] === ALPHANUM && values[index].match(/[0-9a-zA-Z]/))) {
          output[i] = values[index++]
        } else if (output[i] === DIGIT || output[i] === ALPHA || output[i] === ALPHANUM) {
          return output.slice(0, i).join("")
        }
      }
    }
    return output.join("").substr(0, i)
}

export const maskNumber = (value) => {
  return removeAlpha(value)
}

export const maskAlphaNumeric = (value) => {
    return value.toString().replace(/[^a-z0-9 ]+/i, "")
}

export const maskPhone = (value) => {
    value = removeAlpha(value)
    const onlyNumbers = maskNumber(value)
    let pattern = '(99) 9999-9999'
    if (onlyNumbers.length > 10) {
        pattern = '(99) 99999-9999'
    }
    return maskPattern(onlyNumbers, { pattern: pattern })
}

export const maskCpf = (value) => {
    value = removeAlpha(value)
    return maskPattern(value, { pattern: '999.999.999-99' })
}

export const maskDate = (value) => {
    value = removeAlpha(value)
    return maskPattern(value, { pattern: '99/99/9999' })
}

export const maskDateTime = (value) => {
    value = removeAlpha(value)
    return maskPattern(value, { pattern: '99/99/9999 99:99' })
}

export const maskCEP = (value) => {
  value = removeAlpha(value)
  return maskPattern(value, { pattern: '99.999-999' })
}

/**
 * Mascara de peso em Kg.
 */
export const maskWeigth = (value) => {
  value = removeAlpha(value)
  const onlyNumbers = maskNumber(value)
  let pattern = '99,99'
  if (onlyNumbers.length > 4) {
      pattern = '999,99'
  }
  return maskPattern(onlyNumbers, { pattern: pattern })
}

/**
 * Mascara de altura em metros
 */
export const maskHeight = (value) => {
  value = removeAlpha(value)
  const onlyNumbers = maskNumber(value)
  let pattern = '9,99'
  return maskPattern(onlyNumbers, { pattern: pattern })
}
