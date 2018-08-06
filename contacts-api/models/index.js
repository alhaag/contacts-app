/**
 * Load models
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)

let db = {}

// DataBase connection
const dialect = config.get('db.dialect')
const host = config.get('db.host')
const port = config.get('db.port')
const user = config.get('db.user')
const password = config.get('db.password')
const database = config.get('db.database')

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: dialect,
  // timezone: "America/Sao_Paulo",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,
    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    //prevent sequelize from pluralizing table names
    freezeTableName: true
  }
});

// Try DB connection
sequelize
  .authenticate()
  .then(() => {
    logger.info('MySQL connection has been established successfully.')
  })
  .catch(err => {
    logger.error('Unable to connect to the database:', err)
    process.exit(2)
  })

// Load models
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
});

require('./associations/associations')(db)

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db