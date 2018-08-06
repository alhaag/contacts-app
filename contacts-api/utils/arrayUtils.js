
module.exports.intersection = intersection

/**
 * Retorna a interseção de dois arrays.
 *
 * @param {Array} a
 * @param {Array} b
 */
function intersection (a, b, ignoreType = false) {
  if (ignoreType === true) {
    a = a.map(String)
    b = b.map(String)
  }
  return a.filter(n => {
    return b.indexOf(n) !== -1
  })
}
