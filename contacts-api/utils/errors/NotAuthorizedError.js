/**
 * NotAuthorizedError error.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

const AppError = require('./AppError')

module.exports = class NotAuthorizedError extends AppError {
  /**
   * Construct method.
   *
   * @param {String} message Short message. Default is 'NotAuthorizedError'.
   * @param {String} userMessage Optional message to the end user, default is empty.
   */
  constructor (message = 'NotAuthorizedError', userMessage = '') {
    // Providing default message and overriding status code.
    super(message, 401, userMessage)
  }
}
