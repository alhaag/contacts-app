/**
 * Macro routes middleware.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

/**
 * Dependencies
 */
const index = require(__base + 'routes/index')
const person = require(__base + 'routes/person')
const phone = require(__base + 'routes/phone')

module.exports.mount = function (app) {
  // log request info
  const logRequest = (req, res, next) => {
    logger.debug(`___${req.method}___ ${req.originalUrl}`)
    next()
  }

  app.use(logRequest)
  app.use('/', index)
  app.use('/person', person)
  app.use('/phone', phone)

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // catch all errors
  app.use((err, req, res, next) => {
    const status = err.status || 500
    logger.error(err)
    res.status(status).json(err)
  })
}
