import request from '@/utils/request'

const login = (data) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}

export { login }
