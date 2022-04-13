import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { getItem, setItem } from './storage'

/**
 * 获取时间戳
 */
function getTimeStamp() {
  return getItem(TIME_STAMP)
}

/**
 * 设置时间戳
 */
function setTimeStamp() {
  setItem(TIME_STAMP, Date.now())
}

/**
 * 是否超时
 */
function isTimeout() {
  const currentTimeStamp = Date.now()
  const cacheTimeStamp = getItem(TIME_STAMP)
  return currentTimeStamp - cacheTimeStamp > TOKEN_TIMEOUT_VALUE
}

export { getTimeStamp, setTimeStamp, isTimeout }
