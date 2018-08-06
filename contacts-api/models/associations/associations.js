/**
 * Define tables relations.
 */
module.exports = function (models) {
  // person (hasOne) person_group
  models.person_group.hasOne(models.person, { foreignKey: 'id_person_group' })
  models.person.belongsTo(models.person_group, { foreignKey: 'id_person_group' })

  // person (hasMany) phone
  models.person.hasMany(models.phone, { foreignKey: 'id_person' })
  models.phone.belongsTo(models.person, { foreignKey: 'id_person' })

  // person (hasMany) mail
  models.person.hasMany(models.mail, { foreignKey: 'id_person' })
  models.mail.belongsTo(models.person, { foreignKey: 'id_person' })

  // phone (hasOne) person
  models.person.hasOne(models.phone, { foreignKey: 'id_person' })
  models.phone.belongsTo(models.person, { foreignKey: 'id_person' })

  // person (hasOne) person_group
  models.phone_type.hasOne(models.phone, { foreignKey: 'id_phone_type' })
  models.phone.belongsTo(models.phone_type, { foreignKey: 'id_phone_type' })
}
