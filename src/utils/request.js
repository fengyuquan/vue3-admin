import store from '@/store'
import axios from 'axios'
import { isTimeout } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = store.getters.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      // 请求发送前查看是否token已过期
      if (isTimeout()) {
        // 主动登出
        store.dispatch('user/logout')
        return Promise.reject(new Error('token已失效'))
      }
    }

    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data } = response
    return data ?? ''
  },
  (error) => {
    const { data } = error.response
    // TODO: 处理token超时问题
    return Promise.reject(data)
  }
)

export default service
