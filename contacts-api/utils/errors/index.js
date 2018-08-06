/**
 * Module exports errors class.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

/**
 * Module variables.
 *
 * @private
 */
const AppError = require('./AppError')
const BadRequestError = require('./BadRequestError')
const NotAuthorizedError = require('./NotAuthorizedError')
const ForbidenError = require('./ForbidenError')
const NotFoundError = require('./NotFoundError')

/**
 * Module exports.
 *
 * @public
 */
module.exports.AppError = AppError
module.exports.BadRequestError = BadRequestError
module.exports.NotAuthorizedError = NotAuthorizedError
module.exports.ForbidenError = ForbidenError
module.exports.NotFoundError = NotFoundError
