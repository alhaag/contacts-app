/**
 * Route /person
 *
 * Handling HTTP person requests.
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
 * GET /person/group
 */
router.get('/group', rejectHandler(async (req, res, next) => {
  let result = await models.person_group.listAll()
  return res.json(result)
}))

/**
 * GET /person
 */
router.get('/', rejectHandler(async (req, res, next) => {
  // defines
  const ORDER_BY_ALLOW = [
    'id',
    'name',
    'created_at',
    'updated_at'
  ]
  // validate params from query
  req.checkQuery('page', 'Invalid page parameter').optional().isInt({ min: 1 })
  req.checkQuery('limit', 'Invalid limit parameter').optional().isInt({ min: 1 })
  req.checkQuery('order', 'Invalid orderBy parameter. Permitted values createdAt or title').optional()
  req.checkQuery('orderBy', `Invalid orderBy parameter. Permitted values: ${ORDER_BY_ALLOW.join(', ')}`).optional().isIn(ORDER_BY_ALLOW)
  req.checkQuery('orderDirection', 'Parameter orderDirection is invalid. Allowed values ASC or DESC').optional().isIn(['ASC', 'DESC'])

  const fieldErrors = req.validationErrors()
  if (fieldErrors) throw new errors.BadRequestError(fieldErrors)

  // process params from query and default values
  const page = parseInt(req.query.page || 1)
  const limit = parseInt(req.query.limit || 25)
  const offset = (limit * (page - 1)) // para o sequelize a página inicia de zero
  const orderBy = req.query.orderBy || 'name'
  const orderDirection = req.query.orderDirection || 'ASC'

  let result = await models.person.listByParams(offset, limit, orderBy, orderDirection)
  return res.json(result)
}))

/**
 * GET /person/:id
 */
router.get('/:id', rejectHandler(async (req, res, next) => {
  const id = req.params.id
  const result = await models.person.getItem(id)
  return res.json(result)
}))

/**
 * POST /person
 */
router.post('/', rejectHandler(async (req, res, next) => {
  // validation
  req.checkBody('name', 'Invalid param name').isLength({ min: 1, max: 255 })
  req.checkBody('alias', 'Invalid param alias').optional().isLength({ max: 255 })
  req.checkBody('address', 'Invalid param number').optional().isLength({ max: 255 })
  req.checkBody('site', 'Invalid param site').optional().isLength({ max: 255 })
  req.checkBody('comments', 'Invalid param comments').optional().isLength({ max: 999999 })

  const fieldErrors = req.validationErrors()
  if (fieldErrors) throw new errors.BadRequestError(fieldErrors)

  const data = {
    name: req.body.name,
    alias: req.body.alias,
    address: req.body.address,
    site: req.body.site,
    comments: req.body.comments
  }

  let result = await models.person.saveItem(data)
  return res.json(result)
}))

/**
 * PUT /person/:id
 */
router.put('/:id', rejectHandler(async (req, res, next) => {
  // validation
  req.checkBody('name', 'Invalid param name').optional().isLength({ min: 1, max: 255 })
  req.checkBody('alias', 'Invalid param alias').optional().isLength({ max: 255 })
  req.checkBody('address', 'Invalid param number').optional().isLength({ max: 255 })
  req.checkBody('site', 'Invalid param site').optional().isLength({ max: 255 })
  req.checkBody('comments', 'Invalid param comments').optional().isLength({ max: 999999 })

  const fieldErrors = req.validationErrors()
  if (fieldErrors) throw new errors.BadRequestError(fieldErrors)

  const id = req.params.id

  const data = {
    id: id
  }
  if (req.body.name) data.name = req.body.name
  if (req.body.alias) data.alias = req.body.alias
  if (req.body.address) data.address = req.body.address
  if (req.body.site) data.site = req.body.site
  if (req.body.comments) data.comments = req.body.comments

  let result = await models.person.saveItem(data)
  return res.json(result)
}))

/**
 * DELETE /person/:id
 */
router.delete('/:id', rejectHandler(async (req, res, next) => {
  const id = req.params.id

  let result = await models.person.deleteItem(id)
  // TODO: remover itens de tabelas relacionadas
  return res.json(result)
}))

module.exports = router
