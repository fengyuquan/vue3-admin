import request from '@/utils/request'

const login = (data) => {
  return request({
    url: '/token/login',
    method: 'POST',
    data
  })
}

export { login }
