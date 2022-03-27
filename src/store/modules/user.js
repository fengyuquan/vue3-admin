import { login } from '@/api/user'

export default {
  namespaced: true,
  state: () => ({}),
  mutations: {},
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
        await login(userInfo)
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.log(err)
        }
      }
    }
  }
}
