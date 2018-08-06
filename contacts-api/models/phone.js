/**
 * Model phone.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

module.exports = function (sequelize, DataTypes) {
  let Model = sequelize.define('phone', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_person: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'person',
        key: 'id'
      }
    },
    id_phone_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'phone_type',
        key: 'id'
      }
    },
    number: {
      type: DataTypes.STRING(14),
      allowNull: false
    },
    is_whatsapp: {
      type: DataTypes.SMALLINT(1),
      allowNull: true
    }
  }, {
    tableName: 'phone'
  })

  /**
   * Save phone.
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
        saveResult = await itemResult.update(data)
      } else {
        // INSERT
        saveResult = await model.create(data)
      }
      return resolve(saveResult)
    })
  }

  /**
   * Delete phone.
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
