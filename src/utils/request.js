import store from '@/store'
import axios from 'axios'
import { ElMessage } from 'element-plus'
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
    if (process.env.NODE_ENV === 'development') {
      console.log(error)
    }
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
    // 处理token超时、失效，未携带token访问权限接口的问题
    const code = data.code
    if (code === 20003 || code === 20004 || code === 20007 || code === 20008) {
      store.dispatch('user/logout')
      ElMessage.error(data?.message || '请重新登陆')
    }
    if (process.env.NODE_ENV === 'development') {
      console.log(error)
    }

    return Promise.reject(data)
  }
)

export default service
