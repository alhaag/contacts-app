/**
 * Middleware logger
 *
 * Application log behavior. Uses the wiston module combined with morgan.
 * Console log and file log. Configurable behavior by environment file.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 *
 * @see config
 */

'use strict'

/**
 * Dependencies
 */
const winston = require('winston')
const fs = require('fs')
const path = require('path')
const getNamespace = require('continuation-local-storage').getNamespace

winston.emitErrs = true;
const tsFormat = () => (new Date()).toLocaleTimeString()

// Configuration and defaults
const consoleLevel = config.get('logger.console.level') || 'debug'
const fileLevel = config.get('logger.file.level') || 'error'
const dir = config.get('logger.file.dir') || 'data/log'

// Create the log directory if it does not exist
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

// logger definitions
let logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: consoleLevel,
      datePattern: 'yyyy-MM-dd',
      timestamp: tsFormat,
      handleExceptions: true,
      json: false,
      prettyPrint: true,
      colorize: true
    }),
    new (winston.transports.File)({
      level: fileLevel,
      filename: `${dir}/contacts-api.log`,
      // prepend: true, // date at the beginning of the file (2017-02-15.log)
      json: false,
      colorize: false
    }),
  ],
  exitOnError: false
});

// this allows winston to handle output from express' morgan middleware
logger.stream = {
  write: function (message) {
    logger.info(message)
  }
}

// A custom logger interface that wraps winston, making it easy to instrument
// code and still possible to replace winston in the future.

module.exports.debug = module.exports.log = function () {
  logger.debug.apply(logger, formatLogArguments(arguments))
}

module.exports.info = function () {
  logger.info.apply(logger, formatLogArguments(arguments))
}

module.exports.warn = function () {
  logger.warn.apply(logger, formatLogArguments(arguments))
}

module.exports.error = function () {
  logger.error.apply(logger, formatLogArguments(arguments))
}

module.exports.stream = logger.stream

/**
 * Attempts to add file and line number info to the given log arguments.
 */
function formatLogArguments (args) {
  const requestInstance = getNamespace('main').get('reqId')
  const strInstance = (requestInstance) ? ' INST:' + requestInstance  : ''

  args = Array.prototype.slice.call(args)
  let stackInfo = getStackInfo(1)
  if (stackInfo) {
    // get file path relative to project root
    let calleeStr = '(' + stackInfo.relativePath + ':' + stackInfo.line + ')' + strInstance

    if (typeof (args[0]) === 'string') {
      args[0] = calleeStr + ' ' + args[0]
    } else {
      args.unshift(calleeStr)
    }
  }
  return args
}

/**
 * Parses and returns info about the call stack at the given index.
 */
function getStackInfo (stackIndex) {
  // get call stack, and analyze it
  // get all file, method, and line numbers
  let stacklist = (new Error()).stack.split('\n').slice(3)

  // stack trace format:
  // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
  // do not remove the regex expresses to outside of this method (due to a BUG in node.js)
  let stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi
  let stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi

  let s = stacklist[stackIndex] || stacklist[0]
  let sp = stackReg.exec(s) || stackReg2.exec(s)

  if (sp && sp.length === 5) {
    return {
      method: sp[1],
      relativePath: path.relative(__base, sp[2]),
      line: sp[3],
      pos: sp[4],
      file: path.basename(sp[2]),
      stack: stacklist.join('\n')
    }
  }
}
