/**
 * Model person.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

/**
 * Dependencies
 */
const dateUtils = require(__base + 'utils/dateUtils')

module.exports = function (sequelize, DataTypes) {
  let Model = sequelize.define('person', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_person_group: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'person_group',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    alias: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    site: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'person'
  })

  Model.listByParams = function (offset, limit, orderBy, orderDirection) {
    let model = this
    logger.debug(`listByParams => params: ${JSON.stringify(arguments)}`)
    return new Promise(async (resolve, reject) => {
      let options = {
        subQuery: false, // fixa problema ORDER por INNER JOIN
        order: [[orderBy, orderDirection]],
        limit: limit,
        offset: offset,
        include: [
          { model: sequelize.models.person_group }
        ]
      }
      let result = await model.findAndCountAll(options)
      result.page = (offset + 1)
      result.limit = limit
      return resolve(result)
    })
  }

  Model.getItem = function (id) {
    let model = this
    logger.debug(`getItem => id: ${id}`)
    return new Promise(async (resolve, reject) => {
      let options = {
        where: { id: id },
        include: [
          { model: sequelize.models.person_group },
          { model: sequelize.models.phone,
            include: [
              { model: sequelize.models.phone_type }
            ]
          },
          { model: sequelize.models.mail }
        ]
      }
      let result = await model.findOne(options)
      return resolve(result)
    })
  }

  /**
   * Save person.
   *
   * @param {Object} person
   */
  Model.saveItem = function (data) {
    let model = this
    logger.debug(`saveItem => data: ${JSON.stringify(data)}`)
    return new Promise(async (resolve) => {
      let saveResult = null
      if (data.id) {
        // UPDATE
        const options = {
          where: { id: data.id }
        }
        let itemResult = await model.findOne(options)
        logger.debug(`get item: ${JSON.stringify(itemResult)}`)
        data.updated_at = dateUtils.currentLocalDate()
        saveResult = await itemResult.update(data)
      } else {
        // INSERT
        data.created_at = dateUtils.currentLocalDate()
        data.updated_at = dateUtils.currentLocalDate()
        saveResult = await model.create(data)
      }
      return resolve(saveResult)
    })
  }

  /**
   * Delete person.
   *
   * @param {Object} person
   */
  Model.deleteItem = function (id) {
    let model = this
    logger.debug(`deleteItem => id: ${id}`)
    return new Promise(async (resolve) => {
      let optionsDestroy = {
        where: { id: id }
      }
      let deleteResult = await model.destroy(optionsDestroy)
      return resolve(deleteResult)
    })
  }

  return Model
}
