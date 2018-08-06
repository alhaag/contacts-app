/**
 * Model phone_type.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

module.exports = function (sequelize, DataTypes) {
  let Model = sequelize.define('phone_type', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'phone_type'
  })

  Model.listAll = function () {
    let model = this
    logger.debug(`listAll`)
    return new Promise(async (resolve, reject) => {
      let result = await model.findAndCountAll()
      return resolve(result)
    })
  }

  return Model
}
