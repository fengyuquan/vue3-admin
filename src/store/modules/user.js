import { login } from '@/api/user'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) ?? ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    }
  },
  actions: {
    async login(ctx, userInfo) {
      // const { email, password } = userInfo
      // return new Promise((resolve, reject) => {
      //   login({ email, password })
      //     .then((data) => {
      //       resolve()
      //     })
      //     .catch((err) => {
      //       reject(err)
      //     })
      // })
      try {
        const { token } = await login(userInfo)
        this.commit('user/setToken', token)
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.log(err)
        }
      }
    }
  }
}
