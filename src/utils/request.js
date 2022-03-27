import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data } = response
    const { message } = data

    if (message) ElMessage.success(message)
    return data ?? ''
  },
  (err) => {
    const { data } = err.response
    const { message } = data

    if (message) ElMessage.error(message)
    // TODO: 处理token超时问题
    return Promise.reject(data)
  }
)

export default service
