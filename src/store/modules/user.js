import { getUserInfo, login } from '@/api/user'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) ?? '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
     * 登陆
     */
    async login(ctx, userInfo) {
      // 网络请求可能会抛出错误，这里没有捕获，需要在使用的地方自己捕获
      const { token } = await login(userInfo)
      this.commit('user/setToken', token)
      setTimeStamp() // 保存登陆时间
    },
    /**
     * 获取用户信息
     */
    async getUserInfo(ctx) {
      // 网络请求可能会抛出错误，这里没有捕获，需要在使用的地方自己捕获
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res.data)
    },
    /**
     * 退出登陆
     */
    logout() {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      router.push('/login')
    }
  }
}
