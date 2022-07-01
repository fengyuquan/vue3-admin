import router from '@/router'
import { defineStore } from 'pinia'
import { getUserInfo, login } from '@/api/user'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import { setTimeStamp } from '@/utils/auth'

export default defineStore('user', {
  state: () => ({
    token: getItem(TOKEN) ?? '',
    userInfo: {}
  }),
  getters: {
    hasUserInfo: (state) => JSON.stringify(state.userInfo) !== '{}'
  },
  actions: {
    setToken(token) {
      this.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    /**
     * 登陆
     */
    async login(userInfo) {
      // 网络请求可能会抛出错误，这里没有捕获，需要在使用的地方自己捕获
      const { token } = await login(userInfo)
      this.setToken(token)
      setTimeStamp() // 保存登陆时间
    },
    /**
     * 获取用户信息
     */
    async getUserInfo() {
      // 网络请求可能会抛出错误，这里没有捕获，需要在使用的地方自己捕获
      const res = await getUserInfo()
      this.setUserInfo(res.data)
    },
    /**
     * 退出登陆
     */
    logout() {
      removeAllItem()
      this.$reset()
      router.push('/login')
    }
  }
})
