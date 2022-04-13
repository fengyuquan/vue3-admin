import { ElMessage } from 'element-plus'
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
      // TODO 存在token的情况下，且token未过期（待实现），则不允许进入login页面
      next('/')
    } else {
      // 进入非登陆页面时，查看vuex中是否存在userInfo
      if (!store.getters.hasUserInfo) {
        try {
          await store.dispatch('user/getUserInfo')
        } catch (error) {
          ElMessage.error(error?.message || '获取用户信息失败')
        }
      }
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
