/**
 * Route /phone
 *
 * Handling HTTP phone requests.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

const express = require('express')
const router = express.Router()
const rejectHandler = require(__base + 'middlewares/async').rejectHandler
const models = require(__base + 'models')
const errors = require(__base + 'utils/errors')

/**
 * GET /phone/type
 */
router.get('/type', rejectHandler(async (req, res, next) => {
  let result = await models.phone_type.listAll()
  return res.json(result)
}))

/**
 * POST /phone
 */
router.post('/', rejectHandler(async (req, res, next) => {
  // validation
  req.checkBody('id_person', 'Invalid param id_person').isLength({ min: 1, max: 999999 })
  req.checkBody('id_phone_type', 'Invalid param id_phone_type').isLength({ min: 1, max: 999999 })
  req.checkBody('number', 'Invalid param number').isLength({ min: 8, max: 14 })
  req.checkBody('is_whatsapp', 'Invalid param is_whatsapp').isIn([0, 1])

  const fieldErrors = req.validationErrors()
  if (fieldErrors) throw new errors.BadRequestError(fieldErrors)

  const data = {
    id_person: req.body.id_person,
    id_phone_type: req.body.id_phone_type,
    number: req.body.number,
    is_whatsapp: req.body.is_whatsapp
  }

  let result = await models.phone.saveItem(data)
  return res.json(result)
}))

/**
 * PUT /phone/:id
 */
router.put('/:id', rejectHandler(async (req, res, next) => {
  // validation
  req.checkBody('id_person', 'Invalid param id_person').isLength({ min: 1, max: 999999 })
  req.checkBody('id_phone_type', 'Invalid param id_phone_type').isLength({ min: 1, max: 999999 })
  req.checkBody('number', 'Invalid param number').isLength({ min: 8, max: 14 })
  req.checkBody('is_whatsapp', 'Invalid param is_whatsapp').isIn([0, 1])

  const fieldErrors = req.validationErrors()
  if (fieldErrors) throw new errors.BadRequestError(fieldErrors)

  const id = req.params.id

  const data = {
    id: id
  }
  if (req.body.id_person) data.id_person = req.body.id_person
  if (req.body.id_phone_type) data.id_phone_type = req.body.id_phone_type
  if (req.body.number) data.number = req.body.number
  if (req.body.is_whatsapp) data.is_whatsapp = req.body.is_whatsapp

  let result = await models.phone.saveItem(data)
  return res.json(result)
}))

/**
 * DELETE /phone/:id
 */
router.delete('/:id', rejectHandler(async (req, res, next) => {
  const id = req.params.id

  let result = await models.phone.deleteItem(id)
  return res.json(result)
}))

module.exports = router
