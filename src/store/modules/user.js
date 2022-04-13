import { getUserInfo, login } from '@/api/user'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { RES_Ok, TOKEN } from '@/constant'
import router from '@/router'

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
      try {
        const { token } = await login(userInfo)
        this.commit('user/setToken', token)
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.log(err)
        }
      }
    },
    /**
     * 获取用户信息
     */
    async getUserInfo(ctx) {
      try {
        const res = await getUserInfo()
        if (res.code !== RES_Ok) throw new Error(res)
        this.commit('user/setUserInfo', res.data)
        return res
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.log(err)
        }
      }
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
