/**
 * Model person_group.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

module.exports = function (sequelize, DataTypes) {
  let Model = sequelize.define('person_group', {
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
    tableName: 'person_group'
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
