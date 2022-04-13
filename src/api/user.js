import request from '@/utils/request'

const login = (data) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}

const getUserInfo = () => {
  return request({
    url: '/user/info'
  })
}

export { login, getUserInfo }
