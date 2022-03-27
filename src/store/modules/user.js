import { login } from '@/api/user'

export default {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {
    login(ctx, userInfo) {
      const { email, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ email, password })
          .then((data) => {
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
