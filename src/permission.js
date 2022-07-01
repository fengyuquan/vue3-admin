import { ElMessage } from 'element-plus'
import router from './router'
import useUserStore from './stores/user'
import { isTimeout } from './utils/auth'

// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  // 存在token的情况下，且token未过期（仅本地验证）
  if (userStore.token && !isTimeout()) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 进入非登陆页面时，查看vuex中是否存在userInfo
      if (!userStore.hasUserInfo) {
        try {
          await userStore.getUserInfo()
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
