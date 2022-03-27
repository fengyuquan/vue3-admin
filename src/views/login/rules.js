import { isEmail, isLength } from 'validator'

const validateEmail = () => {
  return (rule, value, callback) => {
    if (!isEmail(value)) {
      callback(new Error('邮箱格式不正确'))
    } else {
      callback()
    }
  }
}
const validatePassword = () => {
  return (rule, value, callback) => {
    if (!isLength(value, { min: 6, max: 32 })) {
      callback(new Error('密码至少6个字符，最多32个字符'))
    } else {
      callback()
    }
  }
}

export { validatePassword, validateEmail }
