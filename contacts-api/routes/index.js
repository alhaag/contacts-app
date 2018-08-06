/**
 * Route /
 *
 * Handling HTTP index request.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

/**
 * Module dependencies
 * @private
 */
var express = require('express')
var router = express.Router()

/**
 * GET /
 */
router.get('/', (req, res, next) => {
  // default access test
  return res.status(200).json({
    success: `API ${config.get('app.key')} response successfull`
  })
})

module.exports = router
