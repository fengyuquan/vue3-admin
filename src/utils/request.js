import store from '@/store'
import axios from 'axios'
import { ElMessage } from 'element-plus'

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
    }
    return config // 必须返回配置
  },
  (error) => {
    Promise.reject(error)
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
    const { message } = data

    if (message) ElMessage.error(message)
    // TODO: 处理token超时问题
    return Promise.reject(data)
  }
)

export default service
