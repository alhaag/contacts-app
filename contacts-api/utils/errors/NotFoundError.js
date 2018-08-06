/**
 * NotFound error.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

const AppError = require('./AppError')

module.exports = class NotFoundError extends AppError {
  /**
   * Construct method.
   *
   * @param {String} message Short message. Default is 'NotFound'.
   * @param {String} userMessage Optional message to the end user, default is empty.
   */
  constructor (message = 'NotFound', userMessage = '') {
    // Providing default message and overriding status code.
    super(message, 404, userMessage)
  }
}
