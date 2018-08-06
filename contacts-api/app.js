/**
 * Rest full API - Contacts
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 *
 */

'use strict'

/**
 * dependencies
 */
const express = require('express')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const uuid = require('node-uuid')
const createNamespace = require('continuation-local-storage').createNamespace
const myRequest = createNamespace('main')

/**
 * Variables
 */

// globals
global.__base = __dirname + '/'
global.config = require('config')
global.logger = require('./middlewares/logger')

// local midlewares
const headers = require('./middlewares/headers')
const routes = require('./middlewares/routes')

const app = express()

// Run the context for each request. Assign a unique identifier to each request
app.use((req, res, next) => {
  myRequest.run(() => {
    myRequest.set('reqId', uuid.v1())
    next()
  })
})

app.use(morgan('combined', { 'stream': logger.stream }))
app.use(bodyParser.json({ limit: '10mb' })) // set request body limit
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(expressValidator()) // include validator
app.use(cookieParser())
app.use(headers) // set app headers
routes.mount(app) // set app resource routes

// process startup debug
logger.info('Application ready!')
logger.info(`NODE_ENV: ${process.env.NODE_ENV}`)
logger.info(`CONFIGURATION: ${JSON.stringify(global.config)}`)

module.exports = app
