/**
 * BadRequestError error.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

const AppError = require('./AppError')

module.exports = class BadRequestError extends AppError {
  /**
   * Construct method.
   *
   * @param {String} message Short message. Default is 'BadRequestError'.
   * @param {String} userMessage Optional message to the end user, default is empty.
   */
  constructor (invalidParams = {}, message = 'BadRequestError', userMessage = 'Erro nos parâmetros da requisição') {
    // Providing default message and overriding status code.
    super(message, 400, userMessage)
    // Saving custom property.
    this.invalidParams = invalidParams
  }
}
