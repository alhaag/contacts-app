/**
 * Assync handler middleware.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

/**
 * Handler de promises rejeitadas.
 * Encaminha ao midleware padrão de tratamento de erro.
 *
 * @param {Function} fn
 */
module.exports.rejectHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
