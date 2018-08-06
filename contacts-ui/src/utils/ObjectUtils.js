
/**
 * Função recursiva para eliminação de propriedades 'undefined' || null || ''.
 *
 * @param {Object} obj
 * @returns {Object}
 * @public
 */
export const removeEmptyKeys = (obj) => {
  Object.keys(obj).forEach(k =>
    (obj[k] && typeof obj[k] === 'object') && removeEmptyKeys(obj[k]) ||
    (! obj[k] && obj[k] !== undefined) && delete obj[k]
  )
  return obj
}
