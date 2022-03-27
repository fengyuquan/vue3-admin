import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  // 存在token， 进入主页
  // getters 快捷访问
  if (store.getters.token) {
    if (to.path === '/login') {
      // 存在token的情况下，且token未过期（待实现），则不允许进入login页面
      next('/')
    } else {
      next()
    }
  } else {
    // 没有token，可以进入白名单
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
