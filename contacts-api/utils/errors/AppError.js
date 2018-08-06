/**
 * Default error class.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

module.exports = class AppError extends Error {
  /**
   * Construct method.
   *
   * @param {String} message Short message.
   * @param {Number} status HTTP error status code, default is 500.
   * @param {String} userMessage Optional message to the end user, default is empty.
   */
  constructor (message = 'InternalServerError', status = 500, userMessage = '') {
    super(message)
    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name
    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor)
    // You can use any additional properties you want.
    // I'm going to use preferred HTTP status for this error types.
    // `500` is the default value if not specified.
    this.status = status
    this.userMessage = userMessage
  }
}
