/**
 * API response headers middleware.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

module.exports = function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Cache-Control, X-Requested-With")
  return next()
}
