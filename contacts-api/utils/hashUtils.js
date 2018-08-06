const crypto = require('crypto')

module.exports.sha1 = sha1
module.exports.mongoObjectId = mongoObjectId

/**
 * Retorna hash sha1 de uma string.
 *
 * @param {String} str String que será gerada a hash.
 * @public
 */
function sha1 (str) {
  let generator = crypto.createHash('sha1')
  generator.update(str)
  return generator.digest('hex')
}

/**
 * Gera um hash único do tipo mongo ID.
 */
function mongoObjectId () {
  var timestamp = (new Date().getTime() / 1000 | 0).toString(16)
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
    return (Math.random() * 16 | 0).toString(16)
  }).toLowerCase()
}
