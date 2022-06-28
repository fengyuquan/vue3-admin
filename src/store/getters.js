import variables from '@/styles/variables.module.scss'

const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  hasUserInfo: (state) => JSON.stringify(state.user.userInfo) !== '{}',
  cssVar: (state) => ({ ...variables, menuBg: state.theme.mainColor }),
  sidebarOpened: (state) => state.app.sidebarOpened,
  activatedMenuItem: (state) => state.app.activatedMenuItem,
  language: (state) => state.app.language,
  mainColor: (state) => state.theme.mainColor,
  siderbarMenus: (state) => state.app.siderbarMenus
}

export default getters
