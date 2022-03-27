/**
 * 存储数据
 * @param {string} key
 * @param {any} value
 */
const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }

  window.localStorage.setItem(key, value)
}

/**
 * 获取数据
 * @param {string} key
 * @returns Object
 */
const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}

/**
 * 删除数据
 * @param {string} key
 */
const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

/**
 * 删除所有数据
 */
const removeAllItem = () => {
  window.localStorage.clear()
}

export { setItem, getItem, removeItem, removeAllItem }
