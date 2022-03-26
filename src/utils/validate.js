/**
 * 判断是否为外部资源
 * @param {string} path
 * @returns {boolean}
 */
function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export { isExternal }
