/**
 * Model mail.
 *
 * @author André Luiz Haag <andreluizhaag@gmail.com>
 */

'use strict'

module.exports = function (sequelize, DataTypes) {
  let Model = sequelize.define('mail', {
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
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'mail'
  })

  return Model
}
