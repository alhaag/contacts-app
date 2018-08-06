/**
 * ForbidenError error.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

const AppError = require('./AppError')

module.exports = class ForbidenError extends AppError {
  /**
   * Construct method.
   *
   * @param {String} message Short message. Default is 'ForbidenError'.
   * @param {String} userMessage Optional message to the end user, default is empty.
   */
  constructor (message = 'ForbidenError', userMessage = '') {
    // Providing default message and overriding status code.
    super(message, 403, userMessage)
  }
}
